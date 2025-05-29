
// import React, { useEffect, useState } from "react";
// import styles from "./loginPopup.module.css";
// import { assets } from "../../assets/assets";
// import { makeApi } from "../../api/callApi.tsx";
// import PrimaryLoader from "../../utils/loaders/PrimaryLoader.jsx";
// import Cookies from "js-cookie";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// const CLIENT_ID = "666469184305-9o44or0equ1sg64886jm2elav70nqfmt.apps.googleusercontent.com";

// const LoginPopup = ({ setLoginPopup }) => {
//     const [userEmail, setUserEmail] = useState("");
//     const [enterdOTP, setEnterdOTP] = useState();
//     const [otpSended, setOtpSended] = useState(false);
//     const [loading, setLoading] = useState(false);

//     const sendOTP = async () => {
//         try {
//             setLoading(true);
//             const response = await makeApi("/api/register-otp", "POST", { email: userEmail });
//             setOtpSended(true);
//             console.log(response.data);
//         } catch (error) {
//             console.log(error.data);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const checkOTP = async () => {
//         try {
//             setLoading(true);
//             const response = await makeApi("/api/check-otp", "POST", { email: userEmail, OTP: enterdOTP });
//             console.log(response.data);
//             RegisterUser();
//         } catch (error) {
//             console.log(error.data);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const RegisterUser = async () => {
//         try {
//             setLoading(true);
//             const response = await makeApi("/api/register-user", "POST", { email: userEmail });
//             localStorage.setItem("token", response.data.token);
//             Cookies.set("register", true);
//             setLoginPopup(false);
//         } catch (error) {
//             console.log(error.data);
//         } finally {
//             setLoading(false);
//             window.location.reload();
//         }
//     };

//     const handleGoogleSuccess = async (credentialResponse) => {
//         try {
//             const token = credentialResponse.credential;
//             const response = await makeApi("/api/register-user", "POST", { token });
//             const { email } = response.data;

//             setUserEmail(email);
//             localStorage.setItem("token", response.data.token);
//             Cookies.set("register", true);
//             window.location.reload();
//         } catch (error) {
//             console.error("Google sign-in error:", error);
//         }
//     };

//     const handleGoogleError = () => {
//         console.error("Google sign-in error occurred");
//     };

//     return (
//         <GoogleOAuthProvider clientId={CLIENT_ID}>
//             <div className={styles.loginPopupContainer}>
//                 <div className={styles.loginPopup}>
//                     <p className={styles.closePopup} onClick={() => setLoginPopup(false)}>
//                         X
//                     </p>
//                     <div className={styles.leftLoginPopup}>
//                         <img src={assets.logo} alt="Saburi logo" />
//                         <h2>Welcome to Saburi</h2>
//                         <p>Sign in to discover our premium products.</p>
//                         <ul>
//                             <li><img src={assets.star_icon} alt="stars" />Best Taste</li>
//                             <li><img src={assets.star_icon} alt="stars" />Rich Heritage</li>
//                             <li><img src={assets.star_icon} alt="stars" />Vast Varieties</li>
//                         </ul>
//                     </div>
//                     <div className={styles.rightLoginPopup}>
//                         <div className={styles.innerRightLoginpopup}>
//                             <h2>SIGN IN</h2>
//                             <div className={styles.form}>
//                                 {otpSended ? (
//                                     <>
//                                         <div className={styles.phoneNo}>
//                                             <label>Enter OTP</label>
//                                             <input type="text" onChange={(e) => setEnterdOTP(e.target.value)} />
//                                             {loading ? <PrimaryLoader /> : <button onClick={checkOTP}>Sign In</button>}
//                                         </div>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <div className={styles.phoneNo}>
//                                             <label>Email</label>
//                                             <input type="email" onChange={(e) => setUserEmail(e.target.value)} />
//                                         </div>
//                                         {loading ? (
//                                             <div style={{ display: "flex", justifyContent: "center" }}>
//                                                 <PrimaryLoader />
//                                             </div>
//                                         ) : (
//                                             <button onClick={sendOTP}>Send OTP</button>
//                                         )}
//                                     </>
//                                 )}
//                             </div>
//                             <div className={styles.google_signin_container}>
//                                 <GoogleLogin
//                                     onSuccess={handleGoogleSuccess}
//                                     onError={handleGoogleError}
//                                     text="signin_with"
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </GoogleOAuthProvider>
//     );
// };

// export default LoginPopup;



import React, { useEffect, useState } from "react";
import styles from "./loginPopup.module.css";
import { assets } from "../../assets/assets";
import { makeApi } from "../../api/callApi.tsx";
import PrimaryLoader from "../../utils/loaders/PrimaryLoader.jsx";
import Cookies from "js-cookie";
import { auth, provider } from "./config.js"; // Import from your Firebase config
import { signInWithPopup } from "firebase/auth";

const LoginPopup = ({ setLoginPopup }) => {
    const [userEmail, setUserEmail] = useState("");
    const [enterdOTP, setEnterdOTP] = useState();
    const [otpSended, setOtpSended] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

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

    // Updated Google Sign-in Handler using Firebase
    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const registrationData = {
                email: user.email,
                firstName: user.displayName?.split(' ')[0] || '',
                lastName: user.displayName?.split(' ')[1] || '',
            };

            const response = await makeApi("/api/register-user", "POST", registrationData);
            const responseData = response.data;

            if (responseData.success) {
                localStorage.setItem("token", responseData.token);
                Cookies.set("register", true);
                setLoginPopup(false);
                window.location.reload();
            }
        } catch (error) {
            console.error("Google sign-in error:", error);
        } finally {
            setGoogleLoading(false);
        }
    };

    return (
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
                            <button 
                                onClick={handleGoogleSignIn}
                                disabled={googleLoading || loading}
                                className={styles.googleButton}
                            >
                                {googleLoading ? <PrimaryLoader /> : 'Sign in with Google'}
                            </button>
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPopup;