import { assets } from "../../assets/assets"
import LandingPage from "../../components/landingPage/LandingPage"
import styles from "./about.module.css"

const About = () => {
	return (
		<div className={styles.container}>
			<LandingPage />
			<div className={styles.aboutContainer}>
				<h1>About US</h1>
				<p className={styles.aboutPara}>
					<span>Saburi's</span> expert team offers exceptional FSSAI-approved
					products, prioritizing safety, hygiene, and taste. Our premium
					selection features tea, spices, cardamom, cloves, cumin, carom seeds,
					fennel, and black pepper. Trusted in Delhi and Haryana, we are now
					expanding into Punjab, Rajasthan, and Uttar Pradesh. Discover
					excellence with Saburi, where quality meets commitment.
				</p>
				<ul>
					<li>
						<p>Nature of Business</p>
						<span>
							Manufacture, Trader, Wholesaler/Distributor and supplier
						</span>
					</li>
					<li>
						<p>Year of Establishment</p>
						<span>2008</span>
					</li>
					<li>
						<p>No. of Employees</p>
						<span>As per the requirement</span>
					</li>
					<li>
						<p>Monthly Production Capacity</p>
						<span>As per the requirement</span>
					</li>
					<li>
						<p>Production Type</p>
						<span>Semi-Automatic</span>
					</li>
					<li>
						<p>Warehouse Facility</p>
						<span>Yes</span>
					</li>
					<li>
						<p>Original Equipment Manufacture</p>
						<span>Yes</span>
					</li>
					<li>
						<p>Bankers</p>
						<span>Allahabad Bank, Kotak Mahindra Bank</span>
					</li>
				</ul>
				<img
					src={assets.about_Chai}
					alt="About Saburi Chai"
				/>
			</div>
		</div>
	)
}

export default About
