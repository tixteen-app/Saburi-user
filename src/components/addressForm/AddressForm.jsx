
// import styles from "./addressForm.module.css";
// import { makeApi } from "../../api/callApi";
// import { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import axios from "axios";
// import Cookies from 'js-cookie';
// import PrimaryLoader from "../../utils/loaders/PrimaryLoader";

// const AddressForm = () => {
//   const [shippingAddresses, setShippingAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [showEditPopup, setShowEditPopup] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
// const [addressToDelete, setAddressToDelete] = useState(null);

//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     phonenumber: "",
//     address: "",
//     pincode: "",
//     country: "",
//     state: "",
//     city: ""
//   });
  

//   const fetchShippingAddresses = async () => {
//     try {
//       setLoading(true);
//       const response = await makeApi("/api/get-my-shiped-address", "GET");
//       setShippingAddresses(response.data.shipedaddress);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching shipping addresses: ", error);
//       setLoading(false);
//     }
//   };

//   const handleInputChange = async (e) => {
//     const { name, value } = e.target;
//     if (name === "phonenumber" && value.length > 10) {
//       return;
//     }
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//     if (name === "pincode" && value.length === 6) {
//       await searchPin(value);
//     }
//   };

//   const searchPin = async (pin) => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`https://api.postalpincode.in/pincode/${pin}`);
//       const data = response.data;
//       if (data && data.length > 0 && data[0].Status === 'Success') {
//         setFormData((prevFormData) => ({
//           ...prevFormData,
//           country: data[0].PostOffice[0].Country,
//           state: data[0].PostOffice[0].State,
//           city: data[0].PostOffice[0].District
//         }));
//       } else {
//         toast.error('Invalid pincode');
//         setFormData((prevFormData) => ({
//           ...prevFormData,
//           country: '',
//           state: '',
//           city: ''
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.firstname) {
//       toast.error('Please fill firstname');
//       return;
//     }
//     if (!formData.lastname) {
//       toast.error('Please fill lastname');
//       return;
//     }
//     if (!formData.phonenumber) {
//       toast.error('Please fill phonenumber');
//       return;
//     }
//     if (!formData.address) {
//       toast.error('Please fill address');
//       return;
//     }
//     if (!formData.pincode) {
//       toast.error('Please fill pincode');
//       return;
//     }
//     if (!formData.country) {
//       toast.error('Please fill country');
//       return;
//     }
//     if (!formData.state) {
//       toast.error('Please fill state');
//       return;
//     }
//     try {
//       setSubmitting(true);
//       const apiEndpoint = selectedAddress ? `/api/update-shiped-address/${selectedAddress._id}` : "/api/create-shiped-address";
//       const response = await makeApi(apiEndpoint, selectedAddress ? "PUT" : "POST", formData);
//       toast.success(response.data.message);
//       setShowEditPopup(false);
//       fetchShippingAddresses();
//       setFormData({
//         firstname: "",
//         lastname: "",
//         phonenumber: "",
//         address: "",
//         pincode: "",
//         country: "",
//         state: "",
//         city: ""
//       });
//     } catch (error) {
//       console.error("Error submitting address:", error);
//       toast.error(error.response?.data?.message || "Error submitting address");
//     } finally {
//       setSubmitting(false);
//       setSelectedAddress(null);
//     }
//   };

//   const handleEditClick = (address) => {
//     setSelectedAddress(address);
//     setFormData({
//       firstname: address.firstname,
//       lastname: address.lastname,
//       phonenumber: address.phonenumber,
//       address: address.address,
//       pincode: address.pincode,
//       country: address.country,
//       state: address.state,
//       city: address.city
//     });
//     setShowEditPopup(true);
//   };

//   const handleDeleteClick = async (addressId) => {
//     if (window.confirm("Are you sure you want to delete this address?")) {
//       try {
//         await makeApi(`/api/delete-shiped-address/${addressId}`, "DELETE");
//         fetchShippingAddresses();
//         toast.success("Address deleted successfully");
//       } catch (error) {
//         console.error("Error deleting address:", error);
//         toast.error("Error deleting address");
//       }
//     }
//   };

  // const handleSelectAddress = (address) => {
  //   setSelectedAddress(address);
  //   Cookies.set('selectedAddress', address._id, { expires: 1 });
  //   // toast.info(`Selected address: ${address.address}`);
  // };

//   useEffect(() => {
//     fetchShippingAddresses();
//   }, []);

//   return (
//     <>
//       {
//         loading ? <div style={{ display: "flex", justifyContent: "center" }} > <PrimaryLoader /> </div> : <>
//           <div className={styles.container}>
//             <ToastContainer />
//             <div className={styles.addressForm}>
//               <h3>Address:</h3>
//               <div>
//                 {shippingAddresses.map((address) => (
//                   <div
//                     className={`${styles.address} ${styles.address_list_main_div} ${selectedAddress?._id === address._id ? styles.selected : ""}`}
//                     key={address._id}
//                     onClick={() => handleSelectAddress(address)}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedAddress?._id === address._id}
//                       onChange={() => handleSelectAddress(address)}
//                       className={styles.checkbox}
//                     />
//                     <div className={styles.address_list}>
//                       {`${address.firstname} ${address.lastname}, ${address.phonenumber}, ${address.address}, ${address.pincode}, ${address.city}, ${address.state}, ${address.country}`}
//                     </div>
//                     <div className={styles.actions_button_for_address}>
//                       <span onClick={() => handleEditClick(address)} className={styles.editIcon}>✎</span>
//                       <span onClick={() => handleDeleteClick(address._id)} className={styles.deleteIcon}>🗑️</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className={styles.Add_new_address_button}>
//                 <div className={styles.Add_new_address_main_button} onClick={() => setShowEditPopup(true)}>
//                   Add New
//                 </div>
//               </div>
//               <div className={`${showEditPopup ? styles.show_Address_popup : styles.hide_Address_popup}`}>
//                 <form className={`${styles.form}`} onSubmit={handleSubmit}>
//                   <div className={styles.close_button_for_address_popup} onClick={() => setShowEditPopup(false)}>x</div>
//                   <div className={styles.row}>
//                     <input
//                       type="text"
//                       name="firstname"
//                       placeholder="firstname"
//                       value={formData.firstname}
//                       onChange={handleInputChange}
//                       className={styles.input}
//                     />
//                     <input
//                       type="text"
//                       name="lastname"
//                       placeholder="lastname"
//                       value={formData.lastname}
//                       onChange={handleInputChange}
//                       className={styles.input}
//                     />
//                   </div>
//                   <div className={styles.row}>
//                     <input
//                       type="number"
//                       name="phonenumber"
//                       placeholder="Phone Number"
//                       value={formData.phonenumber}
//                       onChange={handleInputChange}
//                       className={styles.input}
//                     />
//                   </div>
//                   <div className={styles.row}>
//                     <textarea
//                       name="address"
//                       cols="30"
//                       rows="5"
//                       placeholder="Address"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       className={styles.textarea}
//                     ></textarea>
//                   </div>
//                   <div className={styles.row}>
//                     <input
//                       type="text"
//                       name="pincode"
//                       placeholder="Pincode"
//                       value={formData.pincode}
//                       onChange={handleInputChange}
//                       className={styles.input}
//                     />
//                     <input
//                       type="text"
//                       name="country"
//                       placeholder="Country"
//                       value={formData.country}
//                       onChange={handleInputChange}
//                       readOnly
//                       className={styles.input}
//                     />
//                   </div>
//                   <div className={styles.row}>
//                     <input
//                       type="text"
//                       name="state"
//                       placeholder="State"
//                       value={formData.state}
//                       onChange={handleInputChange}
//                       readOnly
//                       className={styles.input}
//                     />
//                     <input
//                       type="text"
//                       name="city"
//                       placeholder="City"
//                       value={formData.city}
//                       onChange={handleInputChange}
//                       readOnly
//                       className={styles.input}
//                     />
//                   </div>
//                   <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
//                     <button className={styles.Add_new_address_main_button} type="submit" disabled={submitting}>
//                       {
//                         loading ? <div style={{ display: "flex", justifyContent: "center" }} > <PrimaryLoader /> </div> : <>
//                           {submitting ? "Submitting..." : selectedAddress ? "Update" : "Add"}
//                         </>
//                       }

//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </>
//       }

//     </>
//   );
// };

// export default AddressForm;

import styles from "./addressForm.module.css";
import { makeApi } from "../../api/callApi";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import PrimaryLoader from "../../utils/loaders/PrimaryLoader";
import Cookies from 'js-cookie';


const AddressForm = () => {
  const [shippingAddresses, setShippingAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [featchingloading, setFeatchingloading] = useState(false);
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
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);

  const fetchShippingAddresses = async () => {
    try {
      setFeatchingloading(true);
      const response = await makeApi("/api/get-my-shiped-address", "GET");
      setShippingAddresses(response.data.shipedaddress);
    } catch (error) {
      console.error("Error fetching shipping addresses: ", error);
    } finally {
      setFeatchingloading(false);
    }
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
    if (!formData.firstname || !formData.lastname || !formData.phonenumber || !formData.address || !formData.pincode || !formData.country || !formData.state) {
      toast.error('Please fill all fields');
      return;
    }
    try {
      setSubmitting(true);
      const apiEndpoint = selectedAddress ? `/api/update-shiped-address/${selectedAddress._id}` : "/api/create-shiped-address";
      const response = await makeApi(apiEndpoint, selectedAddress ? "PUT" : "POST", formData);
      toast.success(response.data.message);
      setShowEditPopup(false);
      fetchShippingAddresses();
      resetForm();
    } catch (error) {
      console.error("Error submitting address:", error);
      toast.error(error.response?.data?.message || "Error submitting address");
    } finally {
      setSubmitting(false);
      setSelectedAddress(null);
    }
  };

  const resetForm = () => {
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
  };

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

  const handleDeleteClick = (addressId) => {
    setAddressToDelete(addressId);
    setShowDeleteConfirm(true);
  };

  const deleteAddress = async () => {
    try {
      await makeApi(`/api/delete-shiped-address/${addressToDelete}`, "DELETE");
      fetchShippingAddresses();
      toast.success("Address deleted successfully");
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Error deleting address");
    } finally {
      setShowDeleteConfirm(false);
      setAddressToDelete(null);
    }
  };

  useEffect(() => {
    fetchShippingAddresses();
    setSelectedAddress(null);
  }, []);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    Cookies.set('selectedAddress', address._id, { expires: 1 });
    // toast.info(`Selected address: ${address.address}`);
  };

  return (
    <>
      {
        featchingloading ? (
          <div style={{ display: "flex", justifyContent: "center" }} >
            <PrimaryLoader />
          </div>
        ) : (
          <div className={styles.container}>
            <ToastContainer />
            <div className={styles.addressForm}>
              <h3>Address:</h3>
              <div>
                {shippingAddresses.map((address) => (
                  <div
                    className={`${styles.address} ${styles.address_list_main_div} ${selectedAddress?._id === address._id ? styles.selected : ""}`}
                    key={address._id}
                    onClick={() => handleSelectAddress(address)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAddress?._id === address._id}
                      onChange={() => handleSelectAddress(address)}
                      className={styles.checkbox}
                    />
                    <div className={styles.address_list}>
                      {`${address.firstname} ${address.lastname}, ${address.phonenumber}, ${address.address}, ${address.pincode}, ${address.city}, ${address.state}, ${address.country}`}
                    </div>
                    <div className={styles.actions_button_for_address}>
                      <span onClick={() => handleEditClick(address)} className={styles.editIcon}>✎</span>
                      <span onClick={() => handleDeleteClick(address._id)} className={styles.deleteIcon}>🗑️</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.Add_new_address_button}>
                <div className={styles.Add_new_address_main_button} onClick={() => setShowEditPopup(true)}>
                  Add New
                </div>
              </div>
              <div className={`${showEditPopup ? styles.show_Address_popup : styles.hide_Address_popup}`}>
                <form className={`${styles.form}`} onSubmit={handleSubmit}>
                  <div className={styles.close_button_for_address_popup} onClick={() => setShowEditPopup(false)}>x</div>
                  <div className={styles.row}>
                    <input
                      type="text"
                      name="firstname"
                      placeholder="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                    <input
                      type="text"
                      name="lastname"
                      placeholder="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.row}>
                    <input
                      type="number"
                      name="phonenumber"
                      placeholder="Phone Number"
                      value={formData.phonenumber}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.row}>
                    <textarea
                      name="address"
                      cols="30"
                      rows="5"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={styles.textarea}
                    ></textarea>
                  </div>
                  <div className={styles.row}>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={styles.input}
                    />
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleInputChange}
                      readOnly
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.row}>
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      readOnly
                      className={styles.input}
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      readOnly
                      className={styles.input}
                    />
                  </div>
                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <button className={styles.Add_new_address_main_button} type="submit" disabled={submitting}>
                      {
                        loading ? <div style={{ display: "flex", justifyContent: "center" }}><PrimaryLoader /></div> : (
                          <>
                            {submitting ? "Submitting..." : selectedAddress ? "Update" : "Add"}
                          </>
                        )
                      }
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {showDeleteConfirm && (
              <div className={styles.confirmDeletePopup}>
                <div className={styles.popupContent}>
                  <h4>Confirm Delete</h4>
                  <p>Are you sure you want to delete this address?</p>
                  <div className={styles.popupButtons} >
                  <button onClick={deleteAddress} className={styles.confirmButton} >Yes, Delete</button>
                  <button className={styles.cancelButton} onClick={() => {
                    setShowDeleteConfirm(false);
                    setAddressToDelete(null);
                  }}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      }
    </>
  );
};

export default AddressForm;
