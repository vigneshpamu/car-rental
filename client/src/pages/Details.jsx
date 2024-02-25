import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import axios from 'axios'
import { ToastAction } from '@/components/ui/toast'
import { useSelector } from 'react-redux'
import DateRangeComp from '@/components/DateRangeComp'
import TimeSelector from '@/components/TimeSelector'
import { Link, redirect, useNavigate, useParams } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'
import { bike, cars } from '@/data/vehiclesData'
const Details = () => {
  const { index } = useParams()
  const [item, setItem] = useState()

  useEffect(() => {
    // const mineData = cars.filter((item) => Number(item.index) === index)
    if (index > 10) {
      const newData = bike.filter((item) => item.index === Number(index))
      setItem(newData[0])
    } else {
      const newData = cars.filter((item) => item.index === Number(index))
      setItem(newData[0])
    }
  }, [index])

  let navigate = useNavigate()

  const [startTime, setStartTime] = useState({
    hour: '01',
    minute: '00',
    day: 'PM',
  })
  const { currentUser } = useSelector((state) => state.user)
  const [allData, setAllData] = useState()
  const [hour, setHour] = useState(1)
  const [endTime, setEndTime] = useState({
    hour: '02',
    minute: '00',
    day: 'PM',
  })

  function formatDate(dateString) {
    const date = new Date(dateString)
    const formattedDate = `${date.getDate()} ${date.toLocaleString('default', {
      month: 'short',
    })} ${date.getFullYear()}`
    return formattedDate
  }
  function calculateTotalHours(
    startDateStr,
    startTimeStr,
    endDateStr,
    endTimeStr
  ) {
    const startDate = new Date(startDateStr)
    const startTimeComponents = startTimeStr
      .split(' : ')
      .map((str) => parseInt(str))
    startDate.setHours(startTimeComponents[0])
    startDate.setMinutes(startTimeComponents[1])

    const endDate = new Date(endDateStr)
    const endTimeComponents = endTimeStr
      .split(' : ')
      .map((str) => parseInt(str))
    endDate.setHours(endTimeComponents[0])
    endDate.setMinutes(endTimeComponents[1])

    const timeDifference = endDate.getTime() - startDate.getTime()
    const totalHours = timeDifference / (1000 * 60 * 60) // Convert milliseconds to hours

    return totalHours
  }
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const CheckoutHandler = async (name, amount, id) => {
    console.log(id)
    const {
      data: { order, item },
    } = await axios.post('http://localhost:3003/api/payment/checkout', {
      name,
      amount,
      email: currentUser.email,
      index: id,
      sDate: allData.sDate,
      eDate: allData.eDate,
      sTime: allData.sTime,
      eTime: allData.eTime,
    })

    console.log({ item })
    console.log(typeof amount)

    var options = {
      key: 'rzp_test_yoQ3nmI7J3LyOK', // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: name, //your business name
      description: 'Event',
      image: 'https://example.com/your_logo',
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: 'http://localhost:3003/api/payment/payment-verification',
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: currentUser.name, //your customer's name
        email: currentUser.email,
        contact: '9000090000', //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    }
    var rzp1 = new window.Razorpay(options)
    rzp1.open()
  }
  useEffect(() => {
    if (!currentUser) {
      // navigate('/sign-in')
      toast({
        title: 'Please Sign - In',
        action: (
          <ToastAction
            onClick={() => {
              navigate('/sign-in')
            }}
            altText="Sign - In"
          >
            Sign In
            {/* <Link to="/sign-in">Sign In</Link> */}
          </ToastAction>
        ),
        // description: 'Friday, February 10, 2023 at 5:57 PM',
      })
      return
    }
    // Call the fetchData function
  }, [])
  console.log(item)
  useEffect(() => {
    // console.log(startDate, 'This is Final Data')
    const sDate = formatDate(startDate)
    const eDate = formatDate(endDate)

    // console.log(sDate) // Output: "26 Feb 2024"

    const newVal = {
      sDate,
      sTime: `${startTime.hour} : ${startTime.minute} ${startTime.day}`,
      eDate,
      eTime: `${endTime.hour} : ${endTime.minute} ${endTime.day}`,
    }
    setAllData(newVal)
    // console.log(newVal)
    const totalHours = calculateTotalHours(
      newVal.sDate,
      newVal.sTime,
      newVal.eDate,
      newVal.eTime
    )
    // console.log(totalHours)
    setHour(totalHours)
  }, [startTime, endTime, startDate, endDate])

  return (
    <div className="mt-20">
      {item && (
        <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center gap-10">
          {/* <button
            onClick={() => middleCheck()}
            className="text-white w-full rounded-lg py-2 bg-blue-500 hover:bg-blue-600 cursor-pointer "
          >
            Rent at &#8377;{item.rate} / hr
          </button> */}
          <div className="flex flex-col py-10 overflow-scroll min-w-[350px] h-full  gap-5">
            <div className="flex flex-col md:flex-row gap-5">
              <div>
                <img src={item.img} className="h-full" alt="" />
              </div>
              <div className="bg-gray-100 md:w-[600px]">
                <div className="border-2 p-3 px-4 flex flex-row justify-between">
                  <div>
                    <p>Rate</p>
                  </div>
                  <p>{item.rate} / hr</p>
                </div>
                <div className="border-2 p-3 px-4 flex flex-row justify-between">
                  <div>
                    <p>Engine</p>
                  </div>
                  <p>{item.engine}</p>
                </div>
                <div className="border-2 p-3 px-4 flex flex-row justify-between">
                  <div>
                    <p>Torque</p>
                  </div>
                  <p>{item.torque}</p>
                </div>
                <div className="border-2 p-3 px-4 flex flex-row justify-between">
                  <div>
                    <p>Fuel</p>
                  </div>
                  <p>{item.fuel}</p>
                </div>
                <div className="border-2 p-3 px-4 flex flex-row justify-between">
                  <div>
                    <p>Transmission</p>
                  </div>
                  <p>{item.transmission}</p>
                </div>
                <div className="border-2 p-3 px-4 flex flex-row justify-between">
                  <div>
                    <p>Fuel Cap</p>
                  </div>
                  <p>{item.fuelCap}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="p-2  flex flex-col gap-2">
                <p className="font-bold">Select Start Date</p>
                <DateRangeComp
                  setStartDate={setStartDate}
                  startDate={startDate}
                />
              </div>
              <div className="p-2  flex flex-col gap-2">
                <p className="font-bold">Select End Date</p>
                <DateRangeComp setStartDate={setEndDate} startDate={endDate} />
              </div>
            </div>
            <div className="flex flex-row gap-7">
              <div className="p-2 flex flex-col gap-2">
                <p className="font-bold">Select Start Time</p>
                {/* <TimePicker onChange={onChange} value={value} /> */}

                <TimeSelector
                  setStartTime={setStartTime}
                  startTime={startTime}
                />
              </div>
              <div className="p-2 flex flex-col gap-2">
                <p className="font-bold">Select End Time</p>
                {/* <TimeSelector /> */}
                <TimeSelector setStartTime={setEndTime} startTime={endTime} />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={() =>
                  CheckoutHandler(
                    item.make + ' ' + item.model,
                    item.rate * hour,
                    item.index
                  )
                }
                className="text-white w-full rounded-lg py-2 bg-blue-500 hover:bg-blue-600 cursor-pointer "
              >
                Rent at &#8377;{item.rate * hour}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Details
