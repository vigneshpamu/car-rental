import React from 'react'

const Footer = () => {
  return (
    <div className="h-full bg-slate-800 w-full brder -2 py-10">
      <footer className=" rounded-lg shadow m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a
              href="/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 p-5 bg-white rounded-lg rtl:space-x-reverse"
            >
              <img
                src="/images/logo/logobg.png"
                className="h-16"
                alt="Flowbite Logo"
              />
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
              <li>
                <a href="/category" className="hover:underline me-4 md:me-6">
                  About
                </a>
              </li>
              <li>
                <a href="/category" className="hover:underline me-4 md:me-6">
                  Category
                </a>
              </li>
              <li>
                <a href="/Contact" className="hover:underline me-4 md:me-6">
                  Contact
                </a>
              </li>
              {/* <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li> */}
            </ul>
          </div>
          <hr className="my-6   sm:mx-auto lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center">
            © 2023{' '}
            <a href="https://flowbite.com/" className="hover:underline">
              RentToGo
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  )
}

export default Footer
