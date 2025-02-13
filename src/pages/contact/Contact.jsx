import LandingPage from "../../components/landingPage/LandingPage"
import styles from "./contact.module.css"

const Contact = () => {
	return (
		<div className={styles.main_container}>
			<LandingPage />
			<div className={styles.contactDetails}>
				<div className={styles.leftContactDetails}>
					<h1>Contact Us</h1>
					<p>We're Here to Assist</p>
				</div>
				<div className={styles.rightContactDetails}>
					<div>
						<span>ADDRESS</span>
						<p>
							SABURI TEA ESTATE PVT.LTD. W 18, Okhla Industrial Area, Phase - II
							New Delhi, 110020 (BHARAT)
						</p>
					</div>
					<div>
						<span>PHONE NUMBER</span>
						<a href="tel:+919990524000">+91 99905 24000</a>
					</div>
					<div>
						<span>EMAIL</span>
						<a href="mailto:info@saburitea.com">info@saburitea.com</a>
					</div>
				</div>
			</div>
			<div className={styles.hava_a_question}>
				<div className={styles.container}>
					<div className={styles.formContainer}>
						<h2>Get in touch</h2>
						<form className={styles.form}>
							<div className={styles.inputGroup}>
								<div className={styles.inputField}>
									<label
										className={styles.label}
										htmlFor="name"
									>
										Name
									</label>
									<input
										type="text"
										id="name"
										name="name"
										className={styles.input}
									/>
								</div>
								<div className={styles.inputField}>
									<label
										className={styles.label}
										htmlFor="surname"
									>
										Surname
									</label>
									<input
										type="text"
										id="surname"
										name="surname"
										className={styles.input}
									/>
								</div>
							</div>
							<div className={styles.inputField}>
								<label
									className={styles.label}
									htmlFor="mail"
								>
									Mail
								</label>
								<input
									type="email"
									id="mail"
									name="mail"
									className={styles.input}
								/>
							</div>
							<div className={styles.inputField}>
								<label
									className={styles.label}
									htmlFor="address"
								>
									Address
								</label>
								<input
									type="text"
									id="address"
									name="address"
									className={styles.input}
								/>
							</div>
							<div className={styles.inputField}>
								<label
									className={styles.label}
									htmlFor="description"
								>
									Description
								</label>
								<textarea
									id="description"
									name="description"
									className={styles.textarea}
								/>
							</div>
							<button
								type="submit"
								className={styles.button}
							>
								Send Message
							</button>
						</form>
					</div>
					<h1 className={styles.reachtous}>Have a Question?</h1>
				</div>
			</div>
		</div>
	)
}

export default Contact
