// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
// import stylessecond from "./singleProduct.module.css";
// import { useLocation, useNavigate } from "react-router-dom";
// import { addToCart, removeFromCart, fetchCart } from '../../../utils/productFunction.js';
// import PrimaryLoader from "../../../utils/loaders/PrimaryLoader";
// import Cookies from 'js-cookie';
// import LoginPopup from '../../../components/LoginPopup/LoginPopup.jsx';
// import { ToastContainer, toast } from 'react-toastify';
// import { makeApi } from "../../../api/callApi.tsx";


// const SingleProduct = () => {
// 	const [products, setProducts] = useState([]);
// 	const [loading, setLoading] = useState(false);
// 	const [cartItems, setCartItems] = useState([]);
// 	const [productLoaders, setProductLoaders] = useState({});
// 	console.log(productLoaders);
// 	const [fetchCartLoader, setFetchCartLoader] = useState(false);
// 	const [showPopup, setShowPopup] = useState(false);
// 	const [isLogin, setIsLogin] = useState(false);
// 	const [selectedSize, setSelectedSize] = useState({});
// 	const [search, setSearch] = useState("");
// 	const [priceRange, setPriceRange] = useState([0, 100000]);

// 	const navigate = useNavigate();
// 	const location = useLocation();
// 	useEffect(() => {
// 		const defaultSize = {};
// 		products.forEach(product => {
// 			defaultSize[product._id] = product.size[0]._id;
// 		});
// 		setSelectedSize(defaultSize);
// 	}, [products]);

// 	useEffect(() => {
// 		const token = localStorage.getItem('token');
// 		const cookiesData = Cookies.get('register');
// 		setIsLogin(token && cookiesData === "true");
// 		fetchAllProducts();
// 		fetchCartItems();
// 	}, [search, priceRange]);

// 	const fetchAllProducts = async () => {
// 		try {
// 			setLoading(true);
// 			const response = await makeApi(`/api/get-all-products`);
// 			console.log(response.data);
// 			setProducts(response.data.products);
// 		} catch (error) {
// 			console.log("Error fetching products:", error);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	const fetchCartItems = async () => {
// 		try {
// 			setFetchCartLoader(true);
// 			await fetchCart(setCartItems, null, setFetchCartLoader);
// 		} catch (error) {
// 			console.error('Error fetching cart items:', error);
// 		} finally {
// 			setFetchCartLoader(false);
// 		}
// 	};

// 	const handleSelectedSize = (productId, e) => {
// 		setSelectedSize({
// 			...selectedSize,
// 			[productId]: e.target.value,
// 		});
// 	};

// 	const handleAddToCart = async (productId, productSizeId) => {
// 		if (!isLogin) {
// 			setShowPopup(true);
// 			return;
// 		}

// 		if (!selectedSize[productId]) {
// 			toast('Please select a size', { type: 'error' });
// 			return;
// 		}
// 		setProductLoaders(prevState => ({
// 			...prevState,
// 			[selectedSize[productId]]: true,
// 		  }));



// 		try {
// 			await addToCart(
// 				productId,
// 				setIsLogin,
// 				setShowPopup,
// 				fetchCart,
// 				setCartItems,
// 				setProductLoaders,
// 				selectedSize[productId]
// 			);
// 			fetchCartItems();
// 		} catch (error) {
// 			console.error('Error adding to cart:', error);
// 		} finally {
// 			setProductLoaders(prevState => ({
// 				...prevState,
// 				[selectedSize[productId]]: false,
// 			  }));
// 		}
// 	};

// 	const handleIncreaseQuantity = async (productId, productSizeId) => {
// 		try {
// 			await addToCart(
// 				productId,
// 				setIsLogin,
// 				setShowPopup,
// 				fetchCart,
// 				setCartItems,
// 				setProductLoaders,
// 				productSizeId
// 			);
// 			fetchCartItems();
// 		} catch (error) {
// 			console.error('Error increasing quantity:', error);
// 		}
// 	};

// 	const handleDecreaseQuantity = async (productId, productSizeId) => {
// 		await removeFromCart(
// 			productId,
// 			setProductLoaders,
// 			setCartItems,
// 			fetchCart,
// 			productSizeId
// 		);
// 		fetchCartItems();

// 	};

// 	const closePopup = () => {
// 		setShowPopup(false);
// 	};

