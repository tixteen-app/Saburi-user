import { featuredProducts } from "../../../assets/assets"
import SingleProduct from "../singleProduct/SingleProduct"
import styles from "./featuredProducts.module.css"

const FeaturedProducts = () => {

	return (
		<div className={styles.container}>
			<div className={styles.featuredProducts}>
				<h1>Featured Products</h1>
				<div className={styles.products}>
					<SingleProduct products={featuredProducts} />
				</div>
			</div>
		</div>
	)
}

export default FeaturedProducts
