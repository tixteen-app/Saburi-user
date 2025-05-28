// import { Link, useNavigate } from "react-router-dom";
// import styles from "./cart.module.css";
// import { AiOutlineDelete } from "react-icons/ai";
// import { FaMinus, FaPlus } from "react-icons/fa";
// import { addToCart, removeFromCart, fetchCart, deleteproductFromCart } from '../../utils/productFunction.js';
// import { useEffect, useState } from "react";
// import PrimaryLoader from "../../utils/loaders/PrimaryLoader.jsx";

// const Cart = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [completeCart, setCompleteCart] = useState(null);
//   const [fetchCartLoader, setFetchCartLoader] = useState(true);
//   const [productLoaders, setProductLoaders] = useState({});
//   const [quantityUpdates, setQuantityUpdates] = useState({});

//   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);

//   const formatDate = (date) => {
//     const options = { day: '2-digit', month: 'short', year: 'numeric' };
//     return new Intl.DateTimeFormat('en-GB', options).format(date).toUpperCase();
//   };

//   const today = new Date();
//   const futureDate = new Date(today.setDate(today.getDate() + 10));

//   const fetchCartItems = async () => {
//     try {
//       setFetchCartLoader(true);
//       await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
//     } catch (error) {
//       console.error('Error fetching cart items:', error);
//       setFetchCartLoader(false);
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const handleDeleteClick = (productId, selectProductSize, quantity) => {
//     setProductToDelete({ productId, selectProductSize, quantity });
//     setShowConfirmDialog(true);
//   };

//   const confirmDelete = async () => {
//     if (productToDelete) {
//       const { productId, selectProductSize, quantity } = productToDelete;
//       await deleteproductFromCart(productId, setProductLoaders, setCartItems, fetchCart, selectProductSize, quantity);
//       setProductToDelete(null);
//       setShowConfirmDialog(false);
//       await fetchCartItems();
//     }
//   };

//   const cancelDelete = () => {
//     setProductToDelete(null);
//     setShowConfirmDialog(false);
//   };

//   const handleQuantityChange = async (productId, sizeId, newQuantity) => {
//     if (newQuantity < 1) return;

//     setQuantityUpdates(prev => ({
//       ...prev,
//       [`${productId}-${sizeId}`]: true
//     }));

//     try {
//       if (newQuantity > (quantityUpdates[`${productId}-${sizeId}`]?.currentQuantity || 0)) {
//         await addToCart(productId, 1, setProductLoaders, setCartItems, fetchCart, sizeId);
//       } else {
//         await removeFromCart(productId, setProductLoaders, setCartItems, fetchCart, sizeId);
//       }
//       await fetchCartItems();
//     } catch (error) {
//       console.error('Error updating quantity:', error);
//     } finally {
//       setQuantityUpdates(prev => ({
//         ...prev,
//         [`${productId}-${sizeId}`]: false
//       }));
//     }
//   };

//   if (fetchCartLoader) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
//         <PrimaryLoader />
//       </div>
//     );
//   }

//   if (!completeCart || completeCart.orderItems.length === 0) {
//     return (
//       <div className={styles.container}>
//         <h1 className={styles.cartHeading}>CART</h1>
//         <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
//           <img src="https://ignouwala.com/assets/empty-cart.png" alt="" style={{ width: "500px" }} />
//           <div style={{ backgroundColor: "#f2f2f2", padding: "10px", borderRadius: "10px", cursor: "pointer" }}>
//             <Link to={"/store"}>
//               Buy something and add it to your cart.
//               <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" style={{ cursor: "pointer", marginLeft: "5px", paddingTop: "2px" }} className="bi bi-box-arrow-up-left" viewBox="0 0 16 16">
//                 <path fillRule="evenodd" d="M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5" />
//                 <path fillRule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0z" />
//               </svg>
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.cartHeading}>CART</h1>
//       <div className={styles.cartContainer}>
//         <div className={styles.leftCart} style={{width: "100%"}}>
//           <div className={`${styles.cartGrid} ${styles.cartGrid1}`}>
//             <p><span>PRODUCT</span> NAME</p>
//             <p className={styles.quantityDesktop}>QUANTITY</p>
//             <p className={styles.quantityMobile}>QTY</p>
//             <p className={styles.quantityMobile}>Size</p>
//             <p>PRICE</p>
//           </div>
//           <div className={styles.cartList}>
//             {completeCart.orderItems.map((item, i) => (
//               <div key={i} className={`${styles.cartGrid} ${styles.cartGrid2}`}>
//                 <img src={item.productId.thumbnail} alt="" />
//                 <p>{item.productId.name} <br /> {`${item.size.size} ${item.size.sizetype}`} </p>

