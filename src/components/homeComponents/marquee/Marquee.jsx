import { assets } from "../../../assets/assets"
import styles from "./marquee.module.css"

const Marquee = () => {
	return (
		<div className={styles.container}>
			<h1>Also available on</h1>
			<div className={styles.marquee_text}>
				<div className={styles.marquee_text_track}>
					<img
						src={assets.blinkit}
						alt=""
					/>
					<img
						src={assets.bigBasket}
						alt=""
					/>
					<img
						src={assets.flipkart}
						alt=""
					/>
					<img
						src={assets.amazon}
						alt=""
					/>
					<img
						src={assets.jioMart}
						alt=""
					/>
					<img
						src={assets.blinkit}
						alt=""
						aria-hidden="true"
					/>
					<img
						src={assets.bigBasket}
						alt=""
						aria-hidden="true"
					/>
					<img
						src={assets.flipkart}
						alt=""
						aria-hidden="true"
					/>
					<img
						src={assets.amazon}
						alt=""
						aria-hidden="true"
					/>
					<img
						src={assets.jioMart}
						alt=""
						aria-hidden="true"
					/>
				</div>
			</div>
		</div>
	)
}

export default Marquee
