import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className="mt-20 bg-slate-900 h-[95vh] text-white">
      <div className="max-w-[1200px] py-10  mx-auto">
        <p className="text-3xl mb-20 w-full text-center">About Us</p>
        <div className="">
          <p className="text-3xl">Driving towards a sustainable future.</p>
          <p className="text-xl mt-5 w-[70%]">
            "Explore our travel solutions! From short-term rentals to long-term
            leases, we offer a seamless experience tailored to your
            requirements. Join us and discover the ease and flexibility of
            renting with us!"
          </p>
        </div>
      </div>
    </div>
  )
}

export default About
