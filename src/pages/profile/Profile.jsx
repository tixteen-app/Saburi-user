// import React, { useEffect, useState } from "react"
// import styles from "./profile.module.css"
// import Addressstyles from "../../components/addressForm/addressForm.module.css";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import { makeApi } from "../../api/callApi"

// const Profile = () => {
// 	const [activeTab, setActiveTab] = useState("address")
// 	const [shippingAddresses, setShippingAddresses] = useState([]);
// 	const [RecentOrderList, setRecentOrderList] = useState([]);
// 	const [selectedAddress, setSelectedAddress] = useState(null);
// 	const [loading, setLoading] = useState(false);
// 	const [showEditPopup, setShowEditPopup] = useState(false);
// 	const [submitting, setSubmitting] = useState(false);


// 	const [formData, setFormData] = useState({
// 		firstname: "",
// 		lastname: "",
// 		phonenumber: "",
// 		address: "",
// 		pincode: "",
// 		country: "",
// 		state: "",
// 		city: ""
// 	});




// 	const fetchShippingAddresses = async () => {
// 		try {
// 			setLoading(true);
// 			const response = await makeApi("/api/get-my-shiped-address", "GET");
// 			setShippingAddresses(response.data.shipedaddress);
// 			setLoading(false);
// 		} catch (error) {
// 			console.error("Error fetching shipping addresses: ", error);
// 			setLoading(false);
// 		}
// 	};
// 	const fetchOrders = async () => {
// 		try {
// 			setLoading(true);

// 			const response = await makeApi("/api/get-my-second-order", "GET");
// 			setRecentOrderList(response.data.secondorders);
// 		} catch (error) {
// 			console.log(error);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	// edit address
// 	const handleEditClick = (address) => {
// 		setSelectedAddress(address);
// 		setFormData({
// 			firstname: address.firstname,
// 			lastname: address.lastname,
// 			phonenumber: address.phonenumber,
// 			address: address.address,
// 			pincode: address.pincode,
// 			country: address.country,
// 			state: address.state,
// 			city: address.city
// 		});
// 		setShowEditPopup(true);
// 	};
// 	const handleInputChange = async (e) => {
// 		const { name, value } = e.target;
// 		if (name === "phonenumber" && value.length > 10) {
// 			return;
// 		}
// 		setFormData({
// 			...formData,
// 			[name]: value
// 		});
// 		if (name === "pincode" && value.length === 6) {
// 			await searchPin(value);
// 		}
// 	};
// 	const searchPin = async (pin) => {
// 		try {
// 			setLoading(true);
// 			const response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
// 			const data = response.data;
// 			if (data && data.length > 0 && data[0].Status === 'Success') {
// 				setFormData((prevFormData) => ({
// 					...prevFormData,
// 					country: data[0].PostOffice[0].Country,
// 					state: data[0].PostOffice[0].State,
// 					city: data[0].PostOffice[0].District
// 				}));
// 			} else {
// 				toast.error('Invalid pincode');
// 				setFormData((prevFormData) => ({
// 					...prevFormData,
// 					country: '',
// 					state: '',
// 					city: ''
// 				}));
// 			}
// 		} catch (error) {
// 			console.error("Error fetching data:", error);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		if (!formData.firstname) {
// 			toast.error('Please fill firstname');
// 			return;
// 		}
// 		if (!formData.lastname) {
// 			toast.error('Please fill lastname');
// 			return;
// 		}
// 		if (!formData.phonenumber) {
// 			toast.error('Please fill phonenumber');
// 			return;
// 		}
// 		if (!formData.address) {
// 			toast.error('Please fill address');
// 			return;
// 		}
// 		if (!formData.pincode) {
// 			toast.error('Please fill pincode');
// 			return;
// 		}
// 		if (!formData.country) {
// 			toast.error('Please fill country');
// 			return;
// 		}
// 		if (!formData.state) {
// 			toast.error('Please fill state');
// 			return;
// 		}
// 		try {
// 			setSubmitting(true);
// 			const apiEndpoint = selectedAddress ? `/api/update-shiped-address/${selectedAddress._id}` : "/api/create-shiped-address";
// 			const response = await makeApi(apiEndpoint, selectedAddress ? "PUT" : "POST", formData);
// 			toast.success(response.data.message);
// 			setShowEditPopup(false);
// 			fetchShippingAddresses();
// 			setFormData({
// 				firstname: "",
// 				lastname: "",
// 				phonenumber: "",
// 				address: "",
// 				pincode: "",
// 				country: "",
// 				state: "",
// 				city: ""
// 			});
// 		} catch (error) {
// 			console.error("Error submitting address:", error);
// 			toast.error(error.response?.data?.message || "Error submitting address");
// 		} finally {
// 			setSubmitting(false);
// 			setSelectedAddress(null);
// 		}
// 	};
// 	const handleDeleteClick = async (addressId) => {
// 		if (window.confirm("Are you sure you want to delete this address?")) {
// 		  try {
// 			await makeApi(`/api/delete-shiped-address/${addressId}`, "DELETE");
// 			fetchShippingAddresses();
// 			toast.success("Address deleted successfully");
// 		  } catch (error) {
// 			console.error("Error deleting address:", error);
// 			toast.error("Error deleting address");
// 		  }
// 		}
// 	  };



