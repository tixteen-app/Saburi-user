import { useEffect, useState } from "react";
import { makeApi } from "../../api/callApi.tsx";
import { assets } from "../../assets/assets"
import styles from "./landingPage.module.css"
import PrimaryLoader from "../../utils/loaders/PrimaryLoader.jsx";

const LandingPage = () => {
	const [offerBanner, setOfferBanner] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const fetchData = async () => {
		  try {
			setLoading(true);
			const banner = await makeApi('/api/get-all-banners', 'GET');
			setOfferBanner(banner.data.banner);
		  } catch (error) {
			console.log(error);
		  } finally {
			setLoading(false);
		  }
		};
	
		fetchData();
	  }, []);
	return (
		<div className={styles.container}>
			{loading ? (
				<div style={{ display: "flex", justifyContent: "center" }} >
					<PrimaryLoader />
				</div>
			) : (
				offerBanner.map((banner) => (
					<img
						key={banner._id}
						src={banner.bannerImage}
						alt="Chai Banner"
					/>
				))
			)}
			{/* <img
				src={assets.landing_banner}
				alt="Chai Banner"
			/> */}
		</div>
	)
}

export default LandingPage
