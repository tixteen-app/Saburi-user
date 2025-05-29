
// import React, { useEffect, useState } from 'react';
// import styles from "./ProductDetails.module.css";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { IoArrowBack } from "react-icons/io5";
// import { makeApi } from "../../api/callApi";
// import { addToCart, removeFromCart, fetchCart } from '../../utils/productFunction.js';
// import { ToastContainer, toast } from 'react-toastify';
// import PrimaryLoader from '../../utils/loaders/PrimaryLoader.jsx';
// import LoginPopup from '../../components/LoginPopup/LoginPopup.jsx';
// import { motion, AnimatePresence } from 'framer-motion';

// const ProductDetailsPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [product, setProduct] = useState(null);
//   const [productSize, setProductSize] = useState([]);
//   const [selectProductSize, setSelectProductSize] = useState(null);
//   const [cartItems, setCartItems] = useState([]);
//   const [isInCart, setIsInCart] = useState(false);
//   const [cartQuantity, setCartQuantity] = useState(0);
//   const [isLogin, setIsLogin] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [completeCart, setCompleteCart] = useState([]);
//   const [productLoaders, setProductLoaders] = useState({});
//   const [fetchCartLoader, setFetchCartLoader] = useState(false);
//   const [showLoginPopup, setShowLoginPopup] = useState(false);
//   const [direction, setDirection] = useState(0); // 1 for increase, -1 for decrease

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       setIsLogin(true);
//     } else {
//       setIsLogin(false);
//     }
//   }, []);

//   const fetchProduct = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi(`/api/get-single-product/${id}`, 'GET');
//       setProduct(response.data.product);
//       setProductSize(response.data.sizes);
//       if (response.data.sizes.length > 0) {
//         const availableSize = response.data.sizes.find(size => size.IsOutOfStock === "false");
//         if (availableSize) {
//           setSelectProductSize(availableSize._id);
//         } else {
//           console.log("All sizes are out of stock");
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const selectedSize = productSize.find(size => size._id === selectProductSize);

//   const fetchCartItems = async () => {
//     try {
//       await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
//     } catch (error) {
//       console.error('Error fetching cart items:', error);
//     }
//   };

//   useEffect(() => {
//     fetchProduct();
//     fetchCartItems();
//   }, [id]);

//   useEffect(() => {
//     const checkCart = () => {
//       const cartItem = cartItems.find(item => {
//         return item.productId === id && item.size === selectProductSize;
//       });

//       if (cartItem) {
//         setIsInCart(true);
//         setCartQuantity(cartItem.quantity);
//       } else {
//         setIsInCart(false);
//         setCartQuantity(0);
//       }
//     };

//     checkCart();
//   }, [cartItems, id, selectProductSize]);

//   const handleBackClick = () => {
//     navigate(-1);
//   };

//   const handleAddToCart = async () => {
//     if (!isLogin) {
//       setShowPopup(true);
//       return;
//     }

//     if (!selectProductSize) {
//       toast('Please select a size', { type: 'error' });
//       return;
//     }

//     try {
//       await addToCart(id, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectProductSize);
//       navigate('/cart');
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//     } finally {
//       fetchCartItems();
//     }
//   };

//   const handleIncreaseQuantity = async () => {
//     setDirection(1);
//     if (!isLogin) {
//       setShowPopup(true);
//       return;
//     }

//     if (!selectProductSize) {
//       toast('Please select a size', { type: 'error' });
//       return;
//     }
//     if (selectedSize.quantity === cartQuantity) {
//       toast('Cannot add more than available quantity.', { type: 'error' });
//       return;
//     }
//     try {
//       await addToCart(id, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectProductSize);
//     } catch (error) {
//       console.error('Error increasing quantity:', error);
//     } finally {
//       fetchCartItems();
//     }
//   };

//   const handleDecreaseQuantity = async () => {
//     setDirection(-1);
//     if (cartQuantity > 0) {
//       try {
//         await removeFromCart(id, setProductLoaders, setCartItems, fetchCartItems, selectProductSize);
//       } catch (error) {
//         console.error('Error decreasing quantity:', error);
//       } finally {
//         fetchCartItems();
//       }
//     }
//   };

//   const handleBuyNow = () => {
//     if (!isLogin) {
//       setShowPopup(true);
//     } else {
//       handleAddToCart();
//       fetchCartItems();
//     }
//   };

//   const closePopup = () => {
//     console.log('Popup closed');
//     setShowPopup(false);
//   };