// 	useEffect(() => {
// 		fetchShippingAddresses();
// 		fetchOrders()
// 	}, []);

// 	const handleTabClick = (tab) => {
// 		setActiveTab(tab)
// 	}
// 	function formatDate(dateString) {
// 		const options = {
// 			day: '2-digit',
// 			month: '2-digit',
// 			year: 'numeric',
// 			hour: '2-digit',
// 			minute: '2-digit',
// 			hour12: true
// 		};
// 		const date = new Date(dateString);
// 		return new Intl.DateTimeFormat('en-GB', options).format(date);
// 	}


// 	return (
// 		<>
// 			<div className={styles.container}>
// 				<div className={styles.tabs}>
// 					<div
// 						className={`${styles.tab} ${activeTab === "address" ? styles.active : ""
// 							}`}
// 						onClick={() => handleTabClick("address")}
// 					>
// 						Address
// 					</div>
// 					<div
// 						className={`${styles.tab} ${activeTab === "orders" ? styles.active : ""
// 							}`}
// 						onClick={() => handleTabClick("orders")}
// 					>
// 						Orders
// 					</div>
// 				</div>

// 				{activeTab === "address" && (
// 					<>
// 						{shippingAddresses.map((address, i) => (

// 							<div className={styles.addressSection} key={i} >
// 								<div className={styles.address}>
// 									<input
// 										type="radio"
// 										checked
// 										readOnly
// 									/>

// 									{`${address.firstname} ${address.lastname}, ${address.phonenumber}, ${address.address}, ${address.pincode}, ${address.city}, ${address.state}, ${address.country}`}

// 								</div>
// 								<div className={styles.mutateAddress}>
// 									<div className={styles.phone}>9501987577</div>
// 									<div className={styles.buttons}>
// 										<button className={styles.editBtn} onClick={() => handleEditClick(address)} >Edit</button>
// 										<button className={styles.deleteBtn} onClick={() => handleDeleteClick(address._id)} >Delete</button>
// 									</div>{" "}
// 								</div>
// 							</div>
// 						))}
// 						<button className={styles.addNewAddress} onClick={() => setShowEditPopup(true)} >+</button>

// 					</>
// 				)}

// 				{activeTab === "orders" && (
// 					<div className={styles.ordersSection}>
// 						<div className={styles.filterOrders}>
// 							<p>Past 3 Months</p>
// 							<p>
// 								Filter <span>→</span>
// 							</p>
// 						</div>
// 						<div className={styles.ordersList}>
// 							{RecentOrderList.map((order, i) => (
// 								<>
// 									<p>  {formatDate(order.createdAt)}</p>
// 									<div key={i} className={styles.MyOrder_order_container} style={{ display: "flex", flexDirection: "column", gap: "10px" }} onClick={() => { }} >
// 										{order.CartId.orderItems.map((item, i) => (
// 											<div key={i} >
// 												<img className="myorder-img-product" style={{ maxWidth: "50px" }} loading="lazy" src={item?.productId?.thumbnail} alt={item?.productId?.name} />
// 												<p>{item.productId.name},<span style={{ fontSize: "12px" }} > {item.size.size} {item?.size?.sizetype}</span> </p>
// 												<p><span style={{ fontSize: "12px" }} > {item.singleProductPrice}x{item.quantity}=₹{item?.totalPrice}</span> </p>
// 											</div>
// 										))
// 										}
// 										<div>

