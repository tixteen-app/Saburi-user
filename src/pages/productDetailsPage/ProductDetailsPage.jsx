
import React, { useEffect, useState } from 'react';
import styles from "./ProductDetails.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { makeApi } from "../../api/callApi";
import { addToCart, removeFromCart, fetchCart } from '../../utils/productFunction.js';
import { ToastContainer, toast } from 'react-toastify';
import PrimaryLoader from '../../utils/loaders/PrimaryLoader.jsx';
import LoginPopup from '../../components/LoginPopup/LoginPopup.jsx';

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
        // Find the first size that is not out of stock
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
  //   // Find the selected size object
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
    <div style={{ minHeight: "60vh" }} >
      {showPopup && <LoginPopup setLoginPopup={closePopup} />}
      <ToastContainer position="top-center" />
      <div className={styles.container}  >
        <div className={styles.backButton}>
          <button onClick={handleBackClick}>
            <IoArrowBack />
          </button>
        </div>
        <div className={styles.image}>
          <img
            src={product.image[0]}
            alt={product.title}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.leftContent}>
            <div className={styles.productTitle}>
              <h1>{product?.name} - {product?.weight}</h1>
            </div>
            <p>{product?.description}</p>
            <div className={styles.sizesContainer}>
              {productSize?.map((size) => (

                <div
                  key={size._id}
                  onClick={() => {
                    // if (size.IsOutOfStock !== "true") {
                    setSelectProductSize(size._id);
                    // }
                  }}
                  className={`${styles.sizeOption} ${size.IsOutOfStock === "true" ? styles.outOfStock : styles.inStock} ${selectProductSize === size._id ? styles.selectedSize : ''}`}
                >
                  <p>
                    {size.size} {size.sizetype}
                  </p>
                </div>

              ))}
            </div>
          </div>
          <div className={styles.rightContent}>
            <p className={styles.price}>
              Rs.{selectedSize?.FinalPrice || product?.PriceAfterDiscount}
              <span className={styles.originalPrice}>Rs.{selectedSize?.price}</span>
            </p>

            <>
              {fetchCartLoader ? (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <PrimaryLoader />
                </div>
              ) : (
                <div className={styles.actions}>
                  {selectedSize?.IsOutOfStock === "true" ? (
                    // Show Out of Stock message if size is out of stock
                    <div style={{ color: "red", textAlign: "center", fontWeight: "bold", marginBottom: "10px" }}>
                      Out of Stock
                    </div>
                  ) : isInCart ? (
                    <>
                      <div className={styles.cartControls} style={{ display: "flex", justifyContent: "center" }}>

                        <button onClick={handleDecreaseQuantity}>-</button>
                        <span>{cartQuantity}</span>
                        <button onClick={handleIncreaseQuantity}>+</button>
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
                              fill-rule="evenodd"
                              d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                            />
                            <path
                              fill-rule="evenodd"
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
              )}
            </>
          </div>

          {/* <div className={styles.rightContent}>
            <p className={styles.price}>
              Rs.{selectedSize?.FinalPrice || product?.PriceAfterDiscount}
              <span className={styles.originalPrice}>Rs.{selectedSize?.price}</span>
            </p>
            <>
            {fetchCartLoader ? <div style={{ display: "flex", justifyContent: "center"}} > <PrimaryLoader /> </div> :
            <div className={styles.actions} >
              {isInCart ? (
                <>
                  <div className={styles.cartControls} style={{ display: "flex", justifyContent: "center"}} >
                    <button onClick={handleDecreaseQuantity}>-</button>
                    <span>{cartQuantity}</span>
                    <button onClick={handleIncreaseQuantity}>+</button>
                  </div>
                  <button className={styles.addToCartBtn} >
                    <Link to="/cart" >
                      Go TO CART  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" style={{ paddingTop: "2px", marginLeft: "5px" }} className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5" />
                        <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z" />
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
            }
            </>

          </div> */}
        </div> 
      </div>
    </div>
  );

};

export default ProductDetailsPage;