//   if (loading) {
//     return (
//       <div className="All_Product_loader">
//         <div style={{ height: '60vh', display: "flex", justifyContent: "center", alignItems: "center" }}>
//           <PrimaryLoader />
//         </div>
//       </div>
//     );
//   }

//   if (!product) {
//     return <h1>Product Not Found</h1>;
//   }

//   return (
//     <div style={{ minHeight: "60vh" }}>
//       {showPopup && <LoginPopup setLoginPopup={closePopup} />}
//       <ToastContainer position="top-center" />
//       <div className={styles.container}>
//         <div className={styles.backButton}>
//           <button onClick={handleBackClick}>
//             <IoArrowBack />
//           </button>
//         </div>
//         <div className={styles.image}>
//           <motion.img
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//             src={product.image[0]}
//             alt={product.title}
//           />
//         </div>
//         <div className={styles.content}>
//           <motion.div className={styles.leftContent}
//            initial={{ opacity: 0 , y : 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.5 }}
//           >
//             <div className={styles.productTitle}>
//               <h1>{product?.name} - {product?.weight}</h1>
//             </div>
//             <p>{product?.description}</p>
//             <div className={styles.sizesContainer}>
//               {productSize?.map((size) => (
//                 <div
//                   key={size._id}
//                   onClick={() => {
//                     setSelectProductSize(size._id);
//                   }}
//                   className={`${styles.sizeOption} ${size.IsOutOfStock === "true" ? styles.outOfStock : styles.inStock} ${selectProductSize === size._id ? styles.selectedSize : ''}`}
//                 >
//                   <p>
//                     {size.size} {size.sizetype}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           </motion.div>
//           <motion.div className={styles.rightContent}
//           initial={{ opacity: 0 , y : 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5, duration: 0.5 }}
//           >
//             <p className={styles.price}>
//               Rs.{selectedSize?.FinalPrice || product?.PriceAfterDiscount}
//               <span className={styles.originalPrice}>Rs.{selectedSize?.price}</span>
//             </p>

//             <>
//               <div className={styles.actions}>
//                 {selectedSize?.IsOutOfStock === "true" ? (
//                   <div style={{ color: "red", textAlign: "center", fontWeight: "bold", marginBottom: "10px" }}>
//                     Out of Stock
//                   </div>
//                 ) : isInCart ? (
//                   <>
//                     <div className={styles.cartControls} style={{ display: "flex", justifyContent: "center" }}>
//                       <motion.button 
//                         onClick={handleDecreaseQuantity}
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                       >
//                         -
//                       </motion.button>

//                       <div style={{ 
//                         position: 'relative', 
//                         width: '30px', 
//                         height: '30px',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center'
//                       }}>
//                         <AnimatePresence custom={direction} mode="popLayout">
//                           <motion.span
//                             key={cartQuantity}
//                             custom={direction}
//                             initial={{ 
//                               y: direction > 0 ? 20 : -20,
//                               opacity: 0 
//                             }}
//                             animate={{ 
//                               y: 0,
//                               opacity: 1 
//                             }}
//                             exit={{ 
//                               y: direction > 0 ? -20 : 20,
//                               opacity: 0 
//                             }}
//                             transition={{ 
//                               type: "spring", 
//                               stiffness: 500, 
//                               damping: 15,
//                               duration: 0.3 
//                             }}
//                             style={{
//                               position: 'absolute',
//                             }}
//                           >
//                             {cartQuantity}
//                           </motion.span>
//                         </AnimatePresence>
//                       </div>

//                       <motion.button 
//                         onClick={handleIncreaseQuantity}
//                         whileHover={{ scale: 1.1 }}
//                         whileTap={{ scale: 0.9 }}
//                       >
//                         +
//                       </motion.button>
//                     </div>
//                     <button className={styles.addToCartBtn}>
//                       <Link to="/cart">
//                         Go TO CART
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           width="18"
//                           height="18"
//                           fill="currentColor"
//                           style={{ paddingTop: "2px", marginLeft: "5px" }}
//                           className="bi bi-box-arrow-up-right"
//                           viewBox="0 0 16 16"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
//                           />
//                           <path
//                             fillRule="evenodd"
//                             d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
//                           />
//                         </svg>
//                       </Link>
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button className={styles.addToCartBtn} onClick={handleIncreaseQuantity}>
//                       ADD TO CART
//                     </button>
//                     <button className={styles.buyNowBtn} onClick={handleBuyNow}>
//                       BUY NOW
//                     </button>
//                   </>
//                 )}
//               </div>
//             </>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetailsPage;

