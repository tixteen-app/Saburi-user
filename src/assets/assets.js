import logo from "./logo.png"
import landing_banner from "./landing_banner.png"
import menu_icon from "./icons/hamburger_icon.png"
import profile_icon from "./icons/profile_icon.png"
import search_icon from "./icons/search_icon.png"
import heart_icon from "./icons/heart_icon.png"
import cart_icon from "./icons/cart_icon.png"
import insta_icon from "./icons/instaIcon.png"
import facebook_icon from "./icons/facebookIcon.png"
import twiter_icon from "./icons/twittericon.png"
import copyRight_icon from "./icons/copyrightIcon.png"
import download_icon from "./icons/downloadIcon.png"
import star_icon from "./icons/star_icon.png"
import razorpay from "./icons/rozerpay.png"
import masala_chai_banner from "./masala_chai_banner.png"
import tea_cup from "./tea_cup.png"
import homrGif from "./homeGif.png"
import saburi_Founder from "./saburiFounder.png"
import blinkit from "./icons/blinkit.png"
import bigBasket from "./icons/bigbasket.png"
import flipkart from "./icons/flipkart.png"
import amazon from "./icons/amazon.png"
import jioMart from "./icons/jiomart.png"
import about_Chai from "./about_chai.png"
import leftArrowIcon from "./icons/leftArrowIcon.png"

export const assets = {
	logo,
	landing_banner,
	menu_icon,
	profile_icon,
	search_icon,
	heart_icon,
	cart_icon,
	insta_icon,
	facebook_icon,
	twiter_icon,
	copyRight_icon,
	masala_chai_banner,
	tea_cup,
	homrGif,
	saburi_Founder,
	blinkit,
	bigBasket,
	flipkart,
	amazon,
	jioMart,
	about_Chai,
	leftArrowIcon,
	download_icon,
	star_icon,
	store4,
	razorpay,
	flavor1,
}

import flavor1 from "./products/flavor1.png"
import flavor2 from "./products/flavor2.png"
import flavor3 from "./products/flavor3.png"
import flavor4 from "./products/flavor4.png"


export const flavorsOfChai = [
	{
		img: flavor1,
		name: "Gold Chai",
	},
	{
		img: flavor2,
		name: "Elaichy Chai",
	},
	{
		img: flavor3,
		name: "Masala Chai",
	},
	{
		img: flavor4,
		name: "Kadak Chai",
	},
]

import brand1 from "./brand/brand1.png"
import brand2 from "./brand/brand2.png"
import brand3 from "./brand/brand3.png"
import brand4 from "./brand/brand4.png"

export const ourBrands = [
	{
		img: brand1,
		title: "Rich Heritage",
		desc: "Experience the legacy of centuries-old tea cultivation and craftsmanship.",
	},
	{
		img: brand2,
		title: "Authentic Flavors",
		desc: "Indulge in the exquisite taste of handpicked tea leaves from the finest tea gardens.",
	},
	{
		img: brand3,
		title: "Sustainable Practices",
		desc: "Support our commitment to eco-friendly farming and ethical sourcing.",
	},
	{
		img: brand4,
		title: "Health Benefits",
		desc: "Discover the natural goodness and numerous health benefits of our teas.",
	},
]

import featuredProduct1 from "./products/featuredProduct1.png"
import featuredProduct2 from "./products/featuredProduct2.png"
import featuredProduct3 from "./products/featuredProduct3.png"
import featuredProduct4 from "./products/featuredProduct4.png"

export const featuredProducts = [
	{
		img: featuredProduct1,
		name: "Gold Chai",
		weight: 1,
		oldPrice: 250,
		newPrice: 180,
	},
	{
		img: featuredProduct2,
		name: "Elaichy Chai",
		weight: 1,
		oldPrice: 250,
		newPrice: 180,
	},
	{
		img: featuredProduct3,
		name: "Premium Chai",
		weight: 1,
		oldPrice: 250,
		newPrice: 180,
	},
	{
		img: featuredProduct4,
		name: "Masala Chai",
		weight: 1,
		oldPrice: 250,
		newPrice: 180,
	},
]

import explore_product1 from "./products/explore_product1.png"
import explore_product2 from "./products/explore_product2.png"
import explore_product3 from "./products/explore_product3.png"
import explore_product4 from "./products/explore_product4.png"

export const exploreProducts = [
	{
		img: explore_product1,
		name: "Ajwain",
		oldPrice: 250,
		newPrice: 180,
	},
	{
		img: explore_product2,
		name: "Poha",
		oldPrice: 250,
		newPrice: 180,
	},
	{
		img: explore_product3,
		name: "Clove",
		oldPrice: 250,
		newPrice: 180,
	},
	{
		img: explore_product4,
		name: "Macaroni",
		oldPrice: 250,
		newPrice: 180,
	},
]

import store1 from "./products/store1.png"
import store2 from "./products/store2.png"
import store3 from "./products/store3.png"
import store4 from "./products/store4.png"

