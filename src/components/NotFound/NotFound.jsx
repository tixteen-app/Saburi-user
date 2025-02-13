import React from "react"
import styles from "./NotFound.module.css"

const NotFound = () => {
	return (
		<div className={styles.container}>
			<div className={styles.error}>
				<h1 className={styles.title}>404</h1>
				<p className={styles.message}>
					Oops! The page you're looking for doesn't exist.
				</p>
				<a
					href="/"
					className={styles.homeLink}
				>
					Go back to Home
				</a>
			</div>
		</div>
	)
}

export default NotFound
