
// import React, { useEffect, useState } from "react";
// import styles from "./ProductCard.module.css";
// import { addToCart, removeFromCart, fetchCart } from '../../../utils/productFunction.js';
// import { ToastContainer, toast } from 'react-toastify';
// import LoginPopup from '../../../components/LoginPopup/LoginPopup.jsx';
// import Cookies from 'js-cookie';
// import PrimaryLoader from "../../../utils/loaders/PrimaryLoader.jsx";
// import { LazyLoadImage } from 'react-lazy-load-image-component';


// const ProductCard = ({ product, onClick }) => {
    
//     const [size, setSize] = useState([]); 
//     const [selectedSize, setSelectedSize] = useState(null);
//     const [filterData, setFilterData] = useState(null);
//     const [isInCart, setIsInCart] = useState(false);
//     const [cartQuantity, setCartQuantity] = useState(0);
//     const [isLogin, setIsLogin] = useState(false);
//     const [showPopup, setShowPopup] = useState(false);
//     const [productLoaders, setProductLoaders] = useState({});   
//     const [cartItems, setCartItems] = useState([]);
//     const [fetchCartLoader, setFetchCartLoader] = useState(false);

//     useEffect(() => {
//         if (product?.size?.length > 0) {
//             setSize(product.size);
    
//             const inStockSize = product.size.find(size => size.IsOutOfStock === "false");
//             const defaultSize = inStockSize || product.size[0];
            
//             setSelectedSize(defaultSize._id);
//             setFilterData(defaultSize);
//         }
    
//         const token = localStorage.getItem('token');
//         const cookiesData = Cookies.get('register');
//         setIsLogin(token);
//     }, [product]);

//     useEffect(() => {
//         fetchCartItems();
//     }, []);

//     const fetchCartItems = async () => {
//         try {
//             setFetchCartLoader(true);
//             await fetchCart(setCartItems, null, setFetchCartLoader); // Updated to pass the setFetchCartLoader function
//         } catch (error) {
//             console.error('Error fetching cart items:', error);
//         } finally {
//             setFetchCartLoader(false);
//         }
//     };

//     useEffect(() => {
//         const cartItem = cartItems.find(item => {
//             return item.productId === product._id && item.size === selectedSize;
//         });
//         if (cartItem) {
//             setIsInCart(true);
//             setCartQuantity(cartItem.quantity);
//         } else {
//             setIsInCart(false);
//             setCartQuantity(0);
//         }
//     }, [cartItems, product, selectedSize]);

//     // const handleSelectedSize = (e) => {
//     //     const selected = size.find(item => item._id === e.target.value);
//     //     setSelectedSize(selected._id);
//     //     setFilterData(selected);
//     // };
//     const handleSelectedSize = (e) => {
//         const selected = size.find(item => item._id === e.target.value);
//         if (selected.IsOutOfStock === "true") {
//             toast('This size is out of stock', { type: 'error' });
//             return;
//         }
//         setSelectedSize(selected._id);
//         setFilterData(selected);
    
//         // Show a toast message if the selected size is out of stock
//     };

//     const handleAddToCart = async () => {
//         if (!isLogin) {
//             setShowPopup(true);
//             return;
//         }
//         if (!selectedSize) {
//             toast('Please select a size', { type: 'error' });
//             return;
//         }
//         try {
//             await addToCart(
//                 product._id,
//                 setIsLogin,
//                 setShowPopup,
//                 fetchCart,  
//                 setCartItems,
//                 setProductLoaders,  
//                 selectedSize
//             );
//             fetchCartItems();  // Refresh cart items
//         } catch (error) {
//             console.error('Error adding to cart:', error);
//         }
//     };

//     const handleIncreaseQuantity = async () => {
//         // if (selectedSize.quantity === cartQuantity) {
//         //     toast('Cannot add more than available quantity.', { type: 'error' });
//         //     return;
//         //   }
//         try {
//             await addToCart(
//                 product._id,
//                 setIsLogin,
//                 setShowPopup,
//                 fetchCart,
//                 setCartItems,
//                 setProductLoaders,
//                 selectedSize
//             );
//             fetchCartItems();
//         } catch (error) {
//             console.error('Error increasing quantity:', error);
//         }
//     };

