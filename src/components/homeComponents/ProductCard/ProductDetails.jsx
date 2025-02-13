import React from "react"
import styles from "./ProductDetails.module.css"
import { LazyLoadImage } from "react-lazy-load-image-component"

const ProductDetails = ({ product, onClose }) => (
	<div className={styles.modal}>
		<div className={styles.modalContent}>
			<span
				className={styles.closeButton}
				onClick={onClose}
			>
				&times;
			</span>
			<LazyLoadImage
                    effect="blur" loading="lazy"
				src={product.image}
				alt={product.name}
				className={styles.image}
			/>
			<h2>{product.name}</h2>
			<p>{product.description}</p>
			<p>Weight: {product.weight}</p>
			<p>
				Price: Rs {product.discountedPrice}{" "}
				<span className={styles.originalPrice}>Rs {product.price}</span>
			</p>
		</div>
	</div>
)

export default ProductDetails
