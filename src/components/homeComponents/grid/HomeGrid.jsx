import { useNavigate } from "react-router-dom"
import { assets } from "../../../assets/assets"
import styles from "./homeGrid.module.css"

const HomeGrid = () => {
	const navigate = useNavigate()
	return (
		<div className={styles.container}>
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
		</div>
	)
}

export default HomeGrid
