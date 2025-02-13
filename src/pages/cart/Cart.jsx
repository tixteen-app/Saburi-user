
// import { Link, useNavigate } from "react-router-dom";
// import { assets, cartList } from "../../assets/assets";
// import CartList from "../../components/cartList/CartList";
// import styles from "./cart.module.css";
// import { AiOutlineDelete } from "react-icons/ai";
// import { addToCart, removeFromCart, fetchCart, deleteproductFromCart } from '../../utils/productFunction.js';
// import { useEffect, useState } from "react";
// import PrimaryLoader from "../../utils/loaders/PrimaryLoader.jsx";
// import Cookies from "js-cookie";

// const Cart = () => {
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [completeCart, setCompleteCart] = useState([]);
//   const [fetchCartLoader, setFetchCartLoader] = useState(false);
//   const [productLoaders, setProductLoaders] = useState();

//   // Confirmation dialog states
//   const [showConfirmDialog, setShowConfirmDialog] = useState(false);
//   const [productToDelete, setProductToDelete] = useState(null);

//   const fetchCartItems = async () => {
//     try {
//       await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
//     } catch (error) {
//       console.error('Error fetching cart items:', error);
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
//       fetchCartItems();
//     }
//   };

//   const cancelDelete = () => {
//     setProductToDelete(null);
//     setShowConfirmDialog(false);
//   };

//   console.log("-=-=-=-",completeCart);
//   if (completeCart?.orderItems?.length === 0 )  {
//     return (
//       <div className={styles.container}>
//         <h1 className={styles.cartHeading}>CART</h1>
//         <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
//           <img src="https://ignouwala.com/assets/empty-cart.png" alt="" style={{ width: "500px" }} />
//           <div style={{ backgroundColor: "#f2f2f2", padding: "10px", borderRadius: "10px", cursor: "pointer" }}>
//             <Link to={"/store"}>
//               Buy something and add it to your cart.
//               <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" style={{ cursor: "pointer", marginLeft: "5px", paddingTop: "2px" }} className="bi bi-box-arrow-up-left" viewBox="0 0 16 16">
//                 <path fill-rule="evenodd" d="M7.364 3.5a.5.5 0 0 1 .5-.5H14.5A1.5 1.5 0 0 1 16 4.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 3 14.5V7.864a.5.5 0 1 1 1 0V14.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H7.864a.5.5 0 0 1-.5-.5" />
//                 <path fill-rule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h5a.5.5 0 0 1 0 1H1.707l8.147 8.146a.5.5 0 0 1-.708.708L1 1.707V5.5a.5.5 0 0 1-1 0z" />
//               </svg>
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       {fetchCartLoader ? (
//         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
//           <PrimaryLoader />
//         </div>
//       ) : (
//         <div className={styles.container}>
//           <h1 className={styles.cartHeading}>CART</h1>
//           <div className={styles.cartContainer}>
//             <div className={styles.leftCart}>
//               <div className={`${styles.cartGrid} ${styles.cartGrid1}`}>
//                 <p>
//                   <span>PRODUCT</span> NAME
//                 </p>
//                 <p className={styles.quantityDesktop}>QUANTITY</p>
//                 <p className={styles.quantityMobile}>QYT</p>
//                 <p className={styles.quantityMobile}>Size</p>
//                 <p>PRICE</p>
//               </div>
//               <div className={styles.cartList}>
//                 {completeCart?.orderItems?.map((item, i) => {
//                   return (
//                     <div key={i} className={`${styles.cartGrid} ${styles.cartGrid2}`}>
//                       <img
//                         src={item.productId.thumbnail}
//                         alt=""
//                       />
//                       <p>{item.productId.name} <br /> {`${item.size.size} ${item.size.sizetype}`} </p>
//                       <p>{item.quantity}</p>
//                       <small>{` ₹${item.size.FinalPrice} x ${item.quantity} = ₹${(item.size.FinalPrice * item.quantity)}`}</small>
//                       <p className={styles.removeCart}>
//                         <AiOutlineDelete onClick={() => handleDeleteClick(item.productId._id, item.size._id, item.quantity)} />
//                       </p>
//                     </div>
//                   );
//                 })}
//               </div>
//               <div
//                 className={`${styles.proceedCheckout} ${styles.proceedCheckout1}`}
//                 onClick={() => navigate("/checkout")}
//               >
//                 <button>PROCEED TO CHECKOUT</button>
//               </div>
//             </div>

//             <div className={styles.rightCart}>
//               <CartList />
//             </div>
//             <div
//               className={`${styles.proceedCheckout} ${styles.proceedCheckout2}`}
//               onClick={() => navigate("/checkout")}
//             >
//               <button>PROCEED TO CHECKOUT</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showConfirmDialog && (
//         <div className={styles.confirmationDialog}>
//           <div className={styles.dialogContent}>
//             <h2>Confirm Deletion</h2>
//             <p>Are you sure you want to remove this item from your cart?</p>
//             <div className={styles.dialogButtons_both} >

//             <button onClick={confirmDelete} className={styles.confirmButton}>Confirm</button>
//             <button onClick={cancelDelete} className={styles.cancelButton}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Cart;

import { Link, useNavigate } from "react-router-dom";
import { assets, cartList } from "../../assets/assets";
import CartList from "../../components/cartList/CartList";
import styles from "./cart.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import { addToCart, removeFromCart, fetchCart, deleteproductFromCart } from '../../utils/productFunction.js';
import { useEffect, useState } from "react";
import PrimaryLoader from "../../utils/loaders/PrimaryLoader.jsx";
import Cookies from "js-cookie";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [completeCart, setCompleteCart] = useState({ orderItems: [] });
  const [fetchCartLoader, setFetchCartLoader] = useState(false);
  const [productLoaders, setProductLoaders] = useState();

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const fetchCartItems = async () => {
    try {
      await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
    } catch (error) {
      console.error('Error fetching cart items:', error);
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
      fetchCartItems();
    }
  };

  const cancelDelete = () => {
    setProductToDelete(null);
    setShowConfirmDialog(false);
  };

  if (completeCart.orderItems.length === 0) {
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
    <>
      {fetchCartLoader ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
          <PrimaryLoader />
        </div>
      ) : (
        <div className={styles.container}>
          <h1 className={styles.cartHeading}>CART</h1>
          <div className={styles.cartContainer}>
            <div className={styles.leftCart}>
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
                    <p>{item.quantity}</p>
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

            <div className={styles.rightCart}>
              <CartList />
            </div>
            <div className={`${styles.proceedCheckout} ${styles.proceedCheckout2}`} onClick={() => navigate("/checkout")}>
              <button>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
      )}

      {showConfirmDialog && (
        <div className={styles.confirmationDialog}>
          <div className={styles.dialogContent}>
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to remove this item from your cart?</p>
            <div className={styles.dialogButtons_both}>
              <button onClick={confirmDelete} className={styles.confirmButton}>Confirm</button>
              <button onClick={cancelDelete} className={styles.cancelButton}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
