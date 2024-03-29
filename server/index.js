import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import vehicleRouter from './routes/vehicle.route.js'
import cookieParser from 'cookie-parser'
import path from 'path'
import cors from 'cors'
import Razorpay from 'razorpay'
import User from './models/user.model.js'
import OrderModel from './models/order.model.js'
import morgan from 'morgan'
import crypto from 'crypto'
import Vehicle from './models/vehicle.model.js'
import nodemailer from 'nodemailer'
const razorpay = new Razorpay({
  key_id: 'rzp_test_yoQ3nmI7J3LyOK',
  key_secret: 'V60RDhmjFRpwjNjZp7aOGaDo',
})

dotenv.config()
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    // Vehicle.insertMany(bike)
    //   .then(() => {
    //     console.log('Dummy data inserted successfully')
    //   })
    //   .catch((err) => {
    //     console.error('Error inserting dummy data:', err)
    //   })
    //   .finally(() => {
    //     mongoose.disconnect() // Disconnect from MongoDB after inserting data
    //   })
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log(err)
  })

// const __dirname = path.resolve()

const app = express()
app.use(cors())
app.use(express.json())
// app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.listen(3003, () => {
  console.log('Server is Listening to Port 3003')
})
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
// app.use('/api/listing', listingRouter)
app.use('/api/vehicle', vehicleRouter)

app.post('/api/payment/checkout', async (req, res) => {
  const { name, amount, email, index, sDate, eDate, sTime, eTime } = req.body
  const user = await User.findOne({ email: email })

  try {
    const newAmount = Number(amount) * 100
    console.log(newAmount)
    const order = await razorpay.orders.create({
      amount: newAmount,
      currency: 'INR',
    })

    const item = await Vehicle.findOne({ index: index })

    await OrderModel.create({
      order_id: order.id,
      name: name,
      amount: newAmount,
      user: user._id,
      vehicleId: item._id,
      sDate,
      eDate,
      sTime,
      eTime,
    })

    console.log(order)
    res.json({ order })
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/api/payment/payment-verification', async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body

  const body_data = razorpay_order_id + '|' + razorpay_payment_id
  const expect = crypto
    .createHmac('sha256', 'V60RDhmjFRpwjNjZp7aOGaDo')
    .update(body_data)
    .digest('hex')

  const isValid = expect === razorpay_signature

  if (isValid) {
    try {
      await OrderModel.findOneAndUpdate(
        { order_id: razorpay_order_id },
        {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
        }
      )

      res.redirect(
        `http://localhost:3006/success?order_id=${razorpay_order_id}`
      )
    } catch (error) {
      console.error('Error updating order:', error)
      res.redirect('http://localhost:3006/failed')
    }
  } else {
    res.redirect('http://localhost:3006/failed')
  }
})

app.post('/api/orders/order', async (req, res) => {
  const { id } = req.body
  const order = await OrderModel.findOne({ order_id: id })
  const user = await User.findById(order.user)
  console.log('Correct')
  res.json({ order, user })
})
// app.use(express.static(path.join(__dirname, '/client/dist')))
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
// })

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500
//   const message = err.message || 'Internal Server Error'

//   console.log(message)

//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   })
// })
