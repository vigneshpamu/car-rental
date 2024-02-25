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
import { Link, redirect, useNavigate } from 'react-router-dom'
import { toast } from '@/components/ui/use-toast'

const Car = () => {
  let navigate = useNavigate()
  const [data, setData] = useState(null)
  const [dataNew, setDataNew] = useState(null)
  const [startTime, setStartTime] = useState({
    hour: '01',
    minute: '00',
    day: 'PM',
  })
  const [searchTerm, setSearchTerm] = useState('')

  const { currentUser } = useSelector((state) => state.user)
  const [allData, setAllData] = useState()
  const [hour, setHour] = useState(1)
  const [endTime, setEndTime] = useState({
    hour: '02',
    minute: '00',
    day: 'PM',
  })
  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)

    const results = data?.filter(
      (item) =>
        item.make.toLowerCase().includes(value.toLowerCase()) ||
        item.model.toLowerCase().includes(value.toLowerCase())
    )

    setDataNew(results)
  }
  const [showModal, setShowModal] = useState(true)
  const middleCheck = (index) => {
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
      setShowModal(false)
    } else {
      navigate(`/details/${index}`)
    }
  }
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
  // Effect hook to make the Axios GET request when the component renders

  const CheckoutHandler = async (name, amount, id) => {
    const {
      data: { order },
    } = await axios.post('http://localhost:3003/api/payment/checkout', {
      name,
      amount,
      email: currentUser.email,
      vehicleId: id,
    })

    console.log({ order })
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
    const fetchData = async () => {
      try {
        // Make Axios GET request
        const response = await axios.get(
          'http://localhost:3003/api/vehicle/get'
        )

        const fData = response.data.filter((item) => item.category === 'car')
        // Set the data in state
        setData(fData)
        setDataNew(fData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData() // Call the fetchData function
  }, [])

  useEffect(() => {
    console.log(startDate, 'This is Final Data')
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
    console.log(totalHours)
    setHour(totalHours)
  }, [startTime, endTime, startDate, endDate])
  return (
    <div className="mt-20 min-h-[100vh] bg-slate-900">
      <div className="max-w-[1200px] py-10 mx-auto flex flex-col items-center justify-center gap-10">
        <input
          type="text"
          placeholder="Search the Car"
          className="w-[80%] mt-5 p-3 border-2"
          onChange={handleSearch}
          value={searchTerm}
        />
        <div className="grid grid-cols-2 gap-4">
          {dataNew?.map((item, index) => {
            const src = `${item.img}`
            return (
              <div key={index}>
                <div className=" w-[70 0px] border-2 flex flex-col">
                  <div className="h-[240px]  w-[350px] lg:h-a uto lg:w -48 borde r-2 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
                    <img
                      src={src}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className=" border-gray -400 lg:border-l-0 b order-2 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                      <div className="text-gray-900 font-bold text-xl min-w-[280px] mb-2">
                        {item.make} | {item.model}
                      </div>
                      <div>
                        <p>Year - {item.year}</p>
                        <p>Mileage - {item.cur_mileage} miles</p>
                        <p>Capacity - {item.capacity}</p>
                        <p>Availability - {item.availability ? 'Yes' : 'No'}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => middleCheck(item.index)}
                      className="text-white w-full rounded-lg py-2 bg-blue-500 hover:bg-blue-600 cursor-pointer "
                    >
                      Rent at &#8377;{item.rate} / hr
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Car
