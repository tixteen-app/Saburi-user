import { useState } from "react";
import styles from "./getInTouch.module.css"
import { ToastContainer, toast } from "react-toastify";
import {makeApi} from "../../../api/callApi.tsx"

const GetInTouch = () => {
	const [loading, setLoading] = useState(false);
    const [Data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        message: "",
        phonennumber: "",
    });

    const handelChange = (event) => {
        const { name, value } = event.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const validatePhoneNumber = (phonennumber) => {
        const phonePattern = /^\d{10}$/;
        return phonePattern.test(phonennumber);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!Data.firstname) {
            toast.error("Please fill in the firstname");
            return;
        }
        if (!Data.lastname) {
            toast.error("Please fill in the lastname");
            return;
        }
        if (!Data.email) {
            toast.error("Please fill in the email");
            return;
        }
        if (!validateEmail(Data.email)) {
            toast.error("Please enter a valid email");
            return;
        }
        if (!Data.phonennumber) {
            toast.error("Please fill in the phonennumber");
            return;
        }
        if (!validatePhoneNumber(Data.phonennumber)) {
            toast.error("Please enter a valid 10-digit phone number");
            return;
        }
        if (!Data.message) {
            toast.error("Please fill in the message");
            return;
        }

        try {
			setLoading(true);
			console.log("------")
            const response = await makeApi("/api/create-message", "POST", Data);
            toast.success("message sent", {
                onClose: () => {
                    setData({
                        firstname: "",
                        lastname: "",
                        email: "",
                        message: "",
                        phonennumber: "",
                    });
                },
            });
            toast.info("Thank you for sharing your thoughts with us");
        } catch (error) {
            toast.error(error.response.data.message || "Error sending data");
            console.error("Error sending data:", error);
        } finally {
            setLoading(false);
        }
    };
	return (
		<>
            <ToastContainer autoClose={2000} position="top-center" />

		<div className={styles.container}>
			<div className={styles.formContainer}>
				<h2>Get in touch</h2>
				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.inputGroup}>
						<div className={styles.inputField}>
							<label
								className={styles.label}
								htmlFor="name"
							>
								Name
							</label>
							<input
								 type="text"
								 placeholder="First Name"
								 onChange={handelChange}
								 name="firstname"
								 value={Data.firstname}
								className={styles.input}
							/>
						</div>
						<div className={styles.inputField}>
							<label
								className={styles.label}
								htmlFor="surname"
							>
								Surname
							</label>
							<input
								  type="text"
								  placeholder="Last Name"
								  onChange={handelChange}
								  name="lastname"
								  value={Data.lastname}
								className={styles.input}
							/>
						</div>
					</div>
					<div className={styles.inputField}>
						<label
							className={styles.label}
							htmlFor="mail"
						>
							Mail
						</label>
						<input
						 type="email"
						 placeholder="Email Address"
						 onChange={handelChange}
						 name="email"
						 value={Data.email}
							className={styles.input}
						/>
					</div>
					<div className={styles.inputField}>
						<label
							className={styles.label}
							htmlFor="mail"
						>
							Phone
						</label>
						<input
							type="text"
							placeholder="Phone Number"
							onChange={handelChange}
							name="phonennumber"
							value={Data.phonennumber}
							className={styles.input}
						/>
					</div>
					{/* <div className={styles.inputField}>
						<label
							className={styles.label}
							htmlFor="address"
						>
							Address
						</label>
						<input
							type="text"
							id="address"
							name="address"
							className={styles.input}
						/>
					</div> */}
					<div className={styles.inputField}>
						<label
							className={styles.label}
							htmlFor="description"
						>
							Description
						</label>
						<textarea
							  placeholder="Description"
							  onChange={handelChange}
							  name="message"
							  value={Data.message}
							className={styles.textarea}
						/>
					</div>
					<button
						type="submit"
						className={styles.button}
						disabled={loading}
						onClick={handleSubmit}

					>
						Send Message
					</button>
				</form>
			</div>
			<h1 className={styles.reachtous}>Reach To Us</h1>
		</div>
		</>

	)
}

export default GetInTouch
