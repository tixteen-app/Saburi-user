
import React, { useEffect, useState } from "react";
import styles from "./ProductCard.module.css";
import { addToCart, removeFromCart, fetchCart } from '../../../utils/productFunction.js';
import { ToastContainer, toast } from 'react-toastify';
import LoginPopup from '../../../components/LoginPopup/LoginPopup.jsx';
import Cookies from 'js-cookie';
import PrimaryLoader from "../../../utils/loaders/PrimaryLoader.jsx";
import { LazyLoadImage } from 'react-lazy-load-image-component';


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

    // Automatically select the first size
    // useEffect(() => {
    //     if (product?.size?.length > 0) {
    //         setSize(product.size);
    //         const defaultSize = product.size[0];
    //         setSelectedSize(defaultSize._id);
    //         setFilterData(defaultSize);
    //     }
    //     const token = localStorage.getItem('token');
    //     const cookiesData = Cookies.get('register');
    //     setIsLogin(token);
    // }, [product]);
    useEffect(() => {
        if (product?.size?.length > 0) {
            setSize(product.size);
    
            // Find a size that is in stock
            const inStockSize = product.size.find(size => size.IsOutOfStock === "false");
    
            // If no size is in stock, set the first size as default
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
            await fetchCart(setCartItems, null, setFetchCartLoader); // Updated to pass the setFetchCartLoader function
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

    // const handleSelectedSize = (e) => {
    //     const selected = size.find(item => item._id === e.target.value);
    //     setSelectedSize(selected._id);
    //     setFilterData(selected);
    // };
    const handleSelectedSize = (e) => {
        const selected = size.find(item => item._id === e.target.value);
        if (selected.IsOutOfStock === "true") {
            toast('This size is out of stock', { type: 'error' });
            return;
        }
        setSelectedSize(selected._id);
        setFilterData(selected);
    
        // Show a toast message if the selected size is out of stock
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
            await addToCart(
                product._id,
                setIsLogin,
                setShowPopup,
                fetchCart,  
                setCartItems,
                setProductLoaders,  
                selectedSize
            );
            fetchCartItems();  // Refresh cart items
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const handleIncreaseQuantity = async () => {
        // if (selectedSize.quantity === cartQuantity) {
        //     toast('Cannot add more than available quantity.', { type: 'error' });
        //     return;
        //   }
        try {
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
            console.error('Error increasing quantity:', error);
        }
    };

    const handleDecreaseQuantity = async () => {
        if (cartQuantity > 0) {
            try {
                await removeFromCart(
                    product._id,
                    setProductLoaders,
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
        <div className={styles.card}>
            {showPopup && <LoginPopup setLoginPopup={closePopup} />}
            <ToastContainer />

            {fetchCartLoader ? (
                <div className={styles.fetchCartLoad_all_products}  >
                    <PrimaryLoader />
                </div>
            ) : (
                <>
                    <LazyLoadImage
                    effect="blur" loading="lazy"
                        src={product?.thumbnail}
                        alt={product?.name}
                        className={styles.image}
                        onClick={onClick}
                    />
                    <div className={styles.info}>
                        <div className={`${styles.productName} ${styles.productSizeDropdown}`}>
                            <div>
                                Rs {filterData?.FinalPrice}{" "}
                                <span className={styles.originalPrice_at_allprodocut}>Rs {filterData?.price}</span>
                            </div>
                            <div>
                                <select onChange={handleSelectedSize} value={selectedSize} className={styles.productSize_dropdonw_all_products} >
                                    {size?.map((item, index) => (
                                        <option key={index} value={item._id}>
                                            {item.size} {item.sizetype} 
                                        </option>
                                    ))}
                                    
                                </select>
                            </div>
                        </div>

                        <div className={styles.buttonPrice} style={{ padding: "0px 10px" }} >
                            <div style={{ marginLeft: "2px" }}>
                                <h3 onClick={onClick}>{product?.name}</h3>
                            </div>
                            {isInCart ? (
                                <div className={styles.cartControls_for_all_products}  >
                                    <button disabled={productLoaders[selectedSize]} onClick={handleDecreaseQuantity}>
                                        -
                                    </button>
                                    <span>{cartQuantity}</span>
                                    <button disabled={productLoaders[selectedSize]} onClick={handleIncreaseQuantity}>
                                        +
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className={styles.addButton}
                                    onClick={handleAddToCart}
                                    disabled={productLoaders[selectedSize]}
                                >
                                    {productLoaders[selectedSize] ? 'Adding...' : 'Add to Cart'}
                                </button>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductCard;
