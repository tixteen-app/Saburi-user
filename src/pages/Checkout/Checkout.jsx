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
  },[])

  const [selectedPayment, setSelectedPayment] = useState("Razorpay");
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [responseId, setResponseId] = useState("");
  const [responseState, setResponseState] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [completeCart, setCompleteCart] = useState([]);
  const [fetchCartLoader, setFetchCartLoader] = useState(false);
  const [showGif, setShowGif] = useState(false);

  useEffect(() => {
    fetchCart(setCartItems, setCompleteCart, setFetchCartLoader);
  }, []);

  const loadRazorpayScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = async (amount) => {
    const data = { amount: amount, currency: "INR" };
    try {
      const response = await makeApi('/api/create-razorpay-order', 'POST', data);
      handleRazorpayScreen(response.data.amount, response.data.id, response.data.created_at);
    } catch (error) {
      console.log(error);
    } finally {
      Cookies.remove("selectedAddress");
    }
  };

  const handleRazorpayScreen = async (amount, orderId, order_created_at) => {
    const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: "rzp_test_DaA1MMEW2IUUYe", 
      currency: "INR",
      amount: amount,
      // name: "USER",
      name: "Saburi Website",
      description: "Test Transaction",
      image: "http://localhost:5173/src/assets/logo.png",
      order_id: orderId,
      handler: function (response) {
        setResponseId(response.razorpay_order_id);
        // alert(response.razorpay_payment_id);
        const data = {
          shippingAddress: Cookies.get("selectedAddress"),
          paymentMethod: selectedPayment,
          CartId: Cookies.get("cartId"),
          paymentId: response.razorpay_payment_id,
          currency: "INR",
          paymentorderCratedAt: order_created_at,
          UserIp: "192.168.0.1",
          paymentDoneAt: new Date(),
          orderfromURL: window.location.href,
          DeviceType: /Mobi|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop",
        };
        submitOrder(data, setLoading, setOrderPlaced, setShowGif, navigate);
      },
      prefill: {
        name: "Vaibhav", // Optional user details
        email: "fZ5vA@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "green", // Customize Razorpay theme color
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = async (event) => {
    const selectedAddress = Cookies.get("selectedAddress");
    if (!selectedAddress) {
      toast.error("Please select an address");
      return;
    }
    event.preventDefault();
    if (selectedPayment === "Razorpay") {
      createRazorpayOrder(completeCart.totalPrice);
    } else {
      const data = {
        shippingAddress: selectedAddress,
        paymentMethod: selectedPayment,
        CartId: Cookies.get("cartId"),
      };
      submitOrder(data, setLoading, setOrderPlaced, setShowGif, navigate);
    }
  };

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  return (
    <>
    {showGif ? (
      <div className={styles.Order_Placeed_div} >
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
                  <button onClick={(e) => handleSubmit(e)}>PAY NOW</button>
                </div>
                <div>
                  <p>estimated delivery by</p>
                  <p>29/aug/2024</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <CartList />
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Checkout;