//     const handleDecreaseQuantity = async () => {
//         if (cartQuantity > 0) {
//             try {
//                 await removeFromCart(
//                     product._id,
//                     setProductLoaders,
//                     setCartItems,
//                     fetchCart,
//                     selectedSize
//                 );
//                 fetchCartItems();
//             } catch (error) {
//                 console.error('Error decreasing quantity:', error);
//             }
//         }
//     };

//     const closePopup = () => {
//         setShowPopup(false);
//     };

//     // return (
//     //     <div className={styles.card}>
//     //         {showPopup && <LoginPopup setLoginPopup={closePopup} />}
//     //         <ToastContainer />

//     //         {fetchCartLoader ? (
//     //             <div className={styles.fetchCartLoad_all_products}  >
//     //                 <PrimaryLoader />
//     //             </div>
//     //         ) : (
//     //             <>
//     //                 <LazyLoadImage
//     //                 effect="blur" loading="lazy"
//     //                     src={product?.thumbnail}
//     //                     alt={product?.name}
//     //                     className={styles.image}
//     //                     onClick={onClick}
//     //                 />
//     //                 <div className={styles.info}>
//     //                     <div className={`${styles.productName} ${styles.productSizeDropdown}`}>
//     //                         <div>
//     //                             Rs {filterData?.FinalPrice}{" "}
//     //                             <span className={styles.originalPrice_at_allprodocut}>Rs {filterData?.price}</span>
//     //                         </div>
//     //                         <div>
//     //                             <select onChange={handleSelectedSize} value={selectedSize} className={styles.productSize_dropdonw_all_products} >
//     //                                 {size?.map((item, index) => (
//     //                                     <option key={index} value={item._id}>
//     //                                         {item.size} {item.sizetype} 
//     //                                     </option>
//     //                                 ))}
                                    
//     //                             </select>
//     //                         </div>
//     //                     </div>

//     //                     <div className={styles.buttonPrice} style={{ padding: "0px 10px" }} >
//     //                         <div style={{ marginLeft: "2px" }}>
//     //                             <h3 onClick={onClick}>{product?.name}</h3>
//     //                         </div>
//     //                         {isInCart ? (
//     //                             <div className={styles.cartControls_for_all_products}  >
//     //                                 <button disabled={productLoaders[selectedSize]} onClick={handleDecreaseQuantity}>
//     //                                     -
//     //                                 </button>
//     //                                 <span>{cartQuantity}</span>
//     //                                 <button disabled={productLoaders[selectedSize]} onClick={handleIncreaseQuantity}>
//     //                                     +
//     //                                 </button>
//     //                             </div>
//     //                         ) : (
//     //                             <button
//     //                                 className={styles.addButton}
//     //                                 onClick={handleAddToCart}
//     //                                 disabled={productLoaders[selectedSize]}
//     //                             >
//     //                                 {productLoaders[selectedSize] ? 'Adding...' : 'Add to Cart'}
//     //                             </button>
//     //                         )}
//     //                     </div>
//     //                 </div>
//     //             </>
//     //         )}
//     //     </div>
//     // );
//       return (
//         <div className={styles.card}>
//             {showPopup && <LoginPopup setLoginPopup={closePopup} />}
//             <ToastContainer />

//             <LazyLoadImage
//                 effect="blur" loading="lazy"
//                 src={product?.thumbnail}
//                 alt={product?.name}
//                 className={styles.image}
//                 onClick={onClick}
//             />
//             <div className={styles.info}>
//                 <div className={`${styles.productName} ${styles.productSizeDropdown}`}>
//                     <div>
//                         Rs {filterData?.FinalPrice}{" "}
//                         <span className={styles.originalPrice_at_allprodocut}>Rs {filterData?.price}</span>
//                     </div>
//                     <div>
//                         <select onChange={handleSelectedSize} value={selectedSize} className={styles.productSize_dropdonw_all_products}>
//                             {size?.map((item, index) => (
//                                 <option key={index} value={item._id}>
//                                     {item.size} {item.sizetype}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                 </div>

//                 <div className={styles.buttonPrice} style={{ padding: "0px 10px" }}>
//                     <div style={{ marginLeft: "2px" }}>
//                         <h3 onClick={onClick}>{product?.name}</h3>
//                     </div>
//                     {productLoaders[product._id] ? (
//                         <div className={styles.quantityLoaderContainer}>
//                             <PrimaryLoader />
//                         </div>
//                     ) : isInCart ? (
//                         <div className={styles.cartControls_for_all_products}>
//                             <button disabled={productLoaders[product._id]} onClick={handleDecreaseQuantity}>
//                                 -
//                             </button>
//                             <span>{cartQuantity}</span>
//                             <button disabled={productLoaders[product._id]} onClick={handleIncreaseQuantity}>
//                                 +
//                             </button>
//                         </div>
//                     ) : (
//                         <button
//                             className={styles.addButton}
//                             onClick={handleAddToCart}
//                             disabled={productLoaders[product._id]}
//                         >
//                             {productLoaders[product._id] ? 'Adding...' : 'Add to Cart'}
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductCard;

// import React, { useEffect, useState } from "react";
// import styles from "./ProductCard.module.css";
// import { addToCart, removeFromCart, fetchCart } from '../../../utils/productFunction.js';
// import { ToastContainer, toast } from 'react-toastify';
// import LoginPopup from '../../../components/LoginPopup/LoginPopup.jsx';
// import Cookies from 'js-cookie';
// import PrimaryLoader from "../../../utils/loaders/PrimaryLoader.jsx";
// import { LazyLoadImage } from 'react-lazy-load-image-component';
// import { motion } from 'framer-motion';

// const ProductCard = ({ product, onClick }) => {
//     const [size, setSize] = useState([]); 
//     const [selectedSize, setSelectedSize] = useState(null);
//     const [filterData, setFilterData] = useState(null);
//     const [isInCart, setIsInCart] = useState(false);
//     const [cartQuantity, setCartQuantity] = useState(0);
//     const [isLogin, setIsLogin] = useState(false);
//     const [showPopup, setShowPopup] = useState(false);
//     const [productLoaders, setProductLoaders] = useState({});   
//     const [cartItems, setCartItems] = useState([]);
//     const [fetchCartLoader, setFetchCartLoader] = useState(false);

//     // Animation variants
//     const cardVariants = {
//         hidden: { opacity: 0, y: 20 },
//         visible: {
//             opacity: 1,
//             y: 0,
//             transition: {
//                 duration: 0.5,
//                 ease: "easeOut"
//             }
//         }
//     };

//     const buttonVariants = {
//         rest: { scale: 1 },
//         hover: { scale: 1.05 },
//         tap: { scale: 0.95 }
//     };

//     const quantityButtonVariants = {
//         rest: { scale: 1 },
//         hover: { scale: 1.1 },
//         tap: { scale: 0.9 }
//     };

//     const imageVariants = {
//         rest: { scale: 1 },
//         hover: { scale: 1.03 }
//     };

//     useEffect(() => {
//         if (product?.size?.length > 0) {
//             setSize(product.size);
    
//             const inStockSize = product.size.find(size => size.IsOutOfStock === "false");
//             const defaultSize = inStockSize || product.size[0];
            
//             setSelectedSize(defaultSize._id);
//             setFilterData(defaultSize);
//         }
    
//         const token = localStorage.getItem('token');
//         const cookiesData = Cookies.get('register');
//         setIsLogin(token);
//     }, [product]);

//     useEffect(() => {
//         fetchCartItems();
//     }, []);

//     const fetchCartItems = async () => {
//         try {
//             setFetchCartLoader(true);
//             await fetchCart(setCartItems, null, setFetchCartLoader);
//         } catch (error) {
//             console.error('Error fetching cart items:', error);
//         } finally {
//             setFetchCartLoader(false);
//         }
//     };