// 											<p>{order?.status}</p>
// 											<p>{order?.paymentMethod}</p>
// 											<p>₹{order?.CartId.totalPrice}</p>
// 										</div>
// 									</div>
// 								</>
// 							))}
// 						</div>
// 					</div>
// 				)}

// 			</div>
// 				<div className={`${showEditPopup ? Addressstyles.show_Address_popup : Addressstyles.hide_Address_popup}`}  >
// 					<form style={{maxWidth:"500px"}} className={`${Addressstyles.form}`} onSubmit={handleSubmit}>
// 						<div className={Addressstyles.close_button_for_address_popup} onClick={() => setShowEditPopup(false)}>x</div>
// 						<div className={Addressstyles.row}>
// 							<input
// 								type="text"
// 								name="firstname"
// 								placeholder="firstname"
// 								value={formData.firstname}
// 								onChange={handleInputChange}
// 								className={Addressstyles.input}
// 							/>
// 							<input
// 								type="text"
// 								name="lastname"
// 								placeholder="lastname"
// 								value={formData.lastname}
// 								onChange={handleInputChange}
// 								className={Addressstyles.input}
// 							/>
// 						</div>
// 						<div className={Addressstyles.row}>
// 							<input
// 								type="number"
// 								name="phonenumber"
// 								placeholder="Phone Number"
// 								value={formData.phonenumber}
// 								onChange={handleInputChange}
// 								className={Addressstyles.input}
// 							/>
// 						</div>
// 						<div className={Addressstyles.row}>
// 							<textarea
// 								name="address"
// 								cols="30"
// 								rows="5"
// 								placeholder="Address"
// 								value={formData.address}
// 								onChange={handleInputChange}
// 								className={Addressstyles.textarea}
// 							></textarea>
// 						</div>
// 						<div className={Addressstyles.row}>
// 							<input
// 								type="text"
// 								name="pincode"
// 								placeholder="Pincode"
// 								value={formData.pincode}
// 								onChange={handleInputChange}
// 								className={Addressstyles.input}
// 							/>
// 							<input
// 								type="text"
// 								name="country"
// 								placeholder="Country"
// 								value={formData.country}
// 								onChange={handleInputChange}
// 								readOnly
// 								className={Addressstyles.input}
// 							/>
// 						</div>
// 						<div className={Addressstyles.row}>
// 							<input
// 								type="text"
// 								name="state"
// 								placeholder="State"
// 								value={formData.state}
// 								onChange={handleInputChange}
// 								readOnly
// 								className={Addressstyles.input}
// 							/>
// 							<input
// 								type="text"
// 								name="city"
// 								placeholder="City"
// 								value={formData.city}
// 								onChange={handleInputChange}
// 								readOnly
// 								className={Addressstyles.input}
// 							/>
// 						</div>
// 						<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
// 							<button className={Addressstyles.Add_new_address_main_button} type="submit" disabled={submitting}>
// 								{submitting ? "Submitting..." : selectedAddress ? "Update" : "Add"}
// 							</button>
// 						</div>
// 					</form>
// 				</div>
// 				<ToastContainer />

// 		</>
// 	)
// }

// export default Profile


// import React, { useEffect, useState } from "react"
// import styles from "./profile.module.css"
// import Addressstyles from "../../components/addressForm/addressForm.module.css";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import { makeApi } from "../../api/callApi"

// const Profile = () => {
// 	const [activeTab, setActiveTab] = useState("address")
// 	const [shippingAddresses, setShippingAddresses] = useState([]);
// 	const [RecentOrderList, setRecentOrderList] = useState([]);
// 	const [selectedAddress, setSelectedAddress] = useState(null);
// 	const [loading, setLoading] = useState(false);
// 	const [showEditPopup, setShowEditPopup] = useState(false);
// 	const [submitting, setSubmitting] = useState(false);

// 	const [formData, setFormData] = useState({
// 		firstname: "",
// 		lastname: "",
// 		phonenumber: "",
// 		address: "",
// 		pincode: "",
// 		country: "",
// 		state: "",
// 		city: ""
// 	});

// 	const fetchShippingAddresses = async () => {
// 		try {
// 			setLoading(true);
// 			const response = await makeApi("/api/get-my-shiped-address", "GET");
// 			setShippingAddresses(response.data.shipedaddress);
// 			setLoading(false);
// 		} catch (error) {
// 			console.error("Error fetching shipping addresses: ", error);
// 			setLoading(false);
// 		}
// 	};

