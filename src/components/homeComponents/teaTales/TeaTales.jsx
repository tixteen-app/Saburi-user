// import React from "react"
// import { Swiper, SwiperSlide } from "swiper/react"
// import "swiper/css"
// import "swiper/css/navigation"
// import "swiper/css/pagination"

// import styles from "./teaTales.module.css"
// import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules"

// const reviews = [
// 	{
// 		title: "Masala Chai",
// 		desc: "The rich blend of spices in Saburi's Masala Chai is truly exceptional. Each sip is a perfect balance of flavor and aroma, making it my go-to tea every morning.",
// 		name: "Priya Mehta",
// 	},
// 	{
// 		title: "Masala Chai",
// 		desc: "The rich blend of spices in Saburi's Masala Chai is truly exceptional. Each sip is a perfect balance of flavor and aroma, making it my go-to tea every morning.",
// 		name: "Priya Mehta",
// 	},
// 	{
// 		title: "Masala Chai",
// 		desc: "The rich blend of spices in Saburi's Masala Chai is truly exceptional. Each sip is a perfect balance of flavor and aroma, making it my go-to tea every morning.",
// 		name: "Priya Mehta",
// 	},
// ]

// const TeaTales = () => {
// 	return (
// 		<div className={styles.reviewSwiperContainer}>
// 			<h2 className="text-3xl font-bold my-8">Tea Tales</h2>
// 			<Swiper
// 				spaceBetween={50}
// 				slidesPerView={1}
// 				loop={true}
// 				// pagination={{ clickable: true }}
// 				pagination={{
// 					clickable: true,
// 					el: ".swiper-pagination",
// 					renderBullet: (index, className) =>
// 						`<span class="${className}"></span>`,
// 				}}
// 				mousewheel={true}
// 				keyboard={true}
// 				modules={[Pagination, Mousewheel, Keyboard]}
// 			>
// 				{reviews.map((review, index) => (
// 					<SwiperSlide key={index}>
// 						<div className={styles.reviewCard}>
// 							<h3 className={styles.reviewTitle}>{review.title}</h3>
// 							<p className={styles.reviewDesc}>"{review.desc}"</p>
// 							<p className={styles.reviewName}>- {review.name}</p>
// 						</div>
// 					</SwiperSlide>
// 				))}
// 			</Swiper>
// 		</div>
// 	)
// }

// export default TeaTales

import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import styles from "./teaTales.module.css"
import {
	Navigation,
	Pagination,
	Mousewheel,
	Keyboard,
	Autoplay,
} from "swiper/modules"
import { assets } from "../../../assets/assets"

const reviews = [
	{
		title: "Masala Chai",
		desc: "The rich blend of spices in Saburi's Masala Chai is truly exceptional. Each sip is a perfect balance of flavor and aroma, making it my go-to tea every morning.",
		name: "Vaibhav Rathore",
	},
	{
		"title": "Earl Grey",
		"desc": "Saburi's Earl Grey is a delightful infusion of black tea and bergamot. Its fragrant aroma and citrus notes make it the perfect afternoon pick-me-up.",
		"name": "Arjun Patel"
	},
	{
		"title": "Green Tea",
		"desc": "Saburi's Green Tea offers a refreshing taste with a hint of grassiness. It's my favorite choice for a light and energizing boost during the day.",
		"name": "Sita Rao"
	},
	{
		"title": "Chamomile Tea",
		"desc": "The calming effects of Saburi's Chamomile Tea help me unwind after a long day. Its floral aroma and soothing qualities make it a nighttime ritual.",
		"name": "Anjali Verma"
	},
	{
		"title": "Mint Tea",
		"desc": "Saburi's Mint Tea is a burst of freshness in every cup. The invigorating taste is perfect for hot days and always lifts my spirits.",
		"name": "Rahul Singh"
	},
	{
		"title": "Jasmine Green Tea",
		"desc": "The delicate floral notes of Saburi's Jasmine Green Tea transport me to a serene garden. It's my favorite way to relax and enjoy a moment of peace.",
		"name": "Leela Nair"
	},
	{
		"title": "Chai Latte",
		"desc": "Saburi's Chai Latte is the ultimate comfort drink. The creamy texture combined with aromatic spices creates a warm hug in a cup.",
		"name": "Kabir Joshi"
	}

]

const TeaTales = () => {
	return (
		<div className={styles.reviewSwiperContainer}>
			<h2 className={styles.heading}>Tea Tales</h2>
			<Swiper
				spaceBetween={50}
				slidesPerView={1}
				loop={true}
				pagination={{
					clickable: true,
					el: ".swiper-pagination",
					renderBullet: (index, className) =>
						`<span class="${className}"></span>`,
				}}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				// mousewheel={true}
				keyboard={true}
				modules={[Pagination, Mousewheel, Keyboard, Autoplay]}
				navigation={false}
			>
				{reviews.map((review, index) => (
					<SwiperSlide key={index}>
						<div className={styles.slideContainer}>
							<img
								src={assets.tea_cup}
								alt="tea_cup"
								className={styles.teacup1}
							/>
							<div className={styles.reviewCard}>
								<h3 className={styles.reviewTitle}>{review.title}</h3>
								<p className={styles.reviewDesc}>"{review.desc}"</p>
								<p className={styles.reviewName}>- {review.name}</p>
							</div>
							<img
								src={assets.tea_cup}
								alt="tea_cup"
								className={styles.teacup2}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default TeaTales
