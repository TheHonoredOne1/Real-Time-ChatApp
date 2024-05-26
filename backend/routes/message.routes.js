import express from 'express'
import { getMessages , sendMessage} from '../controllers/message.controller.js'
// import sendMessage from '../controllers/message.controller.js'
import protectRoute from '../middleware/protectRoute.js'
const router = express.Router()

router.get('/:id',protectRoute, getMessages)
router.post('/send/:id', protectRoute, sendMessage)
// id =>  the user that will send the message // 

export default router