import { HttpCode } from '../../lib/constants'
import AuthService from '../../service/auth'

const authService = new AuthService()

const registration = async (req, res, next) => {
    const { email } = req.body
    const isUserExist = await authService.isUserExist(email)
    if (isUserExist) {
        return res
            .status(HttpCode.CONFLICT)
        .json({status: 'error', code: HttpCode.CONFLICT, message: 'Email in use',})
    }
    const data = await authService.create(req.body) 
    res.status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data})
}
const login = async (req, res, next) => {
    const { email, password } = req.body 
    const user = await authService.getUser(email, password)
    if (!user) {
        return res
            .status(HttpCode.UNAUTHORIZED)
            .json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                message: 'Email or password is wrong',
            })
    }
    const token = authService.getToken(user)
    await authService.setToken(user.id, token)

    const data = {
        "token": token,
        "user": {
            "email": user.email,
            "subscription":user.subscription
       }
    }
    res.status(HttpCode.OK)
        .json({ status: 'success', code: HttpCode.OK, data})
}

const logout = async (req, res, next) => {

  await authService.setToken(req.user.id, null)
    res.status(HttpCode.NO_CONTENT)
        .json()
}
const current = async (req, res, next) => {
    const response = {
    'email': req.user.email,
    'subscription': req.user.subscription
  }
  return res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, data: {response} })
}

export { registration, login, logout, current}
