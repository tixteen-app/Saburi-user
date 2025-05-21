  import { makeApi } from "../api/callApi.tsx";
import Cookies from 'js-cookie';


let cartCountListeners = [];


export const fetchWishlist = async (setWishlistItems) => {
  try {
    const response = await makeApi("/api/get-my-wishlist", "GET");
    const wishlistIds = response.data.wishlist
      .filter(item => item.products !== null)
      .map(item => item.products._id);
    setWishlistItems(wishlistIds);
  } catch (error) {
    console.log(error);
  }
};

export const fetchCart = async (setCartItems, setCompleteCart, setFetchCartLoader) => {
  setFetchCartLoader(true);
  try {
    const response = await makeApi("/api/my-cart", "GET");

    // Check if response.data exists and has orderItems
    if (!response?.data) {
      console.error("No data in response");
      return;
    }

    // Set cart id in cookie if it exists
    if (response.data._id) {
      Cookies.set("cartId", response.data._id, { expires: 2 });
      Cookies.set("cardItem", JSON.stringify(response.data), { expires: 2 });
    }

    // Safely handle orderItems (default to empty array if not present)
    const orderItems = response.data.orderItems || [];
    const cartItems = orderItems.map(item => ({
      productId: item?.productId?._id,
      quantity: item?.quantity,
      size: item?.size?._id,
    }));
    
    setCartItems(cartItems);
    
    if (setCompleteCart) {
      setCompleteCart(response.data);
    }
    
    updateCartCount(cartItems);
  } catch (error) {
    console.error("Error fetching cart:", error);
  } finally {
    setFetchCartLoader(false);  
  }
};

export const addToCart = async (
  productId,
  setIsLogin,
  setShowPopup,
  fetchCart,
  setCartItems,
  setProductLoaders,
  selectProductSize
) => {
  const token = localStorage.getItem("token");
  if (!token) {
    setIsLogin(false);
    setShowPopup(true);
    return;
  }

  try {
    setProductLoaders((prevState) => ({
      ...prevState,
      [productId]: true,
    }));

    const method = "POST";
    const endpoint = "/api/add-to-cart";
    await makeApi(endpoint, method, {
      productId,
      selectProductSize,
      quantity: 1,
      shippingPrice: 0,
    });

    // fetchCart(setCartItems);
    const updatedCartItems = Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [];
    const newCartItem = { productId, quantity: 1, size: selectProductSize };
    updatedCartItems.push(newCartItem);
    Cookies.set("cartItems", JSON.stringify(updatedCartItems), { expires: 2 });
  } catch (error) {
    console.log(error.response.data);
  } finally {
    setProductLoaders((prevState) => ({
      ...prevState,
      [productId]: false,
    }));
  }
};

export const removeFromCart = async (
  productId,
  setProductLoaders,
  setCartItems,
  fetchCart,
  selectProductSize
) => {
  try {
    setProductLoaders((prevState) => ({
      ...prevState,
      [productId]: true, 
    }));
    const method = "POST";
    const endpoint = "/api/remove-from-cart";
    await makeApi(endpoint, method, { productId , selectProductSize });

    // fetchCart(setCartItems);
    let updatedCartItems = Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [];
    updatedCartItems = updatedCartItems.filter(item => item.productId !== productId);
    Cookies.set("cartItems", JSON.stringify(updatedCartItems), { expires: 2 });
  } catch (error) {
    console.log(error);
  } finally {
    setProductLoaders((prevState) => ({
      ...prevState,
      [productId]: false,
    }));
  }
};
export const deleteproductFromCart = async (
  productId,
  setProductLoaders,
  setCartItems,
  fetchCart,
  selectProductSize,
  quantity
) => {
  try {
    setProductLoaders((prevState) => ({
      ...prevState,
      [productId]: true, 
    }));
    const method = "POST";
    const endpoint = "/api/delete-product-from-cart";
    await makeApi(endpoint, method, { productId , selectProductSize,productQuantity: quantity });

    // fetchCart(setCartItems);
    let updatedCartItems = Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : [];
    updatedCartItems = updatedCartItems.filter(item => item.productId !== productId);
    Cookies.set("cartItems", JSON.stringify(updatedCartItems), { expires: 2 });
  } catch (error) {
    console.log(error);
  } finally {
    setProductLoaders((prevState) => ({
      ...prevState,
      [productId]: false,
    }));
  }
};



export const submitOrder = async (data, setLoading, setOrderPlaced, setShowGif, navigate) => {
  try {
    setLoading(true);
    const response = await makeApi("/api/create-second-order", "POST", data);
    setShowGif(true);
    setOrderPlaced(true);
    updateCartCount([]);
    setTimeout(() => {
      setShowGif(false);  // Hide the GIF after 10 seconds
      navigate("/store");
    }, 3000);  // 10 seconds delay
  } catch (error) {
    console.error("Error creating order: ", error);
  } finally {
    setLoading(false);
    // Remove selectedAddress from cookies
    Cookies.remove("selectedAddress");
  }
};




const updateCartCount = (cartItems) => {
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  cartCountListeners.forEach(listener => listener(cartCount));
};

export const subscribeToCartCount = (listener) => {
  cartCountListeners.push(listener);
};

export const unsubscribeFromCartCount = (listener) => {
  cartCountListeners = cartCountListeners.filter(l => l !== listener);
};
