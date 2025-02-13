import React, { useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"
import Footer from "./components/footer/Footer"
import Contact from "./pages/contact/Contact"
import NotFound from "./components/NotFound/NotFound"
import About from "./pages/about/About"
import Store from "./pages/store/Store"
import ProductDetailsPage from "./pages/productDetailsPage/ProductDetailsPage"
import Cart from "./pages/cart/Cart"
import Checkout from "./pages/Checkout/Checkout"
import Profile from "./pages/profile/Profile"
import Razorpay from "./components/razorpay/Razorpay"

const App = () => {
	const location = useLocation()
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [location])
	return (
		<div>
			<Navbar />
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/> 
				<Route
					path="/store"
					element={<Store />}
				/>
				<Route
					path="/store/:id"
					element={<ProductDetailsPage />}
				/>
				<Route
					path="/profile"
					element={<Profile />}
				/>
				<Route
					path="/about"
					element={<About />}
				/>
				<Route
					path="/cart"
					element={<Cart />}
				/>
				<Route
					path="/checkout"
					element={<Checkout />}
				/>

				<Route
					path="/contact"
					element={<Contact />}
				/>
				<Route
					path="*"
					element={<NotFound />}
				/>
				<Route
					path="/test"
					element={<Razorpay />}
				/>
			</Routes>
			<Footer />
		</div>
	)
}

export default App