// 	const fetchOrders = async () => {
// 		try {
// 			setLoading(true);
// 			const response = await makeApi("/api/get-my-second-order", "GET");
// 			setRecentOrderList(response.data.secondorders);
// 		} catch (error) {
// 			console.log(error);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	// edit address
// 	const handleEditClick = (address) => {
// 		setSelectedAddress(address);
// 		setFormData({
// 			firstname: address.firstname,
// 			lastname: address.lastname,
// 			phonenumber: address.phonenumber,
// 			address: address.address,
// 			pincode: address.pincode,
// 			country: address.country,
// 			state: address.state,
// 			city: address.city
// 		});
// 		setShowEditPopup(true);
// 	};

// 	const handleInputChange = async (e) => {
// 		const { name, value } = e.target;
// 		if (name === "phonenumber" && value.length > 10) {
// 			return;
// 		}
// 		setFormData({
// 			...formData,
// 			[name]: value
// 		});
// 		if (name === "pincode" && value.length === 6) {
// 			await searchPin(value);
// 		}
// 	};

// 	const searchPin = async (pin) => {
// 		try {
// 			setLoading(true);
// 			const response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
// 			const data = response.data;
// 			if (data && data.length > 0 && data[0].Status === 'Success') {
// 				setFormData((prevFormData) => ({
// 					...prevFormData,
// 					country: data[0].PostOffice[0].Country,
// 					state: data[0].PostOffice[0].State,
// 					city: data[0].PostOffice[0].District
// 				}));
// 			} else {
// 				toast.error('Invalid pincode');
// 				setFormData((prevFormData) => ({
// 					...prevFormData,
// 					country: '',
// 					state: '',
// 					city: ''
// 				}));
// 			}
// 		} catch (error) {
// 			console.error("Error fetching data:", error);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		if (!formData.firstname) {
// 			toast.error('Please fill firstname');
// 			return;
// 		}
// 		if (!formData.lastname) {
// 			toast.error('Please fill lastname');
// 			return;
// 		}
// 		if (!formData.phonenumber) {
// 			toast.error('Please fill phonenumber');
// 			return;
// 		}
// 		if (!formData.address) {
// 			toast.error('Please fill address');
// 			return;
// 		}
// 		if (!formData.pincode) {
// 			toast.error('Please fill pincode');
// 			return;
// 		}
// 		if (!formData.country) {
// 			toast.error('Please fill country');
// 			return;
// 		}
// 		if (!formData.state) {
// 			toast.error('Please fill state');
// 			return;
// 		}
// 		try {
// 			setSubmitting(true);
// 			const apiEndpoint = selectedAddress ? `/api/update-shiped-address/${selectedAddress._id}` : "/api/create-shiped-address";
// 			const response = await makeApi(apiEndpoint, selectedAddress ? "PUT" : "POST", formData);
// 			toast.success(response.data.message);
// 			setShowEditPopup(false);
// 			fetchShippingAddresses();
// 			setFormData({
// 				firstname: "",
// 				lastname: "",
// 				phonenumber: "",
// 				address: "",
// 				pincode: "",
// 				country: "",
// 				state: "",
// 				city: ""
// 			});
// 		} catch (error) {
// 			console.error("Error submitting address:", error);
// 			toast.error(error.response?.data?.message || "Error submitting address");
// 		} finally {
// 			setSubmitting(false);
// 			setSelectedAddress(null);
// 		}
// 	};

// 	const handleDeleteClick = async (addressId) => {
// 		if (window.confirm("Are you sure you want to delete this address?")) {
// 			try {
// 				await makeApi(`/api/delete-shiped-address/${addressId}`, "DELETE");
// 				fetchShippingAddresses();
// 				toast.success("Address deleted successfully");
// 			} catch (error) {
// 				console.error("Error deleting address:", error);
// 				toast.error("Error deleting address");
// 			}
// 		}
// 	};

// 	useEffect(() => {
// 		fetchShippingAddresses();
// 		fetchOrders();
// 	}, []);

// 	const handleTabClick = (tab) => {
// 		setActiveTab(tab);
// 	};

// 	function formatDate(dateString) {
// 		const options = {
// 			day: '2-digit',
// 			month: '2-digit',
// 			year: 'numeric',
// 			hour: '2-digit',
// 			minute: '2-digit',
// 			hour12: true
// 		};
// 		const date = new Date(dateString);
// 		return new Intl.DateTimeFormat('en-GB', options).format(date);
// 	}

