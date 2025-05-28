import React, { useEffect, useState } from "react";
import LandingPage from "../../components/landingPage/LandingPage";
import styles from "./home.module.css";
import { Link } from "react-router-dom";
import { flavorsOfChai, ourBrands, assets } from "../../assets/assets";
import FeaturedProducts from "../../components/homeComponents/featuredProducts/FeaturedProducts";
import HomeGrid from "../../components/homeComponents/grid/HomeGrid";
import ExplorePeoducts from "../../components/homeComponents/exploreProducts/exploreProducts";
import WhoWeAre from "../../components/homeComponents/whoWeAre/WhoWeAre";
import GetInTouch from "../../components/homeComponents/getInTouch/GetInTouch";
import TeaTales from "../../components/homeComponents/teaTales/TeaTales";
import Marquee from "../../components/homeComponents/marquee/Marquee";
import { motion } from "framer-motion";
import { makeApi } from "../../api/callApi";

const Home = () => {

	const [categories, setCategories] = useState([]);
	const [loading, setLoading] = useState(false);

	console.log("categories", categories);

	useEffect(() => {
		async function fetchCategories() {
			try {
				setLoading(true);
				const response = await makeApi("/api/get-all-categories", "GET");
				if (response.status === 200) {
					const categoryOptions = [
						{ value: "", label: "All" },
						...response.data.categories.map((cat) => ({
							value: cat._id,
							label: cat.name,
						})),
					];
					setCategories(categoryOptions);
				}
			} catch (error) {
				console.log("Error fetching categories:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchCategories();
	}, []);



	return (
		<motion.div>
			<LandingPage />

			<motion.div
				className={styles.yourFlavor}
			>
				<motion.h1 >Find Your Flavor</motion.h1>
				<motion.div className={styles.flavorProducts}>
					{categories.map((item) => (
						<motion.div
							key={item.label}
							initial={{ opacity: 0, y: 100 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 1 }}
						>
							<Link to={`/store?category=${item.value}`}>
								<div className={styles.flavorProductinsidediv}>
									<motion.img
										src={assets?.flavor1}
										alt={item?.label}
										whileHover={{ scale: 1.1 }}
										transition={{ type: "spring", stiffness: 400, damping: 10 }}
									/>
									<p>{item?.label}</p>
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
							initial={{ opacity: 0, y: 100 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 1 }}

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