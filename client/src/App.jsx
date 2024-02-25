import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile'

import Success from './pages/Success'
import Failed from './pages/Failed'
import Upload from './pages/Upload'
import Category from './pages/Category'
import Car from './pages/Car'
import Bike from './pages/Bike'
import Details from './pages/Details'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/search" element={<Search />} /> */}
        {/* <Route path="/listing/:listingId" element={<Listing />} /> */}
        {/* <Route path="/category" element={<Category />}>
          <Route path="/car" element={<Car />} />
        </Route> */}
        <Route path="/category" element={<Category />} />
        <Route path="/category/car" element={<Car />} />
        <Route path="/details/:index" element={<Details />} />
        <Route path="/category/bike" element={<Bike />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failed" element={<Failed />} />
          {/* <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
