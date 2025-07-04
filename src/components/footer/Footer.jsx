import styles from "./footer.module.css"
import { assets } from "../../assets/assets"
import { Link } from "react-router-dom"
import {motion} from "framer-motion"

const Footer = () => {
	return (
		<div className={styles.container}>
			<div className={styles.footerContainer}>
				<motion.img
				initial={{ opacity: 0 , scale: 0.5 }}
				whileInView={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.7 }}
					src={assets.logo}
					alt="Saburi logo"
					className={styles.logo}
				/>
				<div className={styles.socialIcons}>
					<Link
						to={"https://www.instagram.com/saburiteaofficial/"}
						target="_blank"
					>
						<motion.img
							initial={{ opacity: 0 , scale: 0.5 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.7 }}
							src={assets.insta_icon}
							alt="saburi instagram"
						/>
					</Link>
					<motion.img
						initial={{ opacity: 0 , scale: 0.3 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.7 , delay: 0.4 }}
						src={assets.twiter_icon}
						alt="Saburi Twitter"
					/>
					<Link
						to={"https://www.facebook.com/teasaburi"}
						target="_blank"
					>
						<motion.img
							initial={{ opacity: 0 , scale: 0.2 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8 , delay: 0.6 }}
							src={assets.facebook_icon}
							alt="saburi facebook"
						/>
					</Link>
				</div>
				<ul className={styles.links}>
					<li>
						<Link to={"/"}>HOME</Link>
					</li>
					<li>
						<Link to={"/about"}>ABOUT US</Link>
					</li>
					<li>
						<Link to={"/store"}>STORE</Link>
					</li>
					<li>EVENT</li>
					<li>
						<Link to={"/contact"}>CONTACT US</Link>
					</li>
				</ul>
				<div className={styles.contactDetails}>
					<div className={styles.address}>
						<h3>ADDRESS</h3>
						<p>
							SABURI TEA ESTATE PVT.LTD. W 18, Okhla Industrial Area, Phase - II
							New Delhi, 110020 (BHARAT)
						</p>
					</div>
					<div>
						<h3>PHONE NO</h3>
						<a href="tel:+919990524000">+91 9990524000</a>
					</div>
					<div>
						<h3>EMAIL</h3>
						<a href="mailto:info@saburitea.com">info@saburitea.com</a>
					</div>
				</div>
			</div>
			<div className={styles.copyright}>
				<p>
					<img
						src={assets.copyRight_icon}
						alt="copyright"
					/>
					Copyright by Saburi Tea Estate 2024
				</p>
				<p>
					Designed & Developed by{" "}
					<Link to={"https://www.pitamaas.com"}>Pitamaas</Link>
				</p>
			</div>
		</div>
	)
}

export default Footer
