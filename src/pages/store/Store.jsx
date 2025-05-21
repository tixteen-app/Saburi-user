import React, { useEffect, useState } from "react";
import { makeApi } from "../../api/callApi.tsx";
import Select from "react-select";
import styles from "./Store.module.css";
import LandingPage from "../../components/landingPage/LandingPage";
import { assets } from "../../assets/assets";
import ProductCard from "../../components/homeComponents/ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";
import PrimaryLoader from "../../utils/loaders/PrimaryLoader";
import { useLocation } from "react-router-dom";
import Catelog from "../../assets/E-catelog/SABURI CHAI CATALOUGE 2024.pdf"



const Store = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [products, setProducts] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({
        value: "",
        label: "All",
    });
    const [category, setCategory] = useState(""); // Also set to empty string
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(200000000);
    const [loading, setLoading] = useState(false);
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("search") || "";
    const [search, setSearch] = useState(searchQuery);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);



    useEffect(() => {
        setSearch(searchQuery);
    }, [searchQuery]);

    useEffect(() => {
        fetchProduct();
    }, [search, category, minPrice, maxPrice]);

    const startPage = Math.max(1, currentPage - 4);
    const endPage = Math.min(totalPages, startPage + 9);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

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


    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await makeApi(
                `/api/get-all-products?name=${search}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&IsOutOfStock=false&perPage=30&page=${currentPage}`,
                "GET"
            );
            const fetchedProducts = response.data.products;
            setProducts(fetchedProducts);
            setFilteredProducts(fetchedProducts);
            setTotalPages(Math.ceil(response.data.totalProducts / 30));
        } catch (error) {
            console.log(error);
            setProducts([]);
            setFilteredProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchProduct();
    }, [search, category, minPrice, maxPrice, currentPage]);

    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption);
        setCategory(selectedOption.value);
        filterProducts(selectedOption.value);
    };


    const filterProducts = (selectedCategory) => {
        try {
            setLoading(true);
            let filtered = [...products].filter(
                (product) =>
                    product.discountedPrice >= minPrice &&
                    product.discountedPrice <= maxPrice
            );
            if (selectedCategory !== "") {
                filtered = filtered.filter((product) => product.category._id === selectedCategory);
            }
            setFilteredProducts(filtered);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handlePriceRangeChange = (min, max) => {
        setMinPrice(min);
        setMaxPrice(max);
        filterProducts(category);
    };

    const handleProductClick = (product) => {
        navigate(`/store/${product._id}`);
    };

    return (
        <div>
            <LandingPage />
            <div className={styles.container}>
                <div className={styles.topContainer}>
                    <h1>STORE</h1>
                    <div >
                        <img src={assets.download_icon} alt="Download Catalogue" />
                        <button onClick={() => window.open(Catelog, "_blank")} style={{ cursor: "pointer" }}>Download Catalogue</button>
                    </div>
                </div>
                <div className={styles.priceFilterButtons_for_mobile} >
                    <Select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        options={categories}
                        className={styles.customSelect}
                        menuPlacement="auto"
                    />
                </div>
                <div className={styles.priceFilterButtonsforMobile}>
                    <div className={`${styles.pricefilteroptions} ${minPrice === 0 && maxPrice === 500 ? styles.selectedPrice : ''}`} onClick={() => handlePriceRangeChange(0, 500)}> ₹0 - ₹500</div>
                    <div className={`${styles.pricefilteroptions} ${minPrice === 500 && maxPrice === 1000 ? styles.selectedPrice : ''}`} onClick={() => handlePriceRangeChange(500, 1000)}>₹500 - ₹1000</div>
                    <div className={`${styles.pricefilteroptions} ${minPrice === 1000 && maxPrice === 1500 ? styles.selectedPrice : ''}`} onClick={() => handlePriceRangeChange(1000, 1500)}>₹1000 - ₹1500</div>
                    <div className={`${styles.pricefilteroptions} ${minPrice === 1500 ? styles.selectedPrice : ''}`} onClick={() => handlePriceRangeChange(1500, 20000)}>₹1500 +</div>

                    {/* Remove Price Filter Button */}
                    <button
                        className={styles.removePriceFilter}
                        onClick={() => {
                            setMinPrice(0);
                            setMaxPrice(2000000);
                            filterProducts(category);
                        }}
                    >
                        Remove Price Filter
                    </button>
                </div>
                <div className={styles.bottomContainer}>
                    <aside className={styles.sidebar}>
                        {/* <h2>
                            BEST SELLING PRODUCTS <span>&#8594;</span>
                        </h2> */}
                        <h2>
                            Categories <span> &#8594;</span>
                        </h2>
                        <ul>
                            {categories.map((category) => (
                                <li
                                    key={category.value}
                                    onClick={() => handleCategoryChange(category)}
                                    className={category.value === selectedCategory.value ? styles.activeCategory : ""}
                                >
                                    {category.label}
                                </li>
                            ))}
                        </ul>
                        <h3>Price Filter</h3>
                        <div className={styles.priceFilterButtons}>
                            <div className={`${styles.pricefilteroptions} ${minPrice === 0 && maxPrice === 500 ? styles.selectedPrice : ''}`} onClick={() => handlePriceRangeChange(0, 500)}> ₹0 - ₹500</div>
                            <div className={`${styles.pricefilteroptions} ${minPrice === 500 && maxPrice === 1000 ? styles.selectedPrice : ''}`} onClick={() => handlePriceRangeChange(500, 1000)}>₹500 - ₹1000</div>
                            <div className={`${styles.pricefilteroptions} ${minPrice === 1000 && maxPrice === 1500 ? styles.selectedPrice : ''}`} onClick={() => handlePriceRangeChange(1000, 1500)}>₹1000 - ₹1500</div>
                            <div className={`${styles.pricefilteroptions} ${minPrice === 1500 ? styles.selectedPrice : ''}`} onClick={() => handlePriceRangeChange(1500, 20000)}>₹1500 +</div>

                            {/* Remove Price Filter Button */}
                            <button
                                className={styles.removePriceFilter}
                                onClick={() => {
                                    setMinPrice(0);
                                    setMaxPrice(2000000);
                                    filterProducts(category);
                                }}
                            >
                                Remove Price Filter
                            </button>
                        </div>

                    </aside>
                    <main className={styles.main}>
                        {products === null ? (
                            <div className={styles.loaderContainer}>
                                <PrimaryLoader />
                            </div>
                        ) : filteredProducts && filteredProducts.length === 0 ? (
                            <div className={styles.noProductsContainer}>
                                <img
                                    src="https://thecafetable.com/assets/images/no-product.png?v=3"
                                    alt="No Products"
                                    className={styles.noProductsImage}
                                />
                            </div>
                        ) : (
                            <section className={styles.productsGrid}>
                                {filteredProducts?.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        onClick={() => navigate(`/store/${product._id}`)}
                                    />
                                ))}
                            </section>
                        )}
                    </main>
                </div>
            </div>
            {totalPages > 1 && (
                <div className={styles.all_user_pagination_main_div}>
                    <div className={styles.all_user_pagination}>
                        {startPage > 1 && (
                            <>
                                <button onClick={() => handlePageClick(1)}>&laquo;</button>
                                <span>...</span>
                            </>
                        )}
                        {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map(
                            (pageNumber) => (
                                <button
                                    key={pageNumber}
                                    className={pageNumber === currentPage ? styles.activepagination : styles.nonactivepagination}
                                    onClick={() => handlePageClick(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            )
                        )}
                        {endPage < totalPages && (
                            <>
                                <span>...</span>
                                <button onClick={() => handlePageClick(totalPages)}>&raquo;</button>
                            </>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
};

export default Store;
