import { assets } from "../../../assets/assets"
import styles from "./whoWeAre.module.css"

const WhoWeAre = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.whoarewe}>Who We Are</h1>

			<img
				src={assets.saburi_Founder}
				alt="Saburi Founder"
			/>
			<div className={styles.content}>
				<h1>Who We Are</h1>
				<p>
					<span>Saburi's</span> team of experts delivers exceptional,
					FSSAI-approved products with a commitment to safety, hygiene, and
					taste. Our premium range includes tea, spices, elaichi, laung, jeera,
					ajwain, saunf, and black pepper. Trusted in Delhi and Haryana, we are
					expanding into Punjab, Rajasthan, and Uttar Pradesh. Experience
					excellence with Saburi, where quality meets commitment.
				</p>
			</div>
		</div>
	)
}

export default WhoWeAre
