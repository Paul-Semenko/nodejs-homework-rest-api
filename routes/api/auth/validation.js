import Joi from "joi"
import pkg from 'mongoose'
import { HttpCode } from "../../../lib/constants"

const { Types } = pkg

const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).required(),
})

export const validateSignup = async (req, res, next) => {
    try {
        await signupSchema.validateAsync(req.body)
    } catch (error) {
        return res
            .status(HttpCode.BAD_REQUEST)
        .json({message:`Field ${error.message.replace(/"/g, '')}`})
        
    }
    next()
}