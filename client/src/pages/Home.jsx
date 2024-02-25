import { BoxesCore } from '@/components/aceternity/BoxesCore'
import { cn } from '@/utils/cn'
import clsx from 'clsx'
import React from 'react'

export default function Home() {
  const meteors = new Array(50 || 20).fill(true)
  return (
    <div className="h-[93vh] mt-16 py-28 bg-slate-900 ">
      {/* {meteors.map((el, idx) => (
        <span
          key={'meteor' + idx}
          className={cn(
            'animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]',
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent"
          )}
          style={{
            top: 0,
            left: Math.floor(Math.random() * (400 - -400) + -400) + 'px',
            animationDelay: Math.random() * (0.8 - 0.2) + 0.2 + 's',
            animationDuration: Math.floor(Math.random() * (10 - 2) + 2) + 's',
          }}
        ></span>
      ))} */}
      {/* <div className="relative flex items-center flex-row justify-between  h-full max-w-[1200px] py-5 mx-auto">
        <div>
          <p className="text-white  text-4xl font-semibold">Welcome To </p>
          <p className="text-white  text-5xl font-semibold">
            <span className="text-red-500"># </span>
            FANTASIES 2024
          </p>
          <p className="text-white">Scroll down to see all the events</p>
        </div>
        <div className="  ">
         
          <img src="/images/hero/hero2.png" className="w-[350px]" alt="" />
        </div>
      </div> */}
      <div className="max-w-[1200px] mx-auto flex items-center gap-20">
        <div className="flex flex-col gap-6">
          <p className="text-white text-2xl font-semibold">
            Explore the City Your Way
          </p>
          <p className="text-white text-4xl font-semibold">
            Rent Cars and Bikes by Hour
          </p>
          <p className="text-white text-xl">
            Discover the freedom of flexible transportation with our hourly car
            and bike rental service. Whether you're navigating the urban jungle
            or exploring scenic routes, we offer convenient options tailored to
            your schedule and preferences.
          </p>
          <div className="text-center flex items-c enter justify-ce nter flex-row gap-5">
            <a
              className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800"
              href="/sign-up"
            >
              Register Now
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
            <a
              className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-violet-600 shadow-lg shadow-transparent hover:shadow-blue-700/50 border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 dark:focus:ring-offset-gray-800"
              href="/category"
            >
              Explore Vehicles
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </div>
        </div>
        <div className="min-w-[500px]">
          <img src="/images/hero/new.png" className="w-full h-auto" alt="" />
        </div>
      </div>
    </div>
  )
}
