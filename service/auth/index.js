import jwt from 'jsonwebtoken'
import Users from '../../repository/users'

const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthService{ 
    async isUserExist(email) {
        const user = await Users.findByEmail(email)
        return !!user        
    }

    async create(body) {
        const {email, subscription, avatar} = await Users.create(body)
        return { email, subscription, avatar}
    }

    async getUser(email, password) {
        const user = await Users.findByEmail(email)
        const isValidPassword = await user?.isValidPassword(password)
        if (!isValidPassword) {
            return null
        }
        return user
    }

    getToken(user) {
        const id= user.id
        const payload = { id}
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '10d' }) 
        return token
    }

    async setToken(id, token) {
        await Users.updateToken(id, token)
        
    }
}

export default AuthService