import React, { useEffect, useState, useRef } from 'react';
import styles from "./ProductDetails.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { makeApi } from "../../api/callApi";
import { addToCart, removeFromCart, fetchCart } from '../../utils/productFunction.js';
import { ToastContainer, toast } from 'react-toastify';
import PrimaryLoader from '../../utils/loaders/PrimaryLoader.jsx';
import LoginPopup from '../../components/LoginPopup/LoginPopup.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import ReactImageMagnify from 'react-image-magnify';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [productSize, setProductSize] = useState([]);
  const [selectProductSize, setSelectProductSize] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isInCart, setIsInCart] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [completeCart, setCompleteCart] = useState([]);
  const [productLoaders, setProductLoaders] = useState({});
  const [fetchCartLoader, setFetchCartLoader] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [direction, setDirection] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const thumbnailContainerRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await makeApi(`/api/get-single-product/${id}`, 'GET');
      setProduct(response.data.product);
      setProductSize(response.data.sizes);
      if (response.data.sizes.length > 0) {
        const availableSize = response.data.sizes.find(size => size.IsOutOfStock === "false");
        if (availableSize) {
          setSelectProductSize(availableSize._id);
        } else {
          console.log("All sizes are out of stock");
        }
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  const selectedSize = productSize.find(size => size._id === selectProductSize);

  const fetchCartItems = async () => {
    try {
      await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCartItems();
  }, [id]);

  useEffect(() => {
    const checkCart = () => {
      const cartItem = cartItems.find(item => {
        return item.productId === id && item.size === selectProductSize;
      });

      if (cartItem) {
        setIsInCart(true);
        setCartQuantity(cartItem.quantity);
      } else {
        setIsInCart(false);
        setCartQuantity(0);
      }
    };

    checkCart();
  }, [cartItems, id, selectProductSize]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAddToCart = async () => {
    if (!isLogin) {
      setShowPopup(true);
      return;
    }

    if (!selectProductSize) {
      toast('Please select a size', { type: 'error' });
      return;
    }

    try {
      await addToCart(id, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectProductSize);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      fetchCartItems();
    }
  };

  const handleIncreaseQuantity = async () => {
    setDirection(1);
    if (!isLogin) {
      setShowPopup(true);
      return;
    }

    if (!selectProductSize) {
      toast('Please select a size', { type: 'error' });
      return;
    }
    if (selectedSize.quantity === cartQuantity) {
      toast('Cannot add more than available quantity.', { type: 'error' });
      return;
    }
    try {
      await addToCart(id, setIsLogin, setShowPopup, fetchCartItems, setCartItems, setProductLoaders, selectProductSize);
    } catch (error) {
      console.error('Error increasing quantity:', error);
    } finally {
      fetchCartItems();
    }
  };

  const handleDecreaseQuantity = async () => {
    setDirection(-1);
    if (cartQuantity > 0) {
      try {
        await removeFromCart(id, setProductLoaders, setCartItems, fetchCartItems, selectProductSize);
      } catch (error) {
        console.error('Error decreasing quantity:', error);
      } finally {
        fetchCartItems();
      }
    }
  };

  const handleBuyNow = () => {
    if (!isLogin) {
      setShowPopup(true);
    } else {
      handleAddToCart();
      fetchCartItems();
    }
  };

  const closePopup = () => {
    console.log('Popup closed');
    setShowPopup(false);
  };

  const handleImageClick = (index) => {
    setSelectedIndex(index);
  };

  const scrollThumbnails = (direction) => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="All_Product_loader">
        <div style={{ height: '60vh', display: "flex", justifyContent: "center", alignItems: "center" }}>
          <PrimaryLoader />
        </div>
      </div>
    );
  }

  if (!product) {
    return <h1>Product Not Found</h1>;
  }

  return (
    <div style={{ minHeight: "60vh" }}>
      {showPopup && <LoginPopup setLoginPopup={closePopup} />}
      <ToastContainer position="top-center" />
      <div className={styles.container}>
        <div className={styles.backButton}>
          <button onClick={handleBackClick}>
            <IoArrowBack />
          </button>
        </div>

        {/* Updated Image Section */}
        <div className={styles.imageSection}>
          <div className={styles.imageZoomContainer}>
            <div className={styles.mainImageContainer}
              onMouseEnter={() => setIsHoveringImage(true)}
              onMouseLeave={() => setIsHoveringImage(false)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9 }}
                className={styles.desktopImage}>
                <ReactImageMagnify
                  {...{
                    smallImage: {
                      alt: 'Selected Product Image',
                      width: 500,
                      height: 450,
                      src: product.image[selectedIndex],
                      className: styles.smallZoom
                    },
                    largeImage: {
                      src: product.image[selectedIndex],
                      width: 1500,
                      height: 1500,
                      className: styles.largeZoom
                    },
                    enlargedImageContainerStyle: {
                      position: 'fixed',
                      left: '45%',
                      top: '10%',
                      zIndex: 1000000,
                      backgroundColor: '#fff',
                      boxShadow: '0 0 20px rgba(0,0,0,0.6)',
                      border: '1px solid #eee'
                    },
                    enlargedImageContainerDimensions: {
                      width: "150%",
                      height: "140%"
                    },
                    shouldHideHintAfterFirstActivation: false
                  }}
                />
              </motion.div>
              <img
                src={product.image[selectedIndex]}
                alt="Selected"
                className={styles.mobileImage}
              />
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className={styles.thumbnailGallery}>
            {product.image.length > 4 && (
              <button
                className={styles.thumbnailScrollButton}
                onClick={() => scrollThumbnails('left')}
                aria-label="Scroll thumbnails left"
              >
                <FaChevronLeft />
              </button>
            )}

            <div className={styles.thumbnailsContainer} ref={thumbnailContainerRef}>
              {product.image.map((imgUrl, index) => (
                <div
                  key={index}
                  className={`${styles.thumbnailItem} ${index === selectedIndex ? styles.activeThumbnail : ''}`}
                  onClick={() => handleImageClick(index)}
                  onMouseEnter={() => setIsHoveringImage(true)}
                >
                  <motion.img
                    src={imgUrl}
                    alt={`Thumbnail ${index + 1}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              ))}
            </div>

            {product.image.length > 4 && (
              <button
                className={styles.thumbnailScrollButton}
                onClick={() => scrollThumbnails('right')}
                aria-label="Scroll thumbnails right"
              >
                <FaChevronRight />
              </button>
            )}
          </div>
        </div>


        <div className={styles.content}>
          <motion.div className={styles.leftContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className={styles.productTitle}>
              <h1>{product?.name} - {product?.weight}</h1>
            </div>
            <p>{product?.description}</p>
            <div className={styles.sizesContainer}>
              {productSize?.map((size) => (
                <div
                  key={size._id}
                  onClick={() => {
                    setSelectProductSize(size._id);
                  }}
                  className={`${styles.sizeOption} ${size.IsOutOfStock === "true" ? styles.outOfStock : styles.inStock} ${selectProductSize === size._id ? styles.selectedSize : ''}`}
                >
                  <p>
                    {size.size} {size.sizetype}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div className={styles.rightContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <p className={styles.price}>
              Rs.{selectedSize?.FinalPrice || product?.PriceAfterDiscount}
              <span className={styles.originalPrice}>Rs.{selectedSize?.price}</span>
            </p>

            <>
              <div className={styles.actions}>
                {selectedSize?.IsOutOfStock === "true" ? (
                  <div style={{ color: "red", textAlign: "center", fontWeight: "bold", marginBottom: "10px" }}>
                    Out of Stock
                  </div>
                ) : isInCart ? (
                  <>
                    <div className={styles.cartControls} style={{ display: "flex", justifyContent: "center" }}>
                      <motion.button
                        onClick={handleDecreaseQuantity}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
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
                            key={cartQuantity}
                            custom={direction}
                            initial={{
                              y: direction > 0 ? 20 : -20,
                              opacity: 0
                            }}
                            animate={{
                              y: 0,
                              opacity: 1
                            }}
                            exit={{
                              y: direction > 0 ? -20 : 20,
                              opacity: 0
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 15,
                              duration: 0.3
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
                        onClick={handleIncreaseQuantity}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        +
                      </motion.button>
                    </div>
                    <button className={styles.addToCartBtn}>
                      <Link to="/cart">
                        Go TO CART
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          style={{ paddingTop: "2px", marginLeft: "5px" }}
                          className="bi bi-box-arrow-up-right"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                          />
                          <path
                            fillRule="evenodd"
                            d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                          />
                        </svg>
                      </Link>
                    </button>
                  </>
                ) : (
                  <>
                    <button className={styles.addToCartBtn} onClick={handleIncreaseQuantity}>
                      ADD TO CART
                    </button>
                    <button className={styles.buyNowBtn} onClick={handleBuyNow}>
                      BUY NOW
                    </button>
                  </>
                )}
              </div>
            </>
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetailsPage;