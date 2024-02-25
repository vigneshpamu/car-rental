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
    const cars = [
      {
        category: 'car',
        index: 1,
        make: 'Maruti Alto',
        model: 'K10',
        year: '2010',
        capacity: 5,
        availability: true,
        cur_mileage: '24.39 - 24.9 kmpl',
        img: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/Alto-K10/10331/1687349000534/front-left-side-47.jpg?tr=w-664',
        rate: 1000,
        engine: '998 cc',
        torque: '82.1Nm',
        fuel: 'CNG / Petrol',
        transmission: 'Manual',
        fuelCap: '55 Litres',
        power: '55.92 - 65.71 bhp',
      },
      {
        category: 'car',
        index: 2,
        make: 'Renault',
        model: 'KWID',
        year: '2015',
        rate: 1200,
        capacity: 5,
        availability: true,
        cur_mileage: '21.46 - 22.3 kmpl',
        img: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Renault/KWID/10076/1705905595853/front-left-side-47.jpg?tr=w-664',
        engine: '999 cc',
        torque: '91Nm',
        fuel: 'Petrol',
        transmission: 'Automatic / Manual',
        fuelCap: '28 Litres',
        power: '67.06 bhp',
      },
      {
        category: 'car',
        index: 3,
        make: 'Maruti',
        model: 'S-Presso',
        year: '2015',
        rate: 1300,
        capacity: 5,
        availability: true,
        cur_mileage: '24.12 - 25.3 kmpl',
        img: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Maruti/S-Presso/10348/Maruti-S-Presso-LXi/1687519307943/front-left-side-47.jpg?tr=w-664',
        engine: '998 cc',
        torque: '89Nm - 82.1Nm',
        fuel: 'CNG / Petrol',
        transmission: 'Automatic / Manual',
        fuelCap: '28 Litres',
        power: '55.92 - 65.71 bhp',
      },
      {
        category: 'car',
        index: 4,
        make: 'Tata',
        model: 'Nexon',
        year: '2017',
        rate: 1500,
        capacity: 5,
        availability: true,
        cur_mileage: '17.01 - 24.08 kmpl',
        img: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Nexon/11104/1697698470038/front-left-side-47.jpg?tr=w-664',
        engine: '1199 cc - 1497 cc',
        torque: '170Nm',
        fuel: 'Diesel',
        transmission: 'Automatic / Manual',
        fuelCap: '35 Litres',
        power: '55.92 - 65.71 bhp',
      },
      {
        category: 'car',
        index: 5,
        make: 'Tata',
        model: 'Punch',
        year: '2017',
        rate: 1700,
        capacity: 4,
        availability: true,
        cur_mileage: '18.8 - 20.09 kmpl',
        img: 'https://stimg.cardekho.com/images/carexteriorimages/630x420/Tata/Punch/10681/1691392713058/front-left-side-47.jpg?tr=w-664',
        engine: '1199 cc - 1497 cc',
        torque: '115Nm',
        fuel: 'Petrol',
        transmission: 'Automatic',
        fuelCap: '37 Litres',
        power: '72.41 - 86.63 bhp',
      },
    ]

    const bike = [
      {
        category: 'bike',
        index: 11,
        make: 'Hero',
        model: 'Splendor Plus',
        year: '2004',
        capacity: 2,
        availability: true,
        cur_mileage: '80.6 kmpl',
        img: 'https://bd.gaadicdn.com/processedimages/hero-motocorp/hero-motocorp-splendor/source/hero-motocorp-splendor6594ef508d3db.jpg',
        rate: 500,
        engine: '97.2 cc',
        torque: '8.05 Nm',
        fuel: 'Petrol',
        transmission: 'Manual',
        fuelCap: '9.8 L',
        power: '8.02 PS',
      },
      {
        category: 'bike',
        index: 12,
        make: 'TVS',
        model: 'Raider',
        year: '2021',
        capacity: 2,
        availability: true,
        cur_mileage: '67 kmpl',
        img: 'https://bd.gaadicdn.com/processedimages/tvs/raider/source/raider6391b0dc795bf.jpg',
        rate: 700,
        engine: '124.8 cc',
        torque: '11.2 Nm ',
        fuel: 'Petrol',
        transmission: 'Manual',
        fuelCap: '10 L',
        power: '11.38 PS ',
      },
      {
        category: 'bike',
        index: 13,
        make: 'Honda',
        model: 'SP 125',
        year: '2023',
        capacity: 2,
        availability: true,
        cur_mileage: '60 kmpl',
        img: 'https://bd.gaadicdn.com/processedimages/honda/sp-125/source/sp-125646c75d0667b8.jpg',
        rate: 650,
        engine: '123.94 cc',
        torque: '10.9 Nm',
        fuel: 'Petrol',
        transmission: 'Manual',
        fuelCap: '11.2 L',
        power: '10.87 PS',
      },
      {
        category: 'bike',
        index: 14,
        make: 'Bajaj',
        model: 'Pulsar NS 125',
        year: '2010',
        capacity: 2,
        availability: true,
        cur_mileage: '64.75 kmpl',
        img: 'https://bd.gaadicdn.com/processedimages/bajaj/pulsar-ns-125/source/pulsar-ns-125611b855108045.jpg',
        rate: 900,
        engine: '124.2 cc',
        torque: '11.05 Nm',
        fuel: 'Petrol',
        transmission: 'Manual',
        fuelCap: '12 L',
        power: '12 PS',
      },
      {
        category: 'bike',
        index: 15,
        make: 'Hero',
        model: 'Mavrick 440',
        year: '2015',
        capacity: 2,
        availability: true,
        cur_mileage: '90.6 kmpl',
        img: 'https://bd.gaadicdn.com/processedimages/hero-motocorp/hero-motocorp-splendor/source/hero-motocorp-splendor6594ef508d3db.jpg',
        rate: 500,
        engine: '440 cc',
        torque: '36 Nm',
        fuel: 'Petrol',
        transmission: 'Manual',
        fuelCap: '13.5 L',
        power: '27.36 PS',
      },
    ]
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
