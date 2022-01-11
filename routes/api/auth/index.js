import { Router } from 'express'
import { registration, login, logout, current } from '../../../controllers/auth'
import guard from '../../../middlewares/guard'
import {validateSignup} from './validation'

const router = new Router()

router.post('/signup', registration, validateSignup)
router.post('/login', login, validateSignup)
router.post('/logout', guard, logout)
router.get('/current', guard, current)

export default router