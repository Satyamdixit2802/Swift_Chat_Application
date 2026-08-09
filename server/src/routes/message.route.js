import {Router} from 'express'
import {getMessage, createMessage} from '../controllers/message.controller.js'
import asyncHandler from '../utils/asyncHandler.js'

const router = Router()


router.get('/',asyncHandler(getMessage))
router.post('/',asyncHandler(createMessage))

export default router

