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

// Animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
			when: "beforeChildren"
		}
	}
};

const itemVariants = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 0.6,
			ease: "easeOut"
		}
	}
};

const farmerVariants = {
	initial: { y: 0 },
	animate: {
		y: [-5, 5, -5],
		transition: {
			duration: 3,
			repeat: Infinity,
			repeatType: "reverse",
			ease: "easeInOut"
		}
	}
};

const Home = () => {
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={containerVariants}
		>
			<LandingPage />

			<motion.div
				className={styles.yourFlavor}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, margin: "-20%" }}
				variants={containerVariants}
			>
				<motion.h1 variants={itemVariants}>Find Your Flavor</motion.h1>
				<motion.div className={styles.flavorProducts} variants={containerVariants}>
					{flavorsOfChai.map((item) => (
						<motion.div
							key={item.name}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: false, margin: "-10%" }}
							variants={itemVariants}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
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
				initial="hidden"
				whileInView="visible"
				viewport={{ once: false, margin: "-20%" }}
				variants={containerVariants}
			>
				<motion.h1 variants={itemVariants}>Discover Our Brand</motion.h1>
				<motion.div className={styles.ourBrandProvides} variants={containerVariants}>
					{ourBrands.map((item, index) => (
						<motion.div
							className={styles.brandContent}
							key={index}
							variants={itemVariants}
							initial="hidden"
							whileInView="visible"
							viewport={{ once: false, margin: "-10%" }}

						>
							<motion.img
								src={item.img}
								alt={item.title}
								whileHover={{ scale: 1.05 }}
								transition={{ type: "spring", stiffness: 300  }}
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
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.4 }}
				viewport={{ once: false, margin: "-20%" }}
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
				viewport={{ once: false, margin: "-20%" }}
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