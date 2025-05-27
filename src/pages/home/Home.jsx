// import React from "react"
// import LandingPage from "../../components/landingPage/LandingPage"
// import styles from "./home.module.css"
// import {Link} from "react-router-dom"
// import { flavorsOfChai, ourBrands } from "../../assets/assets"
// import FeaturedProducts from "../../components/homeComponents/featuredProducts/FeaturedProducts"
// import HomeGrid from "../../components/homeComponents/grid/HomeGrid"
// import ExplorePeoducts from "../../components/homeComponents/exploreProducts/exploreProducts"
// import WhoWeAre from "../../components/homeComponents/whoWeAre/WhoWeAre"
// import GetInTouch from "../../components/homeComponents/getInTouch/GetInTouch"
// import TeaTales from "../../components/homeComponents/teaTales/TeaTales"
// import Marquee from "../../components/homeComponents/marquee/Marquee"
// import {motion} from "framer-motion"

// const Home = () => {
// 	return (
// 		<div>
// 			<LandingPage />
// 			<div className={styles.yourFlavor}>
// 				<motion.h1 initial={{ opacity: 0 , y: 50 }} animate={{ opacity: 1 , y: 0 }} transition={{ duration: 0.7 }} >Find Your Flavor</motion.h1>
// 				<div className={styles.flavorProducts}>
// 					{flavorsOfChai.map((item) => (
// 						<Link to={`/store`} >
// 							<div key={item.name}>
// 								<img
// 									src={item?.img}
// 									alt={item?.name}
// 								/>
// 								<p>{item?.name}</p>
// 							</div>
// 						</Link>
// 					))}
// 				</div>

// 			</div>
// 			<div className={styles.ourBrands}>
// 				<h1>Discover Our Brand</h1>
// 				<div className={styles.ourBrandProvides}>
// 					{ourBrands.map((item) => (
// 						<div className={styles.brandContent}>
// 							<img
// 								src={item.img}
// 								alt={item.title}
// 							/>
// 							<div>
// 								<h3>
// 									{item?.title}
// 									<hr className={styles.brandhr1} />
// 									<hr className={styles.brandhr2} />
// 								</h3>

// 								<p>{item?.desc}</p>
// 							</div>
// 						</div>
// 					))}
// 				</div>
// 			</div>
// 			<FeaturedProducts />
// 			<HomeGrid />
// 			{/* <ExplorePeoducts /> */}
// 			<WhoWeAre />
// 			<GetInTouch />
// 			<TeaTales />
// 			<Marquee />
// 		</div>
// 	)
// }

// export default Home

import React from "react";
import LandingPage from "../../components/landingPage/LandingPage";
import styles from "./home.module.css";
import { Link } from "react-router-dom";
import { flavorsOfChai, ourBrands } from "../../assets/assets";
import FeaturedProducts from "../../components/homeComponents/featuredProducts/FeaturedProducts";
import HomeGrid from "../../components/homeComponents/grid/HomeGrid";
import ExplorePeoducts from "../../components/homeComponents/exploreProducts/exploreProducts";
import WhoWeAre from "../../components/homeComponents/whoWeAre/WhoWeAre";
import GetInTouch from "../../components/homeComponents/getInTouch/GetInTouch";
import TeaTales from "../../components/homeComponents/teaTales/TeaTales";
import Marquee from "../../components/homeComponents/marquee/Marquee";
import { motion } from "framer-motion";

const Home = () => {
	return (
		<motion.div>
			<LandingPage />

			<motion.div
				className={styles.yourFlavor}
			>
				<motion.h1 >Find Your Flavor</motion.h1>
				<motion.div className={styles.flavorProducts} >
					{flavorsOfChai.map((item) => (
						<motion.div
							key={item.name}
							initial={{ opacity: 0 , y: 100 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 1}}
						>
							<Link to={`/store`}>
								<div className={styles.flavorProductinsidediv}>
									<motion.img
										src={item?.img}
										alt={item?.name}
										whileHover={{ scale: 1.1 }}
										transition={{ type: "spring", stiffness: 400, damping: 10 }}
									/>
									<p>{item?.name}</p>
								</div>
							</Link>
						</motion.div>
					))}
				</motion.div>
			</motion.div>

			<motion.div
				className={styles.ourBrands}
				
			>
				<motion.h1>Discover Our Brand</motion.h1>
				<motion.div className={styles.ourBrandProvides} >
					{ourBrands.map((item, index) => (
						<motion.div
							className={styles.brandContent}
							key={index}
							// variants={itemVariants}
							// initial="hidden"
							// whileInView="visible"
							// viewport={{ once: false, margin: "-10%" }}
							initial={{ opacity: 0 , y: 100 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 1}}

						>
							<motion.img
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
						</motion.div>
					))}
				</motion.div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: false, margin: "-20%" }}
			>
				<FeaturedProducts />
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				viewport={{ once: false, margin: "-20%" }}
			>
				<HomeGrid />
			</motion.div>


			<motion.div
			>
				<WhoWeAre />
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				viewport={{ once: false, margin: "-20%" }}
			>
				<GetInTouch />
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<TeaTales />
			</motion.div>

			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: false, margin: "-20%" }}
			>
				<Marquee />
			</motion.div>
		</motion.div>
	);
};

export default Home;