// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination, Keyboard } from "swiper/modules";
// import stylessecond from "./singleProduct.module.css";
// import { Link, useLocation, useNavigate } from "react-router-dom";
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
// 	const [fetchCartLoader, setFetchCartLoader] = useState(false);
// 	const [showPopup, setShowPopup] = useState(false);
// 	const [isLogin, setIsLogin] = useState(false);
// 	const [selectedSize, setSelectedSize] = useState({});
// 	const [search, setSearch] = useState("");
// 	const [priceRange, setPriceRange] = useState([0, 100000]);

// 	const navigate = useNavigate();
// 	const location = useLocation();


// 	useEffect(() => {
// 		console.log(products);
// 		const defaultSize = {};

// 		products.forEach(product => {
// 			// Find the first size that is not out of stock
// 			const inStockSize = product.size.find(size => size.IsOutOfStock === "false");

// 			// Set the default size to the first in-stock size, or the first size if all are out of stock
// 			defaultSize[product._id] = inStockSize ? inStockSize._id : product.size[0]._id;
// 		});

// 		setSelectedSize(defaultSize);
// 	}, [products]);


// 	useEffect(() => {
// 		const token = localStorage.getItem('token');
// 		setIsLogin(token);
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
// 		const selected = products.find(product => product._id === productId);
// 		const selectSize = selected.size.find(size => size._id === e.target.value);
// 		if (selectSize.IsOutOfStock === "true" || selectSize.quantity === 0) {
// 			toast('This size is out of stock', { type: 'error' });
// 			return;
// 		}
// 		setSelectedSize({
// 			...selectedSize,
// 			[productId]: e.target.value,
// 		});
// 	};

// 	// Helper function to manage loader for each product size
// 	const setLoader = (productId, sizeId, isLoading) => {
// 		setProductLoaders(prevState => ({
// 			...prevState,
// 			[`${productId}_${sizeId}`]: isLoading,
// 		}));
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

// 		try {
// 			// Set loader before action
// 			setLoader(productId, selectedSize[productId], true);

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
// 			// Unset loader after action
// 			setLoader(productId, selectedSize[productId], false);
// 		}
// 	};

// 	const handleIncreaseQuantity = async (productId, productSizeId) => {
// 		try {
// 			setLoader(productId, productSizeId, true);

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
// 		} finally {
// 			setLoader(productId, productSizeId, false);
// 		}
// 	};

// 	const handleDecreaseQuantity = async (productId, productSizeId) => {
// 		try {
// 			setLoader(productId, productSizeId, true);

// 			await removeFromCart(
// 				productId,
// 				setProductLoaders,
// 				setCartItems,
// 				fetchCart,
// 				productSizeId
// 			);
// 			fetchCartItems();
// 		} catch (error) {
// 			console.error('Error decreasing quantity:', error);
// 		} finally {
// 			setLoader(productId, productSizeId, false);
// 		}
// 	};

// 	const closePopup = () => {
// 		setShowPopup(false);
// 	};

// 	return (
// 		<div className={stylessecond.swiperContainer}>
// 			<ToastContainer />
// 			{showPopup && <LoginPopup setLoginPopup={closePopup} />}
// 			{loading ? (
// 				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
// 					<PrimaryLoader />
// 				</div>
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
// 						const sizeId = selectedSize[product._id];
// 						const loaderKey = `${product._id}_${sizeId}`;
// 						return (
// 							<SwiperSlide key={product._id} className={stylessecond.productCard}>
// 								<Link to={`/store/${product._id}`} >
// 								<div
// 									className={stylessecond.productImage}
// 									>
// 									<img
// 										src={product.thumbnail}
// 										alt={product.name}
// 										/>
// 								</div>
// 										</Link>
// 								<div>
// 									<div className={stylessecond.productDetails}>
// 										<p>{product.name}</p>
// 										<select
// 											onChange={(e) => handleSelectedSize(product._id, e)}
// 											value={selectedSize[product._id] || ""}
// 											className={stylessecond.selectSize}