// 	return (
// 		<>
// 			<div className={styles.container}>
// 				<div className={styles.tabs}>
// 					<div
// 						className={`${styles.tab} ${activeTab === "address" ? styles.active : ""
// 							}`}
// 						onClick={() => handleTabClick("address")}
// 					>
// 						Address
// 					</div>
// 					<div
// 						className={`${styles.tab} ${activeTab === "orders" ? styles.active : ""
// 							}`}
// 						onClick={() => handleTabClick("orders")}
// 					>
// 						Orders
// 					</div>
// 				</div>

// 				{activeTab === "address" && (
// 					<>
// 						{shippingAddresses.map((address, i) => (
// 							<div className={styles.addressSection} key={i} >
// 								<div className={styles.address}>
// 									<input
// 										type="radio"
// 										checked
// 										readOnly
// 									/>
// 									{`${address.firstname} ${address.lastname}, ${address.phonenumber}, ${address.address}, ${address.pincode}, ${address.city}, ${address.state}, ${address.country}`}
// 								</div>
// 								<div className={styles.mutateAddress}>
// 									<div className={styles.phone}>9501987577</div>
// 									<div className={styles.buttons}>
// 										<button className={styles.editBtn} onClick={() => handleEditClick(address)}>Edit</button>
// 										<button className={styles.deleteBtn} onClick={() => handleDeleteClick(address._id)}>Delete</button>
// 									</div>
// 								</div>
// 							</div>
// 						))}
// 						<button className={styles.addNewAddress} onClick={() => setShowEditPopup(true)}>+</button>
// 					</>
// 				)}

// 				{activeTab === "orders" && (
// 					<div className={styles.ordersSection}>
// 						<div className={styles.filterOrders}>
// 							<p>Past 3 Months</p>
// 							<p>
// 								Filter <span>→</span>
// 							</p>
// 						</div>
// 						<div className={styles.ordersList}>
// 							{RecentOrderList.map((order, i) => (
// 								<div key={i} className={styles.orderContainer}>
// 									<div className={styles.orderHeader}>
// 										<p>Order Date: {formatDate(order.createdAt)}</p>
// 										<p>Order ID: {order._id}</p>
// 									</div>
									
// 									<div className={styles.orderItems}>
// 										{order.orderItems.map((item, index) => (
// 											<div key={index} className={styles.orderItem}>
// 												{/* <img 
// 													src={item.product.thumbnail || item.product.image[0]} 
// 													alt={item.product.name} 
// 													className={styles.productImage}
// 												/> */}
// 												<div className={styles.productDetails}>
// 													<h4>{item.product.name}</h4>
// 													<p>Quantity: {item.quantity}</p>
// 													<p>Price: ₹{item.singleProductPrice}</p>
// 													<p>Total: ₹{item.totalPrice}</p>
// 												</div>
// 											</div>
// 										))}
// 									</div>
									
// 									<div className={styles.orderSummary}>
// 										<div className={styles.summaryRow}>
// 											<p>Subtotal:</p>
// 											<p>₹{order.TotalProductPrice}</p>
// 										</div>
// 										<div className={styles.summaryRow}>
// 											<p>Tax:</p>
// 											<p>₹{(order.taxPrice * order.TotalProductPrice).toFixed(2)}</p>
// 										</div>
// 										<div className={styles.summaryRow}>
// 											<p>Shipping:</p>
// 											<p>₹{order.shippingPrice}</p>
// 										</div>
// 										<div className={styles.summaryRow}>
// 											<p><strong>Total:</strong></p>
// 											<p><strong>₹{order.totalPrice}</strong></p>
// 										</div>
// 									</div>
									
// 									<div className={styles.orderFooter}>
// 										<p>Payment Method: {order.paymentMethod}</p>
// 										<p>Status: {order.status}</p>
// 										{order.refundStatus !== "Not Requested" && (
// 											<p>Refund Status: {order.refundStatus}</p>
// 										)}
// 									</div>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				)}
// 			</div>

