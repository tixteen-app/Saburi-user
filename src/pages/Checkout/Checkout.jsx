import { useEffect, useState } from "react";
import AddressForm from "../../components/addressForm/AddressForm";
import styles from "./checkout.module.css";
import { assets } from "../../assets/assets";
import CartList from "../../components/cartList/CartList";
import { submitOrder, fetchCart } from "../../utils/productFunction";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { makeApi } from "../../api/callApi";
import { ToastContainer, toast } from 'react-toastify';

const Checkout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove("selectedAddress");
  }, [])

  const [selectedPayment, setSelectedPayment] = useState("Razorpay");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [completeCart, setCompleteCart] = useState([]);
  const [fetchCartLoader, setFetchCartLoader] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [taxDetails, setTaxDetails] = useState({
    totalGstAmount: 0,
    totalAmountNoGST: 0,
    deliveryCharge: 0,
    finalTotal: 0,
    MRP: 0,
    DISCOUNT: 0,
    SELLINGPRICE: 0
  });

  const calculateCartWithGST = (cartData) => {
    if (!cartData?.orderItems?.length > 0) {
      return {
        totalGstAmount: 0,
        totalAmountNoGST: 0,
        deliveryCharge: 0,
        finalTotal: 0,
        MRP: 0,
        DISCOUNT: 0,
        SELLINGPRICE: 0
      };
    }

    let totalGstAmount = 0;
    let totalAmountNoGST = 0;
    let totalDiscountedBase = 0;
    const MRP = cartData.totalPriceWithoutDiscount;
    const DISCOUNT = MRP - cartData.totalPrice;
    const SELLINGPRICE = cartData.totalPrice;

    // Without coupon calculation
    if (!cartData.couapnDiscount) {
      cartData.orderItems.forEach(item => {
        const finalPrice = item.size?.FinalPrice || 0;
        const gstPercentage = Number(item.productId?.category?.tax) || 12;
        const basePrice = finalPrice / (1 + gstPercentage / 100);

        totalAmountNoGST += basePrice * item.quantity;
        totalGstAmount += (finalPrice - basePrice) * item.quantity;
      });
    }
    // With coupon calculation
    else {
      const totalDiscount = cartData.couapnDiscount;
      const originalTotal = cartData.totalPriceWithoutDiscount;

      cartData.orderItems.forEach(item => {
        const finalPrice = item.size?.FinalPrice || 0;
        const gstPercentage = Number(item.productId?.category?.tax) || 12;

        const itemBasePrice = (item.size.price * (1 - item.size.discountPercentage / 100)) / (1 + gstPercentage / 100);
        const itemShare = (item.size.price * item.quantity) / originalTotal;
        const itemDiscount = totalDiscount * itemShare;
        const discountedBasePerUnit = itemBasePrice - (itemDiscount / (1 + gstPercentage / 100)) / item.quantity;

        totalDiscountedBase += discountedBasePerUnit * item.quantity;
        totalGstAmount += discountedBasePerUnit * (gstPercentage / 100) * item.quantity;
      });

      totalAmountNoGST = totalDiscountedBase;
    }

    const deliveryCharge = cartData.totalPrice < 750 ? 75 : 0;
    const finalTotal = cartData.totalPrice + deliveryCharge;

    return {
      totalGstAmount,
      totalAmountNoGST,
      deliveryCharge,
      finalTotal,
      MRP,
      DISCOUNT,
      SELLINGPRICE
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetchCartLoader(true);
        await fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setFetchCartLoader(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (completeCart?.orderItems) {
      const calculatedTax = calculateCartWithGST(completeCart);
      setTaxDetails(calculatedTax);
    }
  }, [completeCart]);

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const selectedAddress = Cookies.get("selectedAddress");
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }

    const orderData = {
      shippingAddress: selectedAddress,
      paymentMethod: selectedPayment,
      CartId: Cookies.get("cartId"),
      ...taxDetails
    };

    if (selectedPayment === "Razorpay") {
      try {
        const response = await makeApi('/api/create-razorpay-order', 'POST', {
          amount: completeCart.totalPrice,
          currency: "INR"
        });
        await handleRazorpayPayment(
          response.data.amount,
          response.data.id,
          response.data.created_at,
          orderData
        );
      } catch (error) {
        console.error("Payment error:", error);
        toast.error("Payment processing failed");
      }
    } else {
      submitOrder(orderData, setLoading, setOrderPlaced, setShowGif, navigate);
    }
  };

  const handleRazorpayPayment = async (amount, orderId, createdAt, orderData) => {
    const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      toast.error("Payment gateway failed to load");
      return;
    }

    const options = {
      key: "rzp_test_DaA1MMEW2IUUYe",
      amount,
      currency: "INR",
      name: "Saburi Website",
      description: "Order Payment",
      image: "http://localhost:5173/src/assets/logo.png",
      order_id: orderId,
      handler: function (response) {
        submitOrder({
          ...orderData,
          paymentId: response.razorpay_payment_id,
          paymentorderCratedAt: createdAt,
          paymentDoneAt: new Date()
        }, setLoading, setOrderPlaced, setShowGif, navigate);
      },
      theme: { color: "#3399cc" }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  return (
    <>
      {showGif ? (
        <div className={styles.Order_Placeed_div}>
          <img
            src="https://cdn.dribbble.com/users/2572904/screenshots/17169793/media/ed801ffe0fbeb4b95ca246ba1f5ea398.gif"
            alt="Order Success"
            className={styles.Order_Placeed_gif}
          />
        </div>
      ) : (
        <div className={styles.container}>
          <ToastContainer position="top-center" autoClose={2000} />
          <h1 className={styles.paymentHeading}>PAYMENT OPTION</h1>
          <div className={styles.innerContainer}>
            <div className={styles.leftContainer}>
              <AddressForm />
              <div className={styles.paymentMethodContainer}>
                <h3 className={styles.heading}>Payment Method</h3>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Razorpay"
                      checked={selectedPayment === "Razorpay"}
                      onChange={handlePaymentChange}
                      className={styles.radioInput}
                    />
                    <img src={assets.razorpay} alt="Razorpay" className={styles.logo} />
                  </label>
                  <label className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Cash On Delivery"
                      checked={selectedPayment === "Cash On Delivery"}
                      onChange={handlePaymentChange}
                      className={styles.radioInput}
                    />
                    <span>Cash On Delivery</span>
                  </label>
                </div>
                <div className={styles.paynow}>

                  <div>
                    <button onClick={handleSubmit} disabled={loading}>{loading ? "Processing..." : "PAY NOW"}</button>
                  </div>
                  <div>
                    <p>estimated delivery by</p>
                    <p>29/aug/2024</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.rightContainer}>
              <CartList
                completeCart={completeCart}
                taxDetails={taxDetails}
                loading={fetchCartLoader}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;