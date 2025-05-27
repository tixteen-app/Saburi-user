import { useNavigate } from "react-router-dom"
import { assets } from "../../../assets/assets"
import styles from "./homeGrid.module.css"
import {motion} from "framer-motion"

const HomeGrid = () => {
	const navigate = useNavigate()
	return (
		<motion.div
		initial={{ opacity: 0, y: 50 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: false, margin: "-20%" }}
		transition={{ duration: 0.7 }}
		className={styles.container}>
			<div className={styles.grid1}>
				<img
					src={assets.masala_chai_banner}
					alt="masala chai banner"
					className={styles.masalaChaiBanner}
				/>
				<div className={styles.right}>
					<div className={styles.innerright}>
						<div>
							<img
								src={assets.tea_cup}
								alt="Saburi Tea cup"
							/>
							<p>Select Your Taste</p>
						</div>
						<button onClick={() => navigate("/store")}>CLICK HERE</button>
					</div>
				</div>
			</div>
			<div className={styles.grid2}>
				<img
					src={assets.homrGif}
					alt="Tea banner"
				/>
			</div>
		</motion.div>
	)
}

export default HomeGrid