// 	return (
// 		<div className={stylessecond.swiperContainer}>
// 			<ToastContainer />
// 			{showPopup && <LoginPopup setLoginPopup={closePopup} />}
// 			{loading ? (
// 				<PrimaryLoader />
// 			) : (
// 				<Swiper
// 					cssMode={true}
// 					navigation={{
// 						nextEl: ".custom-swiper-button-next",
// 						prevEl: ".custom-swiper-button-prev",
// 					}}
// 					pagination={{ clickable: true, el: ".swiper-pagination" }}
// 					mousewheel={false}
// 					keyboard={true}
// 					modules={[Navigation, Pagination, Keyboard]}
// 					className="mySwiper"
// 					breakpoints={{
// 						320: { slidesPerView: 1, spaceBetween: 10 },
// 						640: { slidesPerView: 2, spaceBetween: 20 },
// 						900: { slidesPerView: 3, spaceBetween: 30 },
// 						1250: { slidesPerView: 4, spaceBetween: 70 },
// 					}}
// 				>
// 					{products.map((product) => {
// 						return <SwiperSlide key={product._id} className={stylessecond.productCard}>
// 							<img
// 								src={product.thumbnail}
// 								alt={product.name}
// 								className={stylessecond.productImage}
// 							/>
// 							<div>
// 								<div className={stylessecond.productDetails}>
// 									<p>{product.name}</p>
// 									<select
// 										onChange={(e) => handleSelectedSize(product._id, e)}
// 										value={selectedSize[product._id] || ""}
// 									>
// 										<option value="">Select Size</option>
// 										{product.size.map((item) => (
// 											<option key={item._id} value={item._id}>
// 												{item.size} {item.sizetype}
// 											</option>
// 										))}
// 									</select>
// 								</div>
// 								<div className={stylessecond.productPrice}>
// 									<p>
// 										Rs. {product.size.find(s => s._id === selectedSize[product._id])?.FinalPrice || product.size[0].FinalPrice}{" "}
// 										<span className={stylessecond.oldPrice}>
// 											Rs. {product.size.find(s => s._id === selectedSize[product._id])?.price || product.size[0].price}
// 										</span>
// 									</p>
// 									{productLoaders[selectedSize[product._id]] ? (
// 										<div className="">
// 											<PrimaryLoader />
// 										</div>
// 									) : cartItems.some(item => item.productId === product._id && item.size === selectedSize[product._id] && item.quantity > 0) ? (
// 										<div className={stylessecond.cartControls}>
// 											<button
// 												disabled={productLoaders[selectedSize[product._id]]}
// 												onClick={() => handleDecreaseQuantity(product._id, selectedSize[product._id])}
// 											>
// 												-
// 											</button>
// 											<span>
// 												{cartItems.find(item => item.productId === product._id && item.size === selectedSize[product._id])?.quantity || 0}
// 											</span>
// 											<button
// 												disabled={productLoaders[selectedSize[product._id]]}
// 												onClick={() => handleIncreaseQuantity(product._id, selectedSize[product._id])}
// 											>
// 												+
// 											</button>
// 										</div>
// 									) : (
// 										<button
// 											className={stylessecond.addButton}
// 											onClick={() => handleAddToCart(product._id, selectedSize[product._id])}
// 											disabled={productLoaders[selectedSize[product._id]]}
// 										>
// 											{productLoaders[selectedSize[product._id]] ? "Adding..." : "Add to Cart"}
// 										</button>
// 									)}

// 									{/* {cartItems.some(item => item.productId === product._id && item.size === selectedSize[product._id] && item.quantity > 0) ? (
// 										<div className={stylessecond.cartControls}>
// 											<button
// 												disabled={productLoaders[selectedSize[product._id]]}
// 												onClick={() => handleDecreaseQuantity(product._id, selectedSize[product._id])}
// 											>
// 												-
// 											</button>
// 											<span>
// 												{cartItems.find(item => item.productId === product._id && item.size === selectedSize[product._id])?.quantity || 0}
// 											</span>
// 											<button
// 												disabled={productLoaders[selectedSize[product._id]]}
// 												onClick={() => handleIncreaseQuantity(product._id, selectedSize[product._id])}
// 											>
// 												+
// 											</button>
// 										</div>
// 									) : (
// 										<button
// 											className={stylessecond.addButton}
// 											onClick={() => handleAddToCart(product._id, selectedSize[product._id])}
// 											disabled={productLoaders[selectedSize[product._id]]}
// 										>
// 											{productLoaders[selectedSize[product._id]] ? "Adding..." : "Add to Cart"}
// 										</button>
// 									)} */}