export const productData = [
	{
		id: 1,
		name: "Gold Chai",
		weight: "1KG",
		price: 180,
		discountedPrice: 150,
		image: store1,
		category: "Flavoured Tea",
		description:
			"A description of Gold Chai. Experience an immunity boost with Saburi Gold Tea. Expertly crafted, this antioxidant-rich blend promotes health and wellness. Enjoy it with milk and sugar for a delicious defense against diseases. Freshly sourced and available in various packs at great prices, Saburi Gold Tea elevates your well-being with every sip.",
	},
	{
		id: 2,
		name: "Elachi Chai",
		weight: "1KG",
		price: 190,
		discountedPrice: 160,
		image: store2,
		category: "Flavoured Tea",
		description:
			"A description of Elachi Chai. Experience an immunity boost with Saburi Gold Tea. Expertly crafted, this antioxidant-rich blend promotes health and wellness. Enjoy it with milk and sugar for a delicious defense against diseases. Freshly sourced and available in various packs at great prices, Saburi Gold Tea elevates your well-being with every sip.",
	},
	{
		id: 3,
		name: "Masala Chai",
		weight: "1KG",
		price: 200,
		discountedPrice: 170,
		image: store3,
		category: "Spiced Tea",
		description:
			"A description of Masala Chai.Experience an immunity boost with Saburi Gold Tea. Expertly crafted, this antioxidant-rich blend promotes health and wellness. Enjoy it with milk and sugar for a delicious defense against diseases. Freshly sourced and available in various packs at great prices, Saburi Gold Tea elevates your well-being with every sip.",
	},
	{
		id: 4,
		name: "Premium Chai",
		weight: "1KG",
		price: 220,
		discountedPrice: 180,
		image: store4,
		category: "Premium Tea",
		description:
			"A description of Premium Chai. Experience an immunity boost with Saburi Gold Tea. Expertly crafted, this antioxidant-rich blend promotes health and wellness. Enjoy it with milk and sugar for a delicious defense against diseases. Freshly sourced and available in various packs at great prices, Saburi Gold Tea elevates your well-being with every sip.",
	},
	{
		id: 5,
		name: "Gold Chai",
		weight: "1KG",
		price: 180,
		discountedPrice: 150,
		image: store1,
		category: "Flavoured Tea",
		description:
			"A description of Gold Chai.Experience an immunity boost with Saburi Gold Tea. Expertly crafted, this antioxidant-rich blend promotes health and wellness. Enjoy it with milk and sugar for a delicious defense against diseases. Freshly sourced and available in various packs at great prices, Saburi Gold Tea elevates your well-being with every sip.",
	},
	{
		id: 6,
		name: "Elachi Chai",
		weight: "1KG",
		price: 190,
		discountedPrice: 160,
		image: store2,
		category: "Flavoured Tea",
		description:
			"A description of Elachi Chai. Experience an immunity boost with Saburi Gold Tea. Expertly crafted, this antioxidant-rich blend promotes health and wellness. Enjoy it with milk and sugar for a delicious defense against diseases. Freshly sourced and available in various packs at great prices, Saburi Gold Tea elevates your well-being with every sip.",
	},
	{
		id: 7,
		name: "Masala Chai",
		weight: "1KG",
		price: 200,
		discountedPrice: 170,
		image: store3,
		category: "Spiced Tea",
		description:
			"A description of Masala Chai. Experience an immunity boost with Saburi Gold Tea. Expertly crafted, this antioxidant-rich blend promotes health and wellness. Enjoy it with milk and sugar for a delicious defense against diseases. Freshly sourced and available in various packs at great prices, Saburi Gold Tea elevates your well-being with every sip.",
	},
	{
		id: 8,
		name: "Premium Chai",
		weight: "1KG",
		price: 220,
		discountedPrice: 180,
		image: store4,
		category: "Premium Tea",
		description:
			"A description of Premium Chai. Experience an immunity boost with Saburi Gold Tea. Expertly crafted, this antioxidant-rich blend promotes health and wellness. Enjoy it with milk and sugar for a delicious defense against diseases. Freshly sourced and available in various packs at great prices, Saburi Gold Tea elevates your well-being with every sip.",
	},
	{
		id: 9,
		name: "Gold Chai",
		weight: "1KG",
		price: 180,
		discountedPrice: 150,
		image: store1,
		category: "Flavoured Tea",
		description: "A description of Gold Chai.",
	},
	{
		id: 10,
		name: "Elachi Chai",
		weight: "1KG",
		price: 120,
		discountedPrice: 50,
		image: store2,
		category: "Flavoured Tea",
		description: "A description of Elachi Chai.",
	},
	{
		id: 11,
		name: "Masala Chai",
		weight: "1KG",
		price: 20,
		discountedPrice: 10,
		image: store3,
		category: "Spiced Tea",
		description: "A description of Masala Chai.",
	},
	{
		id: 12,
		name: "Premium Chai",
		weight: "1KG",
		price: 20,
		discountedPrice: 10,
		image: store4,
		category: "Premium Tea",
		description: "A description of Premium Chai.",
	},
	{
		id: 13,
		name: "Gold Chai",
		weight: "1KG",
		price: 80,
		discountedPrice: 30,
		image: store1,
		category: "Flavoured Tea",
		description: "A description of Gold Chai.",
	},
	{
		id: 14,
		name: "Elachi Chai",
		weight: "1KG",
		price: 90,
		discountedPrice: 40,
		image: store2,
		category: "Flavoured Tea",
		description: "A description of Elachi Chai.",
	},
	{
		id: 15,
		name: "Masala Chai",
		weight: "1KG",
		price: 100,
		discountedPrice: 80,
		image: store3,
		category: "Spiced Tea",
		description: "A description of Masala Chai.",
	},
	{
		id: 16,
		name: "Premium Chai",
		weight: "1KG",
		price: 150,
		discountedPrice: 100,
		image: store4,
		category: "Premium Tea",
		description: "A description of Premium Chai.",
	},
	// Add more products as needed
]

export const cartList = [
	{
		name: "Elachi Chai 1KG",
		quanity: 2,
		price: 180,
		image: store1,
	},
	{
		name: "Elachi Chai 1KG",
		quanity: 2,
		price: 180,
		image: store3,
	},
	{
		name: "Elachi Chai 1KG",
		quanity: 2,
		price: 180,
		image: store2,
	},
	{
		name: "Elachi Chai 1KG",
		quanity: 2,
		price: 180,
		image: store2,
	},
]
