import express from 'express'
import {
  test,
  updateUser,
  deleteUser,
  getUser,
  upload,
  sendEmail,
} from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'

const router = express.Router()

router.get('/test', test)
router.post('/upload', upload)
router.post('/update/:id', updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/:id', verifyToken, getUser)
router.post('/send-email', sendEmail)

export default router
