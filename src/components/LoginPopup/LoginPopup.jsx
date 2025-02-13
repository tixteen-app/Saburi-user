// // LoginPopup.jsx
// import React, { useState } from "react";
// import styles from "./loginPopup.module.css";
// import { assets } from "../../assets/assets";
// import { makeApi } from "../../api/callApi.tsx";
// import PrimaryLoader from "../../utils/loaders/PrimaryLoader.jsx";
// import Cookies from "js-cookie";
// import { auth, provider } from "./config.js";
// import { signInWithPopup } from "firebase/auth";

// const LoginPopup = ({ setLoginPopup }) => {
// 	const [userEmail, setUserEmail] = useState("");
// 	const [enterdOTP, setEnterdOTP] = useState();
// 	const [otpSended, setOtpSended] = useState(false);
// 	const [loading, setLoading] = useState(false);

// 	// Sending OTP to user's email
// 	const sendOTP = async () => {
// 		try {
// 			setLoading(true);
// 			const response = await makeApi("/api/register-otp", "POST", { email: userEmail });
// 			setOtpSended(true);
// 			console.log(response.data);
// 		} catch (error) {
// 			console.log(error.data);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	// Verifying the OTP entered by the user
// 	const checkOTP = async () => {
// 		try {
// 			setLoading(true);
// 			const response = await makeApi("/api/check-otp", "POST", { email: userEmail, OTP: enterdOTP });
// 			console.log(response.data);
// 			RegisterUser();
// 		} catch (error) {
// 			console.log(error.data);
// 		} finally {
// 			setLoading(false);
// 		}
// 	};

// 	// Register the user after OTP verification
// 	const RegisterUser = async () => {
// 		try {
// 			setLoading(true);
// 			const response = await makeApi("/api/register-user", "POST", { email: userEmail });
// 			localStorage.setItem("token", response.data.token);
// 			Cookies.set("register", true);
// 			setLoginPopup(false);
// 		} catch (error) {
// 			console.log(error.data);
// 		} finally {
// 			setLoading(false);
// 			window.location.reload();
// 		}
// 	};

// 	// Handle Google Sign-In
// 	const handelClick = async () => {
// 		try {
// 			const data = await signInWithPopup(auth, provider);
// 			setUserEmail(data.user.email);
// 			const response = await makeApi("/api/register-user", "POST", { email: data.user.email });
// 			localStorage.setItem("token", response.data.token);
// 			Cookies.set("register", true);
// 		} catch (error) {
// 			if (error.code === 'auth/cancelled-popup-request') {
// 				console.log('User canceled the sign-in process');
// 			} else {
// 				console.error("Error during Google Sign-in:", error);
// 			}
// 		} finally {
// 			setLoading(false);
// 			window.location.reload();
// 		}
// 	};

// 	return (
// 		<div className={styles.loginPopupContainer}>
// 			<div className={styles.loginPopup}>
// 				<p className={styles.closePopup} onClick={() => setLoginPopup(false)}>
// 					X
// 				</p>
// 				<div className={styles.leftLoginPopup}>
// 					<img src={assets.logo} alt="Saburi logo" />
// 					<h2>Welcome to Saburi</h2>
// 					<p>
// 						We're thrilled to have you join us. Sign in to discover our premium
// 						products and start your journey to exceptional quality and taste.
// 					</p>
// 					<ul>
// 						<li>
// 							<img src={assets.star_icon} alt="stars" />
// 							Best Taste
// 						</li>
// 						<li>
// 							<img src={assets.star_icon} alt="stars" />
// 							Rich Heritage
// 						</li>
// 						<li>
// 							<img src={assets.star_icon} alt="stars" />
// 							Vast Varieties
// 						</li>
// 					</ul>
// 				</div>
// 				<div className={styles.rightLoginPopup}>
// 					<div className={styles.innerRightLoginpopup}>
// 						<h2>SIGN IN</h2>
// 						<div className={styles.form}>
// 							{otpSended ? (
// 								<>
// 									<div className={styles.phoneNo}>
// 										<label htmlFor="">Enter OTP</label>
// 										<div style={{ marginBottom: "10px" }}>
// 											<input
// 												type="text"
// 												onChange={(e) => setEnterdOTP(e.target.value)}
// 											/>
// 										</div>
// 										{loading ? (
// 											<PrimaryLoader />
// 										) : (
// 											<button onClick={checkOTP}>Sign In</button>
// 										)}
// 									</div>
// 								</>
// 							) : (
// 								<>
// 									<div className={styles.phoneNo} style={{ marginBottom: "10px" }}>
// 										<label htmlFor="">Email</label>
// 										<input type="email" onChange={(e) => setUserEmail(e.target.value)} />
// 									</div>
// 									{loading ? (
// 										<div style={{ display: "flex", justifyContent: "center" }}>
// 											<PrimaryLoader />
// 										</div>
// 									) : (
// 										<button onClick={sendOTP}>Send OTP</button>
// 									)}
// 									<div className={styles.termsConditions}>
// 										{/* <input type="checkbox" />
//                       <div>
//                         <label>I accept that I have read & understand Saburi's</label>{" "}
//                         <Link href="/privacy-policy">Privacy Policy and T&Cs</Link>
//                       </div> */}
// 									</div>
// 								</>
// 							)}
// 						</div>
// 						<div
// 							onClick={handelClick}
// 							className={styles.google_signin_container}
// 						>
// 							<span className={styles.google_icon} >
// 								<img className={styles.google_icon_img}
// 									src="https://static-00.iconduck.com/assets.00/google-icon-512x512-tqc9el3r.png" /> </span>    Sign In With Google
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default LoginPopup;

import React, { useEffect, useState } from "react";
import styles from "./loginPopup.module.css";
import { assets } from "../../assets/assets";
import { makeApi } from "../../api/callApi.tsx";
import PrimaryLoader from "../../utils/loaders/PrimaryLoader.jsx";
import Cookies from "js-cookie";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const CLIENT_ID = "666469184305-9o44or0equ1sg64886jm2elav70nqfmt.apps.googleusercontent.com";

const LoginPopup = ({ setLoginPopup }) => {
    const [userEmail, setUserEmail] = useState("");
    const [enterdOTP, setEnterdOTP] = useState();
    const [otpSended, setOtpSended] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendOTP = async () => {
        try {
            setLoading(true);
            const response = await makeApi("/api/register-otp", "POST", { email: userEmail });
            setOtpSended(true);
            console.log(response.data);
        } catch (error) {
            console.log(error.data);
        } finally {
            setLoading(false);
        }
    };

    const checkOTP = async () => {
        try {
            setLoading(true);
            const response = await makeApi("/api/check-otp", "POST", { email: userEmail, OTP: enterdOTP });
            console.log(response.data);
            RegisterUser();
        } catch (error) {
            console.log(error.data);
        } finally {
            setLoading(false);
        }
    };

    const RegisterUser = async () => {
        try {
            setLoading(true);
            const response = await makeApi("/api/register-user", "POST", { email: userEmail });
            localStorage.setItem("token", response.data.token);
            Cookies.set("register", true);
            setLoginPopup(false);
        } catch (error) {
            console.log(error.data);
        } finally {
            setLoading(false);
            window.location.reload();
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            const response = await makeApi("/api/register-user", "POST", { token });
            const { email } = response.data;

            setUserEmail(email);
            localStorage.setItem("token", response.data.token);
            Cookies.set("register", true);
            window.location.reload();
        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    };

    const handleGoogleError = () => {
        console.error("Google sign-in error occurred");
    };

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <div className={styles.loginPopupContainer}>
                <div className={styles.loginPopup}>
                    <p className={styles.closePopup} onClick={() => setLoginPopup(false)}>
                        X
                    </p>
                    <div className={styles.leftLoginPopup}>
                        <img src={assets.logo} alt="Saburi logo" />
                        <h2>Welcome to Saburi</h2>
                        <p>Sign in to discover our premium products.</p>
                        <ul>
                            <li><img src={assets.star_icon} alt="stars" />Best Taste</li>
                            <li><img src={assets.star_icon} alt="stars" />Rich Heritage</li>
                            <li><img src={assets.star_icon} alt="stars" />Vast Varieties</li>
                        </ul>
                    </div>
                    <div className={styles.rightLoginPopup}>
                        <div className={styles.innerRightLoginpopup}>
                            <h2>SIGN IN</h2>
                            <div className={styles.form}>
                                {otpSended ? (
                                    <>
                                        <div className={styles.phoneNo}>
                                            <label>Enter OTP</label>
                                            <input type="text" onChange={(e) => setEnterdOTP(e.target.value)} />
                                            {loading ? <PrimaryLoader /> : <button onClick={checkOTP}>Sign In</button>}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className={styles.phoneNo}>
                                            <label>Email</label>
                                            <input type="email" onChange={(e) => setUserEmail(e.target.value)} />
                                        </div>
                                        {loading ? (
                                            <div style={{ display: "flex", justifyContent: "center" }}>
                                                <PrimaryLoader />
                                            </div>
                                        ) : (
                                            <button onClick={sendOTP}>Send OTP</button>
                                        )}
                                    </>
                                )}
                            </div>
                            <div className={styles.google_signin_container}>
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={handleGoogleError}
                                    text="signin_with"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default LoginPopup;
