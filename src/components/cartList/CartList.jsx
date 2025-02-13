import { useEffect, useState } from "react";
import { cartList } from "../../assets/assets"
import styles from "./cartList.module.css"
import { fetchCart } from "../../utils/productFunction";

const CartList = () => {
	const [cartItems, setCartItems] = useState([]);
	const [completeCart, setCompleteCart] = useState([]);

	const [fetchCartLoader, setFetchCartLoader] = useState(false);



	const fetchCartItems = async () => {
		try {
		  await fetchCart(setCartItems,setCompleteCart,setFetchCartLoader);
		} catch (error) {
		  console.error('Error fetching cart items:', error);
		}
	  };

	  useEffect(() => {
		fetchCartItems();
	  }, []);
	  const formatDate = (date) => {
		const options = { day: '2-digit', month: 'short', year: 'numeric' };
		return new Intl.DateTimeFormat('en-GB', options).format(date).toUpperCase();
	  };

	  const today = new Date();
	  const futureDate = new Date(today.setDate(today.getDate() + 10));
	
	return (
		<div>
			<div className={styles.rightCart}>
				<div className={styles.topRightCart}>
					{completeCart?.orderItems?.map((item, i) => (
						<div className={styles.productadded}>
							<div>
								<img
									src={item.productId.thumbnail}
									alt=""
								/>
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
	)
}

export default CartList