// 										>
// 											<option value="">Select Size</option>
// 											{product.size.map((item) => (
// 												<option key={item._id} value={item._id}>
// 													{item.size} {item.sizetype}
// 												</option>
// 											))}
// 										</select>
// 									</div>
// 									<div className={stylessecond.productPrice}>
// 										<p>
// 											Rs. {product.size.find(s => s._id === sizeId)?.FinalPrice || product.size[0].FinalPrice}{" "}
// 											<span className={stylessecond.oldPrice}>
// 												Rs. {product.size.find(s => s._id === sizeId)?.price || product.size[0].price}
// 											</span>
// 										</p>
// 										{productLoaders[loaderKey] ? (
// 											<div className="">
// 												<PrimaryLoader />
// 											</div>
// 										) : cartItems.some(item => item.productId === product._id && item.size === sizeId && item.quantity > 0) ? (
// 											<div className={stylessecond.cartControls}>
// 												<button
// 													disabled={productLoaders[loaderKey]}
// 													onClick={() => handleDecreaseQuantity(product._id, sizeId)}
// 												>
// 													-
// 												</button>
// 												<span>
// 													{cartItems.find(item => item.productId === product._id && item.size === sizeId)?.quantity || 0}
// 												</span>
// 												<button
// 													disabled={productLoaders[loaderKey]}
// 													onClick={() => handleIncreaseQuantity(product._id, sizeId)}
// 												>
// 													+
// 												</button>
// 											</div>
// 										) : (
// 											<button
// 												className={stylessecond.addButton}
// 												onClick={() => handleAddToCart(product._id, sizeId)}
// 												disabled={productLoaders[loaderKey]}
// 												style={{ cursor: productLoaders[loaderKey] ? "not-allowed" : "pointer" }}
// 											>
// 												Add to Cart
// 											</button>
// 										)}
// 									</div>
// 								</div>
// 							</SwiperSlide>
// 						);
// 					})}
// 				</Swiper>
// 			)}
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
import { motion, AnimatePresence } from 'framer-motion';

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
    const [quantityDirection, setQuantityDirection] = useState({}); // Track direction per product

    const navigate = useNavigate();
    const location = useLocation();

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
    };

    const quantityButtonVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.1 },
        tap: { scale: 0.9 }
    };

    const imageVariants = {
        rest: { scale: 1 },
        hover: { scale: 1.03 }
    };

    const quantityVariants = {
        enter: (direction) => ({
            y: direction > 0 ? 20 : -20,
            opacity: 0
        }),
        center: {
            y: 0,
            opacity: 1
        },
        exit: (direction) => ({
            y: direction > 0 ? -20 : 20,
            opacity: 0
        })
    };

    useEffect(() => {
        const defaultSize = {};
        const defaultDirection = {};

        products.forEach(product => {
            // Find the first size that is not out of stock
            const inStockSize = product.size.find(size => size.IsOutOfStock === "false");

            // Set the default size to the first in-stock size, or the first size if all are out of stock
            defaultSize[product._id] = inStockSize ? inStockSize._id : product.size[0]._id;
            defaultDirection[product._id] = 1; // Initialize direction
        });

        setSelectedSize(defaultSize);
        setQuantityDirection(defaultDirection);
    }, [products]);

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
            setLoader(productId, selectedSize[productId], false);
        }
    };

    const handleIncreaseQuantity = async (productId, productSizeId) => {
        try {
            setQuantityDirection(prev => ({ ...prev, [productId]: 1 }));
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
            setQuantityDirection(prev => ({ ...prev, [productId]: -1 }));
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

    const getCartQuantity = (productId, sizeId) => {
        const item = cartItems.find(item => item.productId === productId && item.size === sizeId);
        return item ? item.quantity : 0;
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
                        const currentQuantity = getCartQuantity(product._id, sizeId);
                        const direction = quantityDirection[product._id] || 1;

                        return (
                            <SwiperSlide key={product._id} className={stylessecond.productCard}>
                                <motion.div
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Link to={`/store/${product._id}`}>
                                        <motion.div
                                            className={stylessecond.productImage}
                                            variants={imageVariants}
                                            whileHover="hover"
                                            initial="rest"
                                        >
                                            <img
                                                src={product.thumbnail}
                                                alt={product.name}
                                            />
                                        </motion.div>
                                    </Link>
                                    <div>
                                        <div className={stylessecond.productDetails}>
                                            <motion.p
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                {product.name}
                                            </motion.p>
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
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
                                            </motion.div>
                                        </div>
                                        <div className={stylessecond.productPrice}>
                                            <motion.p
                                                whileHover={{ scale: 1.02 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                Rs. {product.size.find(s => s._id === sizeId)?.FinalPrice || product.size[0].FinalPrice}{" "}
                                                <span className={stylessecond.oldPrice}>
                                                    Rs. {product.size.find(s => s._id === sizeId)?.price || product.size[0].price}
                                                </span>
                                            </motion.p>
                                            {productLoaders[loaderKey] ? (
                                                <div className="">
                                                    <PrimaryLoader />
                                                </div>
                                            ) : cartItems.some(item => item.productId === product._id && item.size === sizeId && item.quantity > 0) ? (
                                                <motion.div 
                                                    className={stylessecond.cartControls}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <motion.button 
                                                        variants={quantityButtonVariants}
                                                        whileHover="hover"
                                                        whileTap="tap"
                                                        onClick={() => handleDecreaseQuantity(product._id, sizeId)}
                                                        disabled={productLoaders[loaderKey]}
                                                    >
                                                        -
                                                    </motion.button>
                                                    
                                                    <div style={{ 
                                                        position: 'relative', 
                                                        width: '30px', 
                                                        height: '30px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <AnimatePresence custom={direction} mode="popLayout">
                                                            <motion.span
                                                                key={currentQuantity}
                                                                custom={direction}
                                                                variants={quantityVariants}
                                                                initial="enter"
                                                                animate="center"
                                                                exit="exit"
                                                                transition={{
                                                                    type: "spring",
                                                                    stiffness: 500,
                                                                    damping: 20,
                                                                    duration: 0.2
                                                                }}
                                                                style={{
                                                                    position: 'absolute',
                                                                }}
                                                            >
                                                                {currentQuantity}
                                                            </motion.span>
                                                        </AnimatePresence>
                                                    </div>
                                                    
                                                    <motion.button 
                                                        variants={quantityButtonVariants}
                                                        whileHover="hover"
                                                        whileTap="tap"
                                                        onClick={() => handleIncreaseQuantity(product._id, sizeId)}
                                                        disabled={productLoaders[loaderKey]}
                                                    >
                                                        +
                                                    </motion.button>
                                                </motion.div>
                                            ) : (
                                                <motion.button
                                                    className={stylessecond.addButton}
                                                    onClick={() => handleAddToCart(product._id, sizeId)}
                                                    disabled={productLoaders[loaderKey]}
                                                    variants={buttonVariants}
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                    style={{ cursor: productLoaders[loaderKey] ? "not-allowed" : "pointer" }}
                                                >
                                                    Add to Cart
                                                </motion.button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            )}
        </div>
    );
};

export default SingleProduct;