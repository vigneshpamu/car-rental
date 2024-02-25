import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body
  const hashedPassword = bcryptjs.hashSync(password, 10)
  const newUser = new User({ name, email, password: hashedPassword })
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'vigneshpamu2002@gmail.com',
      pass: 'xpnjmyirlvcnaycz',
    },
  })
  const link = `http://localhost:3006/sign-in`

  //2.configure email content.
  const mailOptions = {
    from: 'vigneshpamu2002@gmail.com',
    to: `${email}`,
    subject: 'Your Account is Created Successfully',
    text: 'Your Account is Created Successfully',
    html: `<div style="">
    <p>Login in to your account</p>
    
    
<a href=${link}>
  <button style="background-color: #3399ff; padding: 10px; font-size:24px;color: white;">Sign - In
  </button>
</a>
    </div>`,
  }

  //3. send email
  try {
    const result = await transporter.sendMail(mailOptions)
    console.log('Eamil sent successfully')
  } catch (error) {
    console.log('Email send failed with error:', error)
  }
  try {
    await newUser.save()
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}

export const signIn = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const validUser = await User.findOne({ email })
    if (!validUser) return next(errorHandler(404, 'User Not Found'))
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) return next(errorHandler(404, 'Wrong Credentials'))
    const { password: pass, ...rest } = validUser._doc

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json(rest)
  } catch (error) {
    next(error)
  }
}

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      const { password: pass, ...rest } = user._doc
      res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .status(200)
        .json(rest)
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8)
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
      const newUser = new User({
        name:
          req.body.name.split(' ').join('').toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      })

      await newUser.save()

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
      const { password: pass, ...rest } = newUser._doc

      res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .status(200)
        .json(rest)
    }
  } catch (error) {
    next(error)
  }
}

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token')
    res.status(200).json('User has been logged out')
  } catch (error) {
    next(error)
  }
}