// 			<div className={`${showEditPopup ? Addressstyles.show_Address_popup : Addressstyles.hide_Address_popup}`}>
// 				<form style={{ maxWidth: "500px" }} className={`${Addressstyles.form}`} onSubmit={handleSubmit}>
// 					<div className={Addressstyles.close_button_for_address_popup} onClick={() => setShowEditPopup(false)}>x</div>
// 					<div className={Addressstyles.row}>
// 						<input
// 							type="text"
// 							name="firstname"
// 							placeholder="firstname"
// 							value={formData.firstname}
// 							onChange={handleInputChange}
// 							className={Addressstyles.input}
// 						/>
// 						<input
// 							type="text"
// 							name="lastname"
// 							placeholder="lastname"
// 							value={formData.lastname}
// 							onChange={handleInputChange}
// 							className={Addressstyles.input}
// 						/>
// 					</div>
// 					<div className={Addressstyles.row}>
// 						<input
// 							type="number"
// 							name="phonenumber"
// 							placeholder="Phone Number"
// 							value={formData.phonenumber}
// 							onChange={handleInputChange}
// 							className={Addressstyles.input}
// 						/>
// 					</div>
// 					<div className={Addressstyles.row}>
// 						<textarea
// 							name="address"
// 							cols="30"
// 							rows="5"
// 							placeholder="Address"
// 							value={formData.address}
// 							onChange={handleInputChange}
// 							className={Addressstyles.textarea}
// 						></textarea>
// 					</div>
// 					<div className={Addressstyles.row}>
// 						<input
// 							type="text"
// 							name="pincode"
// 							placeholder="Pincode"
// 							value={formData.pincode}
// 							onChange={handleInputChange}
// 							className={Addressstyles.input}
// 						/>
// 						<input
// 							type="text"
// 							name="country"
// 							placeholder="Country"
// 							value={formData.country}
// 							onChange={handleInputChange}
// 							readOnly
// 							className={Addressstyles.input}
// 						/>
// 					</div>
// 					<div className={Addressstyles.row}>
// 						<input
// 							type="text"
// 							name="state"
// 							placeholder="State"
// 							value={formData.state}
// 							onChange={handleInputChange}
// 							readOnly
// 							className={Addressstyles.input}
// 						/>
// 						<input
// 							type="text"
// 							name="city"
// 							placeholder="City"
// 							value={formData.city}
// 							onChange={handleInputChange}
// 							readOnly
// 							className={Addressstyles.input}
// 						/>
// 					</div>
// 					<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
// 						<button className={Addressstyles.Add_new_address_main_button} type="submit" disabled={submitting}>
// 							{submitting ? "Submitting..." : selectedAddress ? "Update" : "Add"}
// 						</button>
// 					</div>
// 				</form>
// 			</div>
// 			<ToastContainer />
// 		</>
// 	)
// }

// export default Profile


import React, { useEffect, useState } from "react"
import styles from "./profile.module.css"
import Addressstyles from "../../components/addressForm/addressForm.module.css";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";


import { makeApi } from "../../api/callApi"


const orders = [
	{
		name: "Gold Chai",
		data: "27 JULY 2024",
		price: "180",
	},
	{
		name: "Masala Chai",
		data: "27 JULY 2024",
		price: "150",
	},
	{
		name: "Gold Chai",
		data: "27 JULY 2024",
		price: "180",
	},
]

