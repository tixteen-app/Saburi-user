import React from "react"
import LandingPage from "../../components/landingPage/LandingPage"
import styles from "./home.module.css"
import { flavorsOfChai, ourBrands } from "../../assets/assets"
import FeaturedProducts from "../../components/homeComponents/featuredProducts/FeaturedProducts"
import HomeGrid from "../../components/homeComponents/grid/HomeGrid"
import ExplorePeoducts from "../../components/homeComponents/exploreProducts/exploreProducts"
import WhoWeAre from "../../components/homeComponents/whoWeAre/WhoWeAre"
import GetInTouch from "../../components/homeComponents/getInTouch/GetInTouch"
import TeaTales from "../../components/homeComponents/teaTales/TeaTales"
import Marquee from "../../components/homeComponents/marquee/Marquee"

const Home = () => {
	return (
		<div>
			<LandingPage />
			<div className={styles.yourFlavor}>
				<h1>Find Your Flavor</h1>
				<div className={styles.flavorProducts}>
					{flavorsOfChai.map((item) => (
						<div key={item.name}>
							<img
								src={item?.img}
								alt={item?.name}
							/>
							<p>{item?.name}</p>
						</div>
					))}
				</div>
			</div>
			<div className={styles.ourBrands}>
				<h1>Discover Our Brand</h1>
				<div className={styles.ourBrandProvides}>
					{ourBrands.map((item) => (
						<div className={styles.brandContent}>
							<img
								src={item.img}
								alt={item.title}
							/>
							<div>
								<h3>
									{item?.title}
									<hr className={styles.brandhr1} />
									<hr className={styles.brandhr2} />
								</h3>

								<p>{item?.desc}</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<FeaturedProducts />
			<HomeGrid />
			{/* <ExplorePeoducts /> */}
			<WhoWeAre />
			<GetInTouch />
			<TeaTales />
			<Marquee />
		</div>
	)
}

export default Home
