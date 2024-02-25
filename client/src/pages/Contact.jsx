import { toast } from '@/components/ui/use-toast'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const handleClick = (e) => {
    e.preventDefault()
    if (!name || !phone || !subject || !message) {
      toast({
        title: 'Please fill all data',
        variant: 'destructive',
      })
    }
  }
  return (
    <div className="mt-20 bg-slate-900 h-[100vh] text-white">
      <div className="max-w-[1200px] py-10  mx-auto">
        <p className="text-3xl mb-20 w-full text-center">Contact Us</p>

        <form className="max-w-[800px] mx-auto" onSubmit={handleClick}>
          <div className="md:flex items-center mt-12">
            <div className="w-full md:w-1/2 flex flex-col">
              <label className="font-semibold leading-none text-gray-300">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
              <label className="font-semibold leading-none text-gray-300">
                Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
              />
            </div>
          </div>
          <div className="md:flex items-center mt-8">
            <div className="w-full flex flex-col">
              <label className="font-semibold leading-none text-gray-300">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded"
              />
            </div>
          </div>
          <div>
            <div className="w-full flex flex-col mt-8">
              <label className="font-semibold leading-none text-gray-300">
                Message
              </label>
              <textarea
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="h-40 text-base leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-800 border-0 rounded"
              ></textarea>
            </div>
          </div>
          <div className="flex items-center justify-center w-full">
            <button
              type="submit"
              className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Contact