const Profile = () => {
	const [activeTab, setActiveTab] = useState("address")
	const [shippingAddresses, setShippingAddresses] = useState([]);
	const [RecentOrderList, setRecentOrderList] = useState([]);
	console.log(RecentOrderList)
	const [selectedAddress, setSelectedAddress] = useState(null);
	const [loading, setLoading] = useState(false);
	const [showEditPopup, setShowEditPopup] = useState(false);
	const [submitting, setSubmitting] = useState(false);


	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		phonenumber: "",
		address: "",
		pincode: "",
		country: "",
		state: "",
		city: ""
	});




	const fetchShippingAddresses = async () => {
		try {
			setLoading(true);
			const response = await makeApi("/api/get-my-shiped-address", "GET");
			setShippingAddresses(response.data.shipedaddress);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching shipping addresses: ", error);
			setLoading(false);
		}
	};
	const fetchOrders = async () => {
		try {
			setLoading(true);

			const response = await makeApi("/api/get-my-second-order", "GET");
			setRecentOrderList(response.data.secondorders);
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};

	// edit address
	const handleEditClick = (address) => {
		setSelectedAddress(address);
		setFormData({
			firstname: address.firstname,
			lastname: address.lastname,
			phonenumber: address.phonenumber,
			address: address.address,
			pincode: address.pincode,
			country: address.country,
			state: address.state,
			city: address.city
		});
		setShowEditPopup(true);
	};
	const handleInputChange = async (e) => {
		const { name, value } = e.target;
		if (name === "phonenumber" && value.length > 10) {
			return;
		}
		setFormData({
			...formData,
			[name]: value
		});
		if (name === "pincode" && value.length === 6) {
			await searchPin(value);
		}
	};
	const searchPin = async (pin) => {
		try {
			setLoading(true);
			const response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
			const data = response.data;
			if (data && data.length > 0 && data[0].Status === 'Success') {
				setFormData((prevFormData) => ({
					...prevFormData,
					country: data[0].PostOffice[0].Country,
					state: data[0].PostOffice[0].State,
					city: data[0].PostOffice[0].District
				}));
			} else {
				toast.error('Invalid pincode');
				setFormData((prevFormData) => ({
					...prevFormData,
					country: '',
					state: '',
					city: ''
				}));
			}
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!formData.firstname) {
			toast.error('Please fill firstname');
			return;
		}
		if (!formData.lastname) {
			toast.error('Please fill lastname');
			return;
		}
		if (!formData.phonenumber) {
			toast.error('Please fill phonenumber');
			return;
		}
		if (!formData.address) {
			toast.error('Please fill address');
			return;
		}
		if (!formData.pincode) {
			toast.error('Please fill pincode');
			return;
		}
		if (!formData.country) {
			toast.error('Please fill country');
			return;
		}
		if (!formData.state) {
			toast.error('Please fill state');
			return;
		}
		try {
			setSubmitting(true);
			const apiEndpoint = selectedAddress ? `/api/update-shiped-address/${selectedAddress._id}` : "/api/create-shiped-address";
			const response = await makeApi(apiEndpoint, selectedAddress ? "PUT" : "POST", formData);
			toast.success(response.data.message);
			setShowEditPopup(false);
			fetchShippingAddresses();
			setFormData({
				firstname: "",
				lastname: "",
				phonenumber: "",
				address: "",
				pincode: "",
				country: "",
				state: "",
				city: ""
			});
		} catch (error) {
			console.error("Error submitting address:", error);
			toast.error(error.response?.data?.message || "Error submitting address");
		} finally {
			setSubmitting(false);
			setSelectedAddress(null);
		}
	};
	const handleDeleteClick = async (addressId) => {
		if (window.confirm("Are you sure you want to delete this address?")) {
		  try {
			await makeApi(`/api/delete-shiped-address/${addressId}`, "DELETE");
			fetchShippingAddresses();
			toast.success("Address deleted successfully");
		  } catch (error) {
			console.error("Error deleting address:", error);
			toast.error("Error deleting address");
		  }
		}
	  };



	useEffect(() => {
		fetchShippingAddresses();
		fetchOrders()
	}, []);

	const handleTabClick = (tab) => {
		setActiveTab(tab)
	}
	function formatDate(dateString) {
		const options = {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			hour12: true
		};
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('en-GB', options).format(date);
	}


	return (
		<>
			<div className={styles.container}>
				<div className={styles.tabs}>
					<div
						className={`${styles.tab} ${activeTab === "address" ? styles.active : ""
							}`}
						onClick={() => handleTabClick("address")}
					>
						Address
					</div>
					<div
						className={`${styles.tab} ${activeTab === "orders" ? styles.active : ""
							}`}
						onClick={() => handleTabClick("orders")}
					>
						Orders
					</div>
				</div>

				{activeTab === "address" && (
					<>
						{shippingAddresses.map((address, i) => (

							<div className={styles.addressSection} key={i} >
								<div className={styles.address}>
									<input
										type="radio"
										checked
										readOnly
									/>

									{`${address.firstname} ${address.lastname}, ${address.phonenumber}, ${address.address}, ${address.pincode}, ${address.city}, ${address.state}, ${address.country}`}

								</div>
								<div className={styles.mutateAddress}>
									<div className={styles.phone}>9501987577</div>
									<div className={styles.buttons}>
										<button className={styles.editBtn} onClick={() => handleEditClick(address)} >Edit</button>
										<button className={styles.deleteBtn} onClick={() => handleDeleteClick(address._id)} >Delete</button>
									</div>{" "}
								</div>
							</div>
						))}
						<button className={styles.addNewAddress} onClick={() => setShowEditPopup(true)} >+</button>

					</>
				)}

				{activeTab === "orders" && (
					<div className={styles.ordersSection}>
					
						<div className={styles.ordersList}>
							{RecentOrderList.map((order, i) => (
								<>
									<p>  {formatDate(order.createdAt)}</p>
									<div key={i} className={styles.MyOrder_order_container} style={{ display: "flex", flexDirection: "column", gap: "10px" }} onClick={() => { }} >
										{order.orderItems.map((item, i) => (
											<div key={i} >
												<img className="myorder-img-product" style={{ maxWidth: "50px" }} loading="lazy" src={item?.product?.thumbnail} alt={item?.product?.name} />
												{/* <p>{item.product.name},<span style={{ fontSize: "12px" }} > {item.size.size} {item?.size?.sizetype}</span> </p> */}
												<p><span style={{ fontSize: "12px" }} > {item.singleProductPrice}x{item.quantity}=₹{item?.totalPrice}</span> </p>
											</div>
										))
										}
										<div>
										
											<p>{order?.status}</p>
											<p>{order?.paymentMethod}</p>
											<p>₹{order?.totalPrice}</p>
										</div>
									</div>
								</>
							))}
						</div>
					</div>
				)}

			</div>
				<div className={`${showEditPopup ? Addressstyles.show_Address_popup : Addressstyles.hide_Address_popup}`}  >
					<form style={{maxWidth:"500px"}} className={`${Addressstyles.form}`} onSubmit={handleSubmit}>
						<div className={Addressstyles.close_button_for_address_popup} onClick={() => setShowEditPopup(false)}>x</div>
						<div className={Addressstyles.row}>
							<input
								type="text"
								name="firstname"
								placeholder="firstname"
								value={formData.firstname}
								onChange={handleInputChange}
								className={Addressstyles.input}
							/>
							<input
								type="text"
								name="lastname"
								placeholder="lastname"
								value={formData.lastname}
								onChange={handleInputChange}
								className={Addressstyles.input}
							/>
						</div>
						<div className={Addressstyles.row}>
							<input
								type="number"
								name="phonenumber"
								placeholder="Phone Number"
								value={formData.phonenumber}
								onChange={handleInputChange}
								className={Addressstyles.input}
							/>
						</div>
						<div className={Addressstyles.row}>
							<textarea
								name="address"
								cols="30"
								rows="5"
								placeholder="Address"
								value={formData.address}
								onChange={handleInputChange}
								className={Addressstyles.textarea}
							></textarea>
						</div>
						<div className={Addressstyles.row}>
							<input
								type="text"
								name="pincode"
								placeholder="Pincode"
								value={formData.pincode}
								onChange={handleInputChange}
								className={Addressstyles.input}
							/>
							<input
								type="text"
								name="country"
								placeholder="Country"
								value={formData.country}
								onChange={handleInputChange}
								readOnly
								className={Addressstyles.input}
							/>
						</div>
						<div className={Addressstyles.row}>
							<input
								type="text"
								name="state"
								placeholder="State"
								value={formData.state}
								onChange={handleInputChange}
								readOnly
								className={Addressstyles.input}
							/>
							<input
								type="text"
								name="city"
								placeholder="City"
								value={formData.city}
								onChange={handleInputChange}
								readOnly
								className={Addressstyles.input}
							/>
						</div>
						<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
							<button className={Addressstyles.Add_new_address_main_button} type="submit" disabled={submitting}>
								{submitting ? "Submitting..." : selectedAddress ? "Update" : "Add"}
							</button>
						</div>
					</form>
				</div>
				<ToastContainer />

		</>
	)
}

export default Profile


// import React from "react";
// import styles from "./profile.module.css";
// import { Link } from "react-router-dom";

// const Profile = () => {
//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>My Account</h1>
      
//       <div className={styles.menu}>
//         <Link to="/address" className={styles.menuItem}>
//           <h2>My Addresses</h2>
//           <p>Manage your shipping addresses</p>
//         </Link>
        
//         <Link to="/orders" className={styles.menuItem}>
//           <h2>My Orders</h2>
//           <p>View your order history</p>
//         </Link>
        
//         {/* Add more menu items as needed */}
//       </div>
//     </div>
//   );
// };

// export default Profile;