// 								</div>
// 							</div>
// 						</SwiperSlide>
// 					})}
// 				</Swiper>
// 			)}
// 			<div className="swiper-pagination"></div>
// 		</div>
// 	);
// };

// export default SingleProduct;

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import stylessecond from "./singleProduct.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart, fetchCart } from '../../../utils/productFunction.js';
import PrimaryLoader from "../../../utils/loaders/PrimaryLoader";
import Cookies from 'js-cookie';
import LoginPopup from '../../../components/LoginPopup/LoginPopup.jsx';
import { ToastContainer, toast } from 'react-toastify';
import { makeApi } from "../../../api/callApi.tsx";

const SingleProduct = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [productLoaders, setProductLoaders] = useState({});
	const [fetchCartLoader, setFetchCartLoader] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const [selectedSize, setSelectedSize] = useState({});
	const [search, setSearch] = useState("");
	const [priceRange, setPriceRange] = useState([0, 100000]);

	const navigate = useNavigate();
	const location = useLocation();

	// useEffect(() => {
	// 	console.log(products)
	// 	const defaultSize = {};
	// 	products.forEach(product => {
	// 		defaultSize[product._id] = product.size[0]._id;
	// 	});
	// 	setSelectedSize(defaultSize);
	// }, [products]);
	useEffect(() => {
		console.log(products);
		const defaultSize = {};

		products.forEach(product => {
			// Find the first size that is not out of stock
			const inStockSize = product.size.find(size => size.IsOutOfStock === "false");

			// Set the default size to the first in-stock size, or the first size if all are out of stock
			defaultSize[product._id] = inStockSize ? inStockSize._id : product.size[0]._id;
		});

		setSelectedSize(defaultSize);
	}, [products]);

	// useEffect(() => {
	//     if (products?.size?.length > 0) {
	//         setSize(product.size);

	//         // Find a size that is in stock
	//         const inStockSize = product.size.find(size => size.IsOutOfStock === "false");

	//         // If no size is in stock, set the first size as default
	//         const defaultSize = inStockSize || product.size[0];

	//         setSelectedSize(defaultSize._id);
	//         setFilterData(defaultSize);
	//     }

	//     const token = localStorage.getItem('token');
	//     setIsLogin(token);
	// }, []);

	useEffect(() => {
		const token = localStorage.getItem('token');
		setIsLogin(token);
		fetchAllProducts();
		fetchCartItems();
	}, [search, priceRange]);

	const fetchAllProducts = async () => {
		try {
			setLoading(true);
			const response = await makeApi(`/api/get-all-products`);
			console.log(response.data);
			setProducts(response.data.products);
		} catch (error) {
			console.log("Error fetching products:", error);
		} finally {
			setLoading(false);
		}
	};

	const fetchCartItems = async () => {
		try {
			setFetchCartLoader(true);
			await fetchCart(setCartItems, null, setFetchCartLoader);
		} catch (error) {
			console.error('Error fetching cart items:', error);
		} finally {
			setFetchCartLoader(false);
		}
	};

	const handleSelectedSize = (productId, e) => {
		const selected = products.find(product => product._id === productId);
		const selectSize = selected.size.find(size => size._id === e.target.value);
		if (selectSize.IsOutOfStock === "true" || selectSize.quantity === 0) {
			toast('This size is out of stock', { type: 'error' });
			return;
		}
		setSelectedSize({
			...selectedSize,
			[productId]: e.target.value,
		});
	};

	// Helper function to manage loader for each product size
	const setLoader = (productId, sizeId, isLoading) => {
		setProductLoaders(prevState => ({
			...prevState,
			[`${productId}_${sizeId}`]: isLoading,
		}));
	};

	const handleAddToCart = async (productId, productSizeId) => {
		if (!isLogin) {
			setShowPopup(true);
			return;
		}

		if (!selectedSize[productId]) {
			toast('Please select a size', { type: 'error' });
			return;
		}

		try {
			// Set loader before action
			setLoader(productId, selectedSize[productId], true);

			await addToCart(
				productId,
				setIsLogin,
				setShowPopup,
				fetchCart,
				setCartItems,
				setProductLoaders,
				selectedSize[productId]
			);
			fetchCartItems();
		} catch (error) {
			console.error('Error adding to cart:', error);
		} finally {
			// Unset loader after action
			setLoader(productId, selectedSize[productId], false);
		}
	};

	const handleIncreaseQuantity = async (productId, productSizeId) => {
		try {
			setLoader(productId, productSizeId, true);

			await addToCart(
				productId,
				setIsLogin,
				setShowPopup,
				fetchCart,
				setCartItems,
				setProductLoaders,
				productSizeId
			);
			fetchCartItems();
		} catch (error) {
			console.error('Error increasing quantity:', error);
		} finally {
			setLoader(productId, productSizeId, false);
		}
	};

	const handleDecreaseQuantity = async (productId, productSizeId) => {
		try {
			setLoader(productId, productSizeId, true);

			await removeFromCart(
				productId,
				setProductLoaders,
				setCartItems,
				fetchCart,
				productSizeId
			);
			fetchCartItems();
		} catch (error) {
			console.error('Error decreasing quantity:', error);
		} finally {
			setLoader(productId, productSizeId, false);
		}
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	return (
		<div className={stylessecond.swiperContainer}>
			<ToastContainer />
			{showPopup && <LoginPopup setLoginPopup={closePopup} />}
			{loading ? (
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
					<PrimaryLoader />
				</div>
			) : (
				<Swiper
					cssMode={true}
					navigation={{
						nextEl: ".custom-swiper-button-next",
						prevEl: ".custom-swiper-button-prev",
					}}
					pagination={{ clickable: true, el: ".swiper-pagination" }}
					mousewheel={false}
					keyboard={true}
					modules={[Navigation, Pagination, Keyboard]}
					className="mySwiper"
					breakpoints={{
						320: { slidesPerView: 1, spaceBetween: 10 },
						640: { slidesPerView: 2, spaceBetween: 20 },
						900: { slidesPerView: 3, spaceBetween: 30 },
						1250: { slidesPerView: 4, spaceBetween: 70 },
					}}
				>
					{products.map((product) => {
						const sizeId = selectedSize[product._id];
						const loaderKey = `${product._id}_${sizeId}`;
						return (
							<SwiperSlide key={product._id} className={stylessecond.productCard}>
								<Link to={`/store/${product._id}`} >
								<div
									className={stylessecond.productImage}
									>
									<img
										src={product.thumbnail}
										alt={product.name}
										/>
								</div>
										</Link>
								<div>
									<div className={stylessecond.productDetails}>
										<p>{product.name}</p>
										<select
											onChange={(e) => handleSelectedSize(product._id, e)}
											value={selectedSize[product._id] || ""}
											className={stylessecond.selectSize}

										>
											<option value="">Select Size</option>
											{product.size.map((item) => (
												<option key={item._id} value={item._id}>
													{item.size} {item.sizetype}
												</option>
											))}
										</select>
									</div>
									<div className={stylessecond.productPrice}>
										<p>
											Rs. {product.size.find(s => s._id === sizeId)?.FinalPrice || product.size[0].FinalPrice}{" "}
											<span className={stylessecond.oldPrice}>
												Rs. {product.size.find(s => s._id === sizeId)?.price || product.size[0].price}
											</span>
										</p>
										{productLoaders[loaderKey] ? (
											<div className="">
												<PrimaryLoader />
											</div>
										) : cartItems.some(item => item.productId === product._id && item.size === sizeId && item.quantity > 0) ? (
											<div className={stylessecond.cartControls}>
												<button
													disabled={productLoaders[loaderKey]}
													onClick={() => handleDecreaseQuantity(product._id, sizeId)}
												>
													-
												</button>
												<span>
													{cartItems.find(item => item.productId === product._id && item.size === sizeId)?.quantity || 0}
												</span>
												<button
													disabled={productLoaders[loaderKey]}
													onClick={() => handleIncreaseQuantity(product._id, sizeId)}
												>
													+
												</button>
											</div>
										) : (
											<button
												className={stylessecond.addButton}
												onClick={() => handleAddToCart(product._id, sizeId)}
												disabled={productLoaders[loaderKey]}
												style={{ cursor: productLoaders[loaderKey] ? "not-allowed" : "pointer" }}
											>
												Add to Cart
											</button>
										)}
									</div>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			)}
		</div>
	);
};

export default SingleProduct;