//     useEffect(() => {
//         const cartItem = cartItems.find(item => {
//             return item.productId === product._id && item.size === selectedSize;
//         });
//         if (cartItem) {
//             setIsInCart(true);
//             setCartQuantity(cartItem.quantity);
//         } else {
//             setIsInCart(false);
//             setCartQuantity(0);
//         }
//     }, [cartItems, product, selectedSize]);

//     const handleSelectedSize = (e) => {
//         const selected = size.find(item => item._id === e.target.value);
//         if (selected.IsOutOfStock === "true") {
//             toast('This size is out of stock', { type: 'error' });
//             return;
//         }
//         setSelectedSize(selected._id);
//         setFilterData(selected);
//     };

//     const handleAddToCart = async () => {
//         if (!isLogin) {
//             setShowPopup(true);
//             return;
//         }
//         if (!selectedSize) {
//             toast('Please select a size', { type: 'error' });
//             return;
//         }
//         try {
//             await addToCart(
//                 product._id,
//                 setIsLogin,
//                 setShowPopup,
//                 fetchCart,  
//                 setCartItems,
//                 setProductLoaders,  
//                 selectedSize
//             );
//             fetchCartItems();
//         } catch (error) {
//             console.error('Error adding to cart:', error);
//         }
//     };

//     const handleIncreaseQuantity = async () => {
//         try {
//             await addToCart(
//                 product._id,
//                 setIsLogin,
//                 setShowPopup,
//                 fetchCart,
//                 setCartItems,
//                 setProductLoaders,
//                 selectedSize
//             );
//             fetchCartItems();
//         } catch (error) {
//             console.error('Error increasing quantity:', error);
//         }
//     };

//     const handleDecreaseQuantity = async () => {
//         if (cartQuantity > 0) {
//             try {
//                 await removeFromCart(
//                     product._id,
//                     setProductLoaders,
//                     setCartItems,
//                     fetchCart,
//                     selectedSize
//                 );
//                 fetchCartItems();
//             } catch (error) {
//                 console.error('Error decreasing quantity:', error);
//             }
//         }
//     };

//     const closePopup = () => {
//         setShowPopup(false);
//     };

//     return (
//         <motion.div 
//             className={styles.card}
//             variants={cardVariants}
//             initial="hidden"
//             animate="visible"
//             transition={{ type: "spring", stiffness: 400, damping: 10 }}
//         >
//             {showPopup && <LoginPopup setLoginPopup={closePopup} />}
//             <ToastContainer />

//             <motion.div
//                 variants={imageVariants}
//                 whileHover="hover"
//                 initial="rest"
//             >
//                 <LazyLoadImage
//                     effect="blur" 
//                     loading="lazy"
//                     src={product?.thumbnail}
//                     alt={product?.name}
//                     className={styles.image}
//                     onClick={onClick}
//                 />
//             </motion.div>

//             <div className={styles.info}>
//                 <div className={`${styles.productName} ${styles.productSizeDropdown}`}>
//                     <motion.div
//                         whileHover={{ scale: 1.02 }}
//                         transition={{ type: "spring", stiffness: 300 }}
//                     >
//                         Rs {filterData?.FinalPrice}{" "}
//                         <span className={styles.originalPrice_at_allprodocut}>Rs {filterData?.price}</span>
//                     </motion.div>
//                     <motion.div
//                         whileHover={{ scale: 1.02 }}
//                         transition={{ type: "spring", stiffness: 300 }}
//                     >
//                         <select 
//                             onChange={handleSelectedSize} 
//                             value={selectedSize} 
//                             className={styles.productSize_dropdonw_all_products}
//                         >
//                             {size?.map((item, index) => (
//                                 <option key={index} value={item._id}>
//                                     {item.size} {item.sizetype}
//                                 </option>
//                             ))}
//                         </select>
//                     </motion.div>
//                 </div>

