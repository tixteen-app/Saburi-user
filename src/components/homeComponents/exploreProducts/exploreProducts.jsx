import { exploreProducts } from "../../../assets/assets"
import SingleProduct from "../singleProduct/SingleProduct"
import styles from "./exploreProducts.module.css"

const ExplorePeoducts = () => {
	return (
		<div className={styles.container}>
			<div className={styles.featuredProducts}>
				<h1>Explore more Categories</h1>
				<div className={styles.products}>
					<SingleProduct products={exploreProducts} />
				</div>
			</div>
		</div>
	)
}

export default ExplorePeoducts
