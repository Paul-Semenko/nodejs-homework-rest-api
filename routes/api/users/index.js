import { Router } from "express"
import { uploadAvatar, verifyUser, repeatEmailForVerifyUser } from '../../../controllers/users'
import guard from '../../../middlewares/guard'
import { upload } from '../../../middlewares/upload'

const router = new Router()

router.patch('/avatar', guard, upload.single('avatar'), uploadAvatar)
router.get('/verify/:verificationToken', verifyUser)
router.post('/verify', repeatEmailForVerifyUser)

export default router