//                 <div className={styles.buttonPrice} style={{ padding: "0px 10px" }}>
//                     <motion.div 
//                         style={{ marginLeft: "2px" }}
//                         whileHover={{ scale: 1.02 }}
//                         transition={{ type: "spring", stiffness: 300 }}
//                     >
//                         <h3 onClick={onClick}>{product?.name}</h3>
//                     </motion.div>
                    
//                     {productLoaders[product._id] ? (
//                         <motion.div 
//                             className={styles.quantityLoaderContainer}
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ duration: 0.3 }}
//                         >
//                             <PrimaryLoader />
//                         </motion.div>
//                     ) : isInCart ? (
//                         <motion.div 
//                             className={styles.cartControls_for_all_products}
//                             initial={{ opacity: 0, y: 10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ duration: 0.3 }}
//                         >
//                             <motion.button 
//                                 variants={quantityButtonVariants}
//                                 whileHover="hover"
//                                 whileTap="tap"
//                                 disabled={productLoaders[product._id]} 
//                                 onClick={handleDecreaseQuantity}
//                             >
//                                 -
//                             </motion.button>
//                             <motion.span
//                                 initial={{ scale: 0 }}
//                                 animate={{ scale: 1 }}
//                                 transition={{ type: "spring", stiffness: 500 }}
//                             >
//                                 {cartQuantity}
//                             </motion.span>
//                             <motion.button 
//                                 variants={quantityButtonVariants}
//                                 whileHover="hover"
//                                 whileTap="tap"
//                                 disabled={productLoaders[product._id]} 
//                                 onClick={handleIncreaseQuantity}
//                             >
//                                 +
//                             </motion.button>
//                         </motion.div>
//                     ) : (
//                         <motion.button
//                             className={styles.addButton}
//                             onClick={handleAddToCart}
//                             disabled={productLoaders[product._id]}
//                             variants={buttonVariants}
//                             whileHover="hover"
//                             whileTap="tap"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ duration: 0.3 }}
//                         >
//                             {productLoaders[product._id] ? 'Adding...' : 'Add to Cart'}
//                         </motion.button>
//                     )}
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// export default ProductCard;

import React, { useEffect, useState } from "react";
import styles from "./ProductCard.module.css";
import { addToCart, removeFromCart, fetchCart } from '../../../utils/productFunction.js';
import { ToastContainer, toast } from 'react-toastify';
import LoginPopup from '../../../components/LoginPopup/LoginPopup.jsx';
import Cookies from 'js-cookie';
import PrimaryLoader from "../../../utils/loaders/PrimaryLoader.jsx";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion, AnimatePresence } from 'framer-motion';

const ProductCard = ({ product, onClick }) => {
    const [size, setSize] = useState([]); 
    const [selectedSize, setSelectedSize] = useState(null);
    const [filterData, setFilterData] = useState(null);
    const [isInCart, setIsInCart] = useState(false);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [isLogin, setIsLogin] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [productLoaders, setProductLoaders] = useState({});   
    const [cartItems, setCartItems] = useState([]);
    const [fetchCartLoader, setFetchCartLoader] = useState(false);
    const [quantityDirection, setQuantityDirection] = useState(1); // 1 for increase, -1 for decrease

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
        if (product?.size?.length > 0) {
            setSize(product.size);
    
            const inStockSize = product.size.find(size => size.IsOutOfStock === "false");
            const defaultSize = inStockSize || product.size[0];
            
            setSelectedSize(defaultSize._id);
            setFilterData(defaultSize);
        }
    
        const token = localStorage.getItem('token');
        const cookiesData = Cookies.get('register');
        setIsLogin(token);
    }, [product]);

    useEffect(() => {
        fetchCartItems();
    }, []);

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

    useEffect(() => {
        const cartItem = cartItems.find(item => {
            return item.productId === product._id && item.size === selectedSize;
        });
        if (cartItem) {
            setIsInCart(true);
            setCartQuantity(cartItem.quantity);
        } else {
            setIsInCart(false);
            setCartQuantity(0);
        }
    }, [cartItems, product, selectedSize]);

    const handleSelectedSize = (e) => {
        const selected = size.find(item => item._id === e.target.value);
        if (selected.IsOutOfStock === "true") {
            toast('This size is out of stock', { type: 'error' });
            return;
        }
        setSelectedSize(selected._id);
        setFilterData(selected);
    };

    const handleAddToCart = async () => {
        if (!isLogin) {
            setShowPopup(true);
            return;
        }
        if (!selectedSize) {
            toast('Please select a size', { type: 'error' });
            return;
        }
        try {
            setProductLoaders(prev => ({ ...prev, [product._id]: true }));
            await addToCart(
                product._id,
                setIsLogin,
                setShowPopup,
                fetchCart,  
                setCartItems,
                setProductLoaders,  
                selectedSize
            );
            fetchCartItems();
        } catch (error) {
            console.error('Error adding to cart:', error);
        } finally {
            setProductLoaders(prev => ({ ...prev, [product._id]: false }));
        }
    };

    const handleIncreaseQuantity = async () => {
        try {
            setQuantityDirection(1);
            await addToCart(
                product._id,
                setIsLogin,
                setShowPopup,
                fetchCart,
                setCartItems,
                setProductLoaders , // Remove loader setting here
                selectedSize
            );
            fetchCartItems();
        } catch (error) {
            console.error('Error increasing quantity:', error);
        }
    };

    const handleDecreaseQuantity = async () => {
        if (cartQuantity > 0) {
            try {
                setQuantityDirection(-1);
                await removeFromCart(
                    product._id,
                    setProductLoaders , // Remove loader setting here
                    setCartItems,
                    fetchCart,
                    selectedSize
                );
                fetchCartItems();
            } catch (error) {
                console.error('Error decreasing quantity:', error);
            }
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <motion.div 
            className={styles.card}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            {showPopup && <LoginPopup setLoginPopup={closePopup} />}
            <ToastContainer />

            <motion.div
                variants={imageVariants}
                whileHover="hover"
                initial="rest"
            >
                <LazyLoadImage
                    effect="blur" 
                    loading="lazy"
                    src={product?.thumbnail}
                    alt={product?.name}
                    className={styles.image}
                    onClick={onClick}
                />
            </motion.div>

            <div className={styles.info}>
                <div className={`${styles.productName} ${styles.productSizeDropdown}`}>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Rs {filterData?.FinalPrice}{" "}
                        <span className={styles.originalPrice_at_allprodocut}>Rs {filterData?.price}</span>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <select 
                            onChange={handleSelectedSize} 
                            value={selectedSize} 
                            className={styles.productSize_dropdonw_all_products}
                        >
                            {size?.map((item, index) => (
                                <option key={index} value={item._id}>
                                    {item.size} {item.sizetype}
                                </option>
                            ))}
                        </select>
                    </motion.div>
                </div>

                <div className={styles.buttonPrice} style={{ padding: "0px 10px" }}>
                    <motion.div 
                        style={{ marginLeft: "2px" }}
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <h3 onClick={onClick}>{product?.name}</h3>
                    </motion.div>
                    
                    {isInCart ? (
                        <motion.div 
                            className={styles.cartControls_for_all_products}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.button 
                                variants={quantityButtonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={handleDecreaseQuantity}
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
                                <AnimatePresence custom={quantityDirection} mode="popLayout">
                                    <motion.span
                                        key={cartQuantity}
                                        custom={quantityDirection}
                                        variants={quantityVariants}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{
                                            type: "spring",
                                            stiffness: 500,
                                            damping: 20,
                                            duration: 1
                                        }}
                                        style={{
                                            position: 'absolute',
                                        }}
                                    >
                                        {cartQuantity}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                            
                            <motion.button 
                                variants={quantityButtonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                onClick={handleIncreaseQuantity}
                            >
                                +
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.button
                            className={styles.addButton}
                            onClick={handleAddToCart}
                            disabled={productLoaders[product._id]}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            {productLoaders[product._id] ? 'Adding...' : 'Add to Cart'}
                        </motion.button>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;