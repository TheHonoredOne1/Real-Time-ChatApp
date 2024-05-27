import express from 'express'
import { getMessages, sendMessage } from '../controllers/message.controller.js'
// import sendMessage from '../controllers/message.controller.js'
import protectRoute from '../middleware/protectRoute.js'
const router = express.Router()


router.get('/:id', protectRoute, getMessages)

router.post('/send/:id', protectRoute, sendMessage)
//  id =>  the user that will receive the message   //

///---------------[ protectRoute ] -------------///
/*
protectRoute is used to check if the user who want't to send the message is logged in OR NOT logged in.
*/

export default router