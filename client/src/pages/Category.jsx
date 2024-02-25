import React from 'react'
import { FaCar } from 'react-icons/fa'
import { MdDirectionsBike } from 'react-icons/md'
import { Link } from 'react-router-dom'
const Category = () => {
  return (
    <div className="mt-20 bg-slate-900 h-[95vh] text-white">
      <div className="max-w-[1200px] py-10 flex flex-col items-center justify-center mx-auto">
        <p className="text-3xl mb-20">Select a Category</p>
        <div className="flex flex-row items-start gap-10">
          <div className="p-20 bg-white hover:bg-gray-100 transition-all cursor-pointer rounded-lg">
            <Link to={'/category/bike'}>
              <p className="text-9xl text-red-500">
                {/* <RiMotorbikeFill /> */}
                {/* <RiEBikeFill /> */}
                <MdDirectionsBike />
              </p>
            </Link>
          </div>
          <div className="p-20 bg-white hover:bg-gray-100 transition-all cursor-pointer rounded-lg">
            <Link to={'/category/car'}>
              <p className="text-9xl text-red-500">
                <FaCar />
                {/* <RiMotorbikeFill /> */}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category