//                 <div className={styles.quantityControl}>
//                   <button 
//                     onClick={() => handleQuantityChange(item.productId._id, item.size._id, item.quantity - 1)}
//                     disabled={quantityUpdates[`${item.productId._id}-${item.size._id}`]}
//                   >
//                     <FaMinus />
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button 
//                     onClick={() => handleQuantityChange(item.productId._id, item.size._id, item.quantity + 1)}
//                     disabled={quantityUpdates[`${item.productId._id}-${item.size._id}`]}
//                   >
//                     <FaPlus />
//                   </button>
//                 </div>

//                 <small>{` ₹${item.size.FinalPrice} x ${item.quantity} = ₹${(item.size.FinalPrice * item.quantity)}`}</small>
//                 <p className={styles.removeCart}>
//                   <AiOutlineDelete onClick={() => handleDeleteClick(item.productId._id, item.size._id, item.quantity)} />
//                 </p>
//               </div>
//             ))}
//           </div>
//           <div className={`${styles.proceedCheckout} ${styles.proceedCheckout1}`} onClick={() => navigate("/checkout")}>
//             <button>PROCEED TO CHECKOUT</button>
//           </div>
//         </div>

//         <div style={{width:"100%"}}>
//           <div className={styles.rightCart}>
//             <div className={styles.topRightCart}>
//               {completeCart?.orderItems?.map((item, i) => (
//                 <div className={styles.productadded} key={i}>
//                   <div>
//                     <img src={item.productId.thumbnail} alt="" />
//                     <p>
//                       {item.productId.name} {`${item.size.size} ${item.size.sizetype}`}
//                     </p>
//                   </div>
//                   <p>₹ {item.totalPrice}</p>
//                 </div>
//               ))}
//             </div>
//             <div className={styles.topBottomCart}>
//               <div>
//                 <p>SUB TOTAL</p>
//                 <p>₹{completeCart?.totalPriceWithoutDiscount}</p>
//               </div>
//               <div>
//                 <p>DISCOUNT</p>
//                 <p>₹{(completeCart?.totalPriceWithoutDiscount - completeCart?.totalPrice)}</p>
//               </div>
//               <div>
//                 <p>SHIPPING</p>
//                 <p>FREE</p>
//               </div>
//               <div>
//                 <p>TOTAL</p>
//                 <p>₹{completeCart?.totalPrice}</p>
//               </div>
//               <hr />
//               <div>
//                 <h4>estimated delivery by</h4>
//                 <h4>{formatDate(futureDate)}</h4>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={`${styles.proceedCheckout} ${styles.proceedCheckout2}`} onClick={() => navigate("/checkout")}>
//           <button>PROCEED TO CHECKOUT</button>
//         </div>
//       </div>

//       {showConfirmDialog && (
//         <div className={styles.confirmationDialog}>
//           <div className={styles.dialogContent}>
//             <h2>Confirm Deletion</h2>
//             <p>Remove this item from your cart?</p>
//             <div className={styles.dialogButtons_both}>
//               <button onClick={confirmDelete} className={styles.confirmButton}>Confirm</button>
//               <button onClick={cancelDelete} className={styles.cancelButton}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

// import { Link, useNavigate } from "react-router-dom";
// import styles from "./cart.module.css";
// import { AiOutlineDelete } from "react-icons/ai";
// import { addToCart, removeFromCart, fetchCart, deleteproductFromCart } from '../../utils/productFunction.js';
// import { useEffect, useState } from "react";
// import PrimaryLoader from "../../utils/loaders/PrimaryLoader.jsx";

// const Cart = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [completeCart, setCompleteCart] = useState(null);
//   const [fetchCartLoader, setFetchCartLoader] = useState(true);
//   const [productLoaders, setProductLoaders] = useState({});
//   const [quantityLoaders, setQuantityLoaders] = useState({});
//   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);

//   const formatDate = (date) => {
//     const options = { day: '2-digit', month: 'short', year: 'numeric' };
//     return new Intl.DateTimeFormat('en-GB', options).format(date).toUpperCase();
//   };

//   const today = new Date();
//   const futureDate = new Date(today.setDate(today.getDate() + 10));

//   const fetchCartItems = async () => {
//     try {
//       setFetchCartLoader(true);
//       await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
//     } catch (error) {
//       console.error('Error fetching cart items:', error);
//       setFetchCartLoader(false);
//     }
//   };

//   useEffect(() => {
//     fetchCartItems();
//   }, []);

//   const handleDeleteClick = (productId, selectProductSize, quantity) => {
//     setProductToDelete({ productId, selectProductSize, quantity });
//     setShowConfirmDialog(true);
//   };

//   const confirmDelete = async () => {
//     if (productToDelete) {
//       const { productId, selectProductSize, quantity } = productToDelete;
//       await deleteproductFromCart(productId, setProductLoaders, setCartItems, fetchCart, selectProductSize, quantity);
//       setProductToDelete(null);
//       setShowConfirmDialog(false);
//       await fetchCartItems();
//     }
//   };

//   const cancelDelete = () => {
//     setProductToDelete(null);
//     setShowConfirmDialog(false);
//   };

//   const handleIncreaseQuantity = async (productId, selectProductSize, currentQuantity) => {
//     try {
//       setQuantityLoaders(prev => ({ ...prev, [productId]: true }));
//       await addToCart(
//         productId,
//         () => {},
//         () => {},
//         fetchCartItems,
//         setCartItems,
//         setProductLoaders,
//         selectProductSize
//       );
//       await fetchCartItems();
//     } finally {
//       setQuantityLoaders(prev => ({ ...prev, [productId]: false }));
//     }
//   };

//   const handleDecreaseQuantity = async (productId, selectProductSize, currentQuantity) => {
//     if (currentQuantity <= 1) {
//       handleDeleteClick(productId, selectProductSize, currentQuantity);
//       return;
//     }

//     try {
//       setQuantityLoaders(prev => ({ ...prev, [productId]: true }));
//       await removeFromCart(
//         productId,
//         setProductLoaders,
//         setCartItems,
//         fetchCartItems,
//         selectProductSize
//       );
//       await fetchCartItems();
//     } finally {
//       setQuantityLoaders(prev => ({ ...prev, [productId]: false }));
//     }
//   };

//   if (fetchCartLoader) {
//     return (
//       <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
//         <PrimaryLoader />
//       </div>
//     );
//   }

//   if (!completeCart || completeCart.orderItems.length === 0) {
//     return (
//       <div className={styles.container}>
//         <h1 className={styles.cartHeading}>CART</h1>
//         <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
//           <img src="https://ignouwala.com/assets/empty-cart.png" alt="" style={{ width: "500px" }} />
//           <div style={{ backgroundColor: "#f2f2f2", padding: "10px", borderRadius: "10px", cursor: "pointer" }}>
//             <Link to={"/store"}>
//               Buy something and add it to your cart.
//               <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" style={{ cursor: "pointer", marginLeft: "5px", paddingTop: "2px" }} className="bi bi-box-arrow-up-left" viewBox="0 0 16 16">
//                 <path fillRule="evenodd" d="M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5" />
//                 <path fillRule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0z" />
//               </svg>
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.cartHeading}>CART</h1>
//       <div className={styles.cartContainer}>
//         <div className={styles.leftCart} style={{width: "100%"}}>
//           <div className={`${styles.cartGrid} ${styles.cartGrid1}`}>
//             <p><span>PRODUCT</span> NAME</p>
//             <p className={styles.quantityDesktop}>QUANTITY</p>
//             <p className={styles.quantityMobile}>QYT</p>
//             <p className={styles.quantityMobile}>Size</p>
//             <p>PRICE</p>
//           </div>
//           <div className={styles.cartList}>
//             {completeCart.orderItems.map((item, i) => (
//               <div key={i} className={`${styles.cartGrid} ${styles.cartGrid2}`}>
//                 <img src={item.productId.thumbnail} alt="" />
//                 <p>{item.productId.name} <br /> {`${item.size.size} ${item.size.sizetype}`} </p>
//                 <div className={styles.quantityControls}>
//                   <button 
//                     onClick={() => handleDecreaseQuantity(item.productId._id, item.size._id, item.quantity)}
//                     disabled={quantityLoaders[item.productId._id]}
//                   >
//                     -
//                   </button>
//                   <span>{item.quantity}</span>
//                   <button 
//                     onClick={() => handleIncreaseQuantity(item.productId._id, item.size._id, item.quantity)}
//                     disabled={quantityLoaders[item.productId._id]}
//                   >
//                     +
//                   </button>
//                 </div>
//                 <small>{` ₹${item.size.FinalPrice} x ${item.quantity} = ₹${(item.size.FinalPrice * item.quantity)}`}</small>
//                 <p className={styles.removeCart}>
//                   <AiOutlineDelete onClick={() => handleDeleteClick(item.productId._id, item.size._id, item.quantity)} />
//                 </p>
//               </div>
//             ))}
//           </div>
//           <div className={`${styles.proceedCheckout} ${styles.proceedCheckout1}`} onClick={() => navigate("/checkout")}>
//             <button>PROCEED TO CHECKOUT</button>
//           </div>
//         </div>

//         <div style={{width:"100%"}}>
//           <div className={styles.rightCart}>
//             <div className={styles.topRightCart}>
//               {completeCart?.orderItems?.map((item, i) => (
//                 <div className={styles.productadded}>
//                   <div>
//                     <img src={item.productId.thumbnail} alt="" />
//                     <p>
//                       {item.productId.name} {`${item.size.size} ${item.size.sizetype}`}
//                     </p>
//                   </div>
//                   <p>₹ {item.totalPrice}</p>
//                 </div>
//               ))}
//             </div>
//             <div className={styles.topBottomCart}>
//               <div>
//                 <p>SUB TOTAL</p>
//                 <p>₹{completeCart?.totalPriceWithoutDiscount}</p>
//               </div>
//               <div>
//                 <p>DISCOUNT</p>
//                 <p>₹{(completeCart?.totalPriceWithoutDiscount - completeCart?.totalPrice)}</p>
//               </div>
//               <div>
//                 <p>SHIPPING</p>
//                 <p>FREE</p>
//               </div>
//               <div>
//                 <p>TOTAL</p>
//                 <p>₹{completeCart?.totalPrice}</p>
//               </div>
//               <hr />
//               <div>
//                 <h4>estimated delivery by</h4>
//                 <h4>{formatDate(futureDate)}</h4>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className={`${styles.proceedCheckout} ${styles.proceedCheckout2}`} onClick={() => navigate("/checkout")}>
//           <button>PROCEED TO CHECKOUT</button>
//         </div>
//       </div>

//       {showConfirmDialog && (
//         <div className={styles.confirmationDialog}>
//           <div className={styles.dialogContent}>
//             <h2>Confirm Deletion</h2>
//             <p>Remove this item from your cart?</p>
//             <div className={styles.dialogButtons_both}>
//               <button onClick={confirmDelete} className={styles.confirmButton}>Confirm</button>
//               <button onClick={cancelDelete} className={styles.cancelButton}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;



import { Link, useNavigate } from "react-router-dom";
import styles from "./cart.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import { addToCart, removeFromCart, fetchCart, deleteproductFromCart } from '../../utils/productFunction.js';
import { useEffect, useState } from "react";
import PrimaryLoader from "../../utils/loaders/PrimaryLoader.jsx";
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [completeCart, setCompleteCart] = useState(null);
  const [fetchCartLoader, setFetchCartLoader] = useState(true);
  const [productLoaders, setProductLoaders] = useState({});
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [quantityDirection, setQuantityDirection] = useState({}); // Track direction per product
  const [loader, setLoader] = useState(false);

  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date).toUpperCase();
  };

  const today = new Date();
  const futureDate = new Date(today.setDate(today.getDate() + 10));

  const fetchCartItems = async () => {
    try {
      setLoader(true);
      await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleDeleteClick = (productId, selectProductSize, quantity) => {
    setProductToDelete({ productId, selectProductSize, quantity });
    setShowConfirmDialog(true);
  };

  const confirmDelete = async () => {
    if (productToDelete) {
      const { productId, selectProductSize, quantity } = productToDelete;
      await deleteproductFromCart(productId, setProductLoaders, setCartItems, fetchCart, selectProductSize, quantity);
      setProductToDelete(null);
      setShowConfirmDialog(false);
      await fetchCartItems();
    }
  };

  const cancelDelete = () => {
    setProductToDelete(null);
    setShowConfirmDialog(false);
  };

  const handleIncreaseQuantity = async (productId, selectProductSize, currentQuantity) => {
    try {
      setQuantityDirection(prev => ({ ...prev, [productId]: 1 }));
      await addToCart(
        productId,
        () => { },
        () => { },
        fetchCartItems,
        setCartItems,
        null,
        selectProductSize
      );
      await fetchCartItems();
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const handleDecreaseQuantity = async (productId, selectProductSize, currentQuantity) => {
    if (currentQuantity <= 1) {
      handleDeleteClick(productId, selectProductSize, currentQuantity);
      return;
    }

    try {
      setQuantityDirection(prev => ({ ...prev, [productId]: -1 }));
      await removeFromCart(
        productId,
        null,
        setCartItems,
        fetchCartItems,
        selectProductSize
      );
      await fetchCartItems();
    } catch (error) {
      console.error('Error decreasing quantity:', error);
    }
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

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 }
  };

  if (loader) {
    
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <PrimaryLoader />
      </div>
    );
  }

  if (!completeCart || completeCart.orderItems.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.cartHeading}>CART</h1>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <img src="https://ignouwala.com/assets/empty-cart.png" alt="" style={{ width: "500px" }} />
          <div style={{ backgroundColor: "#f2f2f2", padding: "10px", borderRadius: "10px", cursor: "pointer" }}>
            <Link to={"/store"}>
              Buy something and add it to your cart.
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" style={{ cursor: "pointer", marginLeft: "5px", paddingTop: "2px" }} className="bi bi-box-arrow-up-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5" />
                <path fillRule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.cartHeading}>CART</h1>
      <div className={styles.cartContainer}>
        <div className={styles.leftCart} style={{ width: "100%" }}>
          <div className={`${styles.cartGrid} ${styles.cartGrid1}`}>
            <p><span>PRODUCT</span> NAME</p>
            <p className={styles.quantityDesktop}>QUANTITY</p>
            <p className={styles.quantityMobile}>QYT</p>
            <p className={styles.quantityMobile}>Size</p>
            <p>PRICE</p>
          </div>
          <div className={styles.cartList}>
            {completeCart.orderItems.map((item, i) => (
              <div key={i} className={`${styles.cartGrid} ${styles.cartGrid2}`}>
                <img src={item.productId.thumbnail} alt="" />
                <p>{item.productId.name} <br /> {`${item.size.size} ${item.size.sizetype}`} </p>
                <div className={styles.quantityControls}>
                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleDecreaseQuantity(item.productId._id, item.size._id, item.quantity)}
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
                    <AnimatePresence custom={quantityDirection[item.productId._id]} mode="popLayout">
                      <motion.span
                        key={item.quantity}
                        custom={quantityDirection[item.productId._id] || 1}
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
                        {item.quantity}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <motion.button
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleIncreaseQuantity(item.productId._id, item.size._id, item.quantity)}
                  >
                    +
                  </motion.button>
                </div>
                <small>{` ₹${item.size.FinalPrice} x ${item.quantity} = ₹${(item.size.FinalPrice * item.quantity)}`}</small>
                <p className={styles.removeCart}>
                  <AiOutlineDelete onClick={() => handleDeleteClick(item.productId._id, item.size._id, item.quantity)} />
                </p>
              </div>
            ))}
          </div>
          <div className={`${styles.proceedCheckout} ${styles.proceedCheckout1}`} onClick={() => navigate("/checkout")}>
            <button>PROCEED TO CHECKOUT</button>
          </div>
        </div>

        <div style={{ width: "100%" }}>
          <div className={styles.rightCart}>
            <div className={styles.topRightCart}>
              {completeCart?.orderItems?.map((item, i) => (
                <div className={styles.productadded}>
                  <div>
                    <img src={item.productId.thumbnail} alt="" />
                    <p>
                      {item.productId.name} {`${item.size.size} ${item.size.sizetype}`}
                    </p>
                  </div>
                  <p>₹ {item.totalPrice}</p>
                </div>
              ))}
            </div>
            <div className={styles.topBottomCart}>
              <div>
                <p>SUB TOTAL</p>
                <p>₹{completeCart?.totalPriceWithoutDiscount}</p>
              </div>
              <div>
                <p>DISCOUNT</p>
                <p>₹{(completeCart?.totalPriceWithoutDiscount - completeCart?.totalPrice)}</p>
              </div>
              <div>
                <p>SHIPPING</p>
                <p>FREE</p>
              </div>
              <div>
                <p>TOTAL</p>
                <p>₹{completeCart?.totalPrice}</p>
              </div>
              <hr />
              <div>
                <h4>estimated delivery by</h4>
                <h4>{formatDate(futureDate)}</h4>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.proceedCheckout} ${styles.proceedCheckout2}`} onClick={() => navigate("/checkout")}>
          <button>PROCEED TO CHECKOUT</button>
        </div>
      </div>

      {showConfirmDialog && (
        <div className={styles.confirmationDialog}>
          <div className={styles.dialogContent}>
            <h2>Confirm Deletion</h2>
            <p>Remove this item from your cart?</p>
            <div className={styles.dialogButtons_both}>
              <button onClick={confirmDelete} className={styles.confirmButton}>Confirm</button>
              <button onClick={cancelDelete} className={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;