// import { useEffect, useState } from "react";
// import { cartList } from "../../assets/assets"
// import styles from "./cartList.module.css"
// import { fetchCart } from "../../utils/productFunction";

// const CartList = () => {
// 	const [cartItems, setCartItems] = useState([]);
// 	const [completeCart, setCompleteCart] = useState([]);

// 	const [fetchCartLoader, setFetchCartLoader] = useState(false);



// 	const fetchCartItems = async () => {
// 		try {
// 		  await fetchCart(setCartItems,setCompleteCart,setFetchCartLoader);
// 		} catch (error) {
// 		  console.error('Error fetching cart items:', error);
// 		}
// 	  };

// 	  useEffect(() => {
// 		fetchCartItems();
// 	  }, []);
// 	  const formatDate = (date) => {
// 		const options = { day: '2-digit', month: 'short', year: 'numeric' };
// 		return new Intl.DateTimeFormat('en-GB', options).format(date).toUpperCase();
// 	  };

// 	  const today = new Date();
// 	  const futureDate = new Date(today.setDate(today.getDate() + 10));
	
// 	return (
// 		<div>
// 			<div className={styles.rightCart}>
// 				<div className={styles.topRightCart}>
// 					{completeCart?.orderItems?.map((item, i) => (
// 						<div className={styles.productadded}>
// 							<div>
// 								<img
// 									src={item.productId.thumbnail}
// 									alt=""
// 								/>
// 								<p>
// 								{item.productId.name} {`${item.size.size} ${item.size.sizetype}`}
// 								</p>
// 							</div>
// 							<p>₹ {item.totalPrice}</p>
// 						</div>
// 					))}
// 				</div>
// 				<div className={styles.topBottomCart}>
// 					<div>
// 						<p>SUB TOTAL</p>
// 						<p>₹{completeCart?.totalPriceWithoutDiscount}</p>
// 					</div>
// 					<div>
// 						<p>DISCOUNT</p>
// 						<p>₹{(completeCart?.totalPriceWithoutDiscount - completeCart?.totalPrice)}</p>
// 					</div>
// 					<div>
// 						<p>SHIPPING</p>
// 						<p>FREE</p>
// 					</div>
// 					<div>
// 						<p>TOTAL</p>
// 						<p>₹{completeCart?.totalPrice}</p>
// 					</div>
// 					<hr />
// 					<div>
// 						<h4>estimated delivery by</h4>
// 						<h4>{formatDate(futureDate)}</h4>
// 					</div>
// 				</div> 
// 			</div>
// 		</div>
// 	)
// }

// export default CartList

import { useEffect, useState } from "react";
import styles from "./cartList.module.css";



const CartList = ({ completeCart, taxDetails, loading }) => {
  const formatDate = (date) => {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(date).toUpperCase();
  };

  const today = new Date();
  const futureDate = new Date(today.setDate(today.getDate() + 10));

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className={styles.rightCart}>
        <div className={styles.loadingContainer}>
          <p>Loading cart details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.rightCart}>
      <div className={styles.topRightCart}>
        {completeCart?.orderItems?.map((item, i) => {
          const gstPercentage = Number(item.productId?.category?.tax) || 12;
          const gstAmount = (item.size.FinalPrice * gstPercentage) / (100 + gstPercentage);
          
          return (
            <div className={styles.productadded} key={i}>
              <div>
                <img src={item.productId.thumbnail} alt="" />
                <div>
                  <p>{item.productId.name} {`${item.size.size} ${item.size.sizetype}`}</p>
                  <small>GST: {gstPercentage}% (₹{(gstAmount * item.quantity).toFixed(2)})</small>
                </div>
              </div>
              <p>{formatCurrency(item.totalPrice)}</p>
            </div>
          );
        })}
      </div>
      <div className={styles.topBottomCart}>
        <div>
          <p>MRP</p>
          <p>{formatCurrency(taxDetails.MRP)}</p>
        </div>
        <div>
          <p>DISCOUNT</p>
          <p>-{formatCurrency(taxDetails.DISCOUNT)}</p>
        </div>
        <div>
          <p>SELLING PRICE</p>
          <p>{formatCurrency(taxDetails.SELLINGPRICE)}</p>
        </div>
        <div>
          <p>TAXABLE AMOUNT</p>
          <p>{formatCurrency(taxDetails.totalAmountNoGST)}</p>
        </div>
        <div>
          <p>TAX ADDED</p>
          <p>{formatCurrency(taxDetails.totalGstAmount)}</p>
        </div>
        <div>
          <p>DELIVERY CHARGE</p>
          <p>{taxDetails.deliveryCharge > 0 ? formatCurrency(taxDetails.deliveryCharge) : 'FREE'}</p>
        </div>
        <hr />
        <div className={styles.totalRow}>
          <p>ORDER TOTAL</p>
          <p>{formatCurrency(taxDetails.finalTotal)}</p>
        </div>
        <hr />
        <div className={styles.deliveryEstimate}>
          <h4>Estimated delivery by</h4>
          <h4>{formatDate(futureDate)}</h4>
        </div>
      </div>
    </div>
  );
};

export default CartList;