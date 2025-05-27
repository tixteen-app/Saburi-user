import { assets } from "../../../assets/assets"
import styles from "./whoWeAre.module.css"
import  {motion}	from "framer-motion"
const WhoWeAre = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.whoarewe}>Who We Are</h1>

			<motion.img
			initial={{ opacity: 0 , scale: 0.5 }}
			whileInView={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.7 }}
				src={assets.saburi_Founder}
				alt="Saburi Founder"
			/>
			<motion.div 
				initial={{ opacity: 0 , y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.7 }}
			className={styles.content}>
				<h1>Who We Are</h1>
				<p>
					<span>Saburi's</span> team of experts delivers exceptional,
					FSSAI-approved products with a commitment to safety, hygiene, and
					taste. Our premium range includes tea, spices, elaichi, laung, jeera,
					ajwain, saunf, and black pepper. Trusted in Delhi and Haryana, we are
					expanding into Punjab, Rajasthan, and Uttar Pradesh. Experience
					excellence with Saburi, where quality meets commitment.
				</p>
			</motion.div>
		</div>
	)
}

export default WhoWeAre
