import { Link, NavLink, useNavigate } from "react-router-dom"
import { assets } from "../../assets/assets"
import styles from "./navbar.module.css"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import LoginPopup from "../LoginPopup/LoginPopup"
import { subscribeToCartCount, unsubscribeFromCartCount } from '../../utils/productFunction.js';



const Navbar = () => {
	const navigate = useNavigate()
	const [isPopupvisible, setIsPopupVisible] = useState(false)
	const [loginPopup, setLoginPopup] = useState(false)
	const [IsLogin, setIsLogin] = useState(false)
	const [searchTerm, setSearchTerm] = useState("");
    const [cartCount, setCartCount] = useState(0);


	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value); 
		navigate(`/store?search=${e.target.value}`);
	};
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setIsLogin(true);
		} else {
			setIsLogin(false);
		}
	}, []);

	const toggleLoginPopup = () => {
		setLoginPopup(!loginPopup)
	}

	const togglePriflePage = () => {
		navigate("/profile")
	}
	const togglePopup = () => {
		setIsPopupVisible(!isPopupvisible)
	}

	useEffect(() => {
        const updateCartCount = (count) => {
            setCartCount(count);
        };

        subscribeToCartCount(updateCartCount);

        return () => {
            unsubscribeFromCartCount(updateCartCount);
        };
    }, []);


	return (
		<div className={styles.container}>
			<div className={styles.leftNavbar}>
				<div
					className={styles.menu}
					onClick={togglePopup}
				>
					<img
						src={assets.menu_icon}
						alt="Menu Icon"
					/>
					<p>MENU</p>
				</div>
				{IsLogin ? (
					<div
						className={styles.profile}
						onClick={togglePriflePage}
					>
						<img
							src={assets.profile_icon}
							alt="Profile Icon"
						/>
					</div>
				) : (
					<div
						className={styles.profile}
						onClick={toggleLoginPopup}
					>
						<img
							src={assets.profile_icon}
							alt="Profile Icon"
						/>
						<p>LOGIN</p>
					</div>
				)}

			</div>
			<Link to={"/"}>
				<img
					src={assets.logo}
					alt="Saburi logo"
					className={styles.logo}
				/>
			</Link>
			<div className={styles.rightNavbar}>
				<div className={styles.search}>
					<input
						type="text"
						placeholder="SEARCH"
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<img
						src={assets.search_icon}
						alt="Search Icon"
					/>
				</div>

				{IsLogin ? (
					<NavLink
						to={"/cart"}
						className={styles.cart}
					>
						<img
							src={assets.cart_icon}
							alt="Cart icon"
						/>
						<span style={{ backgroundColor: "green", color: "white", padding: "3px" }} >{cartCount}</span>

					</NavLink>
				) : (
					<div
						className={styles.cart}

						onClick={toggleLoginPopup} 
					>

						<img
							src={assets.cart_icon}
							alt="Cart icon" 
						/>
					</div>
				)}

			</div>
			<AnimatePresence>
				{isPopupvisible && (
					<motion.div
						initial={{ opacity: 0, x: -100 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 200 }}
						transition={{ duration: 0.4 }}
						className={styles.popupinNavbar}
					>
						<NavbarPopup setIsPopupVisible={setIsPopupVisible} />
					</motion.div>
				)}
			</AnimatePresence>
			{loginPopup && <LoginPopup setLoginPopup={setLoginPopup} />}
		</div>
	)
}

export default Navbar

const NavbarPopup = ({ setIsPopupVisible }) => {
	return (
		<div className={styles.popupNavbar}>
			<div
				onClick={() => setIsPopupVisible(false)}
				className={styles.popupMenu}
			>
				<img
					src={assets.leftArrowIcon}
					alt="Menu"
				/>
				<p>MENU</p>
			</div>
			<ul>
				<li>
					<NavLink
						onClick={() => setIsPopupVisible(false)}
						to="/"
						className={({ isActive }) =>
							isActive ? styles.activeLink : undefined
						}
					>
						HOME
					</NavLink>
				</li>
				<li>
					<NavLink
						onClick={() => setIsPopupVisible(false)}
						to="/about"
						className={({ isActive }) =>
							isActive ? styles.activeLink : undefined
						}
					>
						ABOUT US
					</NavLink>
				</li>
				<li>
					<NavLink
						onClick={() => setIsPopupVisible(false)}
						to="/store"
						className={({ isActive }) =>
							isActive ? styles.activeLink : undefined
						}
					>
						STORE
					</NavLink>
				</li>
				<li>EVENT</li>
				<li>
					<NavLink
						onClick={() => setIsPopupVisible(false)}
						to="/contact"
						className={({ isActive }) =>
							isActive ? styles.activeLink : undefined
						}
					>
						CONTACT US
					</NavLink>
				</li>
			</ul>
		</div>
	)
}
