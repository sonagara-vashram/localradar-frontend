/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi";
import { FaArrowUp } from "react-icons/fa";
import { PLACE_CATEGORIES } from "../data/categories";
import ItemCard from "../components/categories/ItemCard";
import Footer from "../components/layout/Footer";
import { getCategoryStyles } from "../components/categories/categoryStyles";
import { fetchCategoryData } from "../api/categoryAPI";
import { setLocation } from "../redux/slices/locationSlice";

const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const searchQuery = searchParams.get("query") || "";

  useEffect(() => {
    if (searchQuery) {
      dispatch(setLocation(searchQuery));
    }
  }, [searchQuery, dispatch]);

  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [hasResults, setHasResults] = useState(false);

  const MAX_CARDS_PER_CATEGORY = 6;

  const categoriesToShow = [
    "restaurant",
    "hotels",
    "schools",
    "cafes",
    "libraries",
    "gyms",
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!searchQuery) {
      setIsLoading(false);
      setHasResults(false);
      return;
    }

    const fetchAllCategoryData = async () => {
      setIsLoading(true);
      setResults({});

      try {
        const categoryPromises = categoriesToShow.map(async (category) => {
          try {
            const response = await fetchCategoryData(category, searchQuery);
            return {
              category,
              data: response && response.data ? response.data : [],
            };
          } catch (error) {
            console.error(`Error fetching ${category} data:`, error);
            return { category, data: [] };
          }
        });

        const categoriesData = await Promise.all(categoryPromises);

        const resultsData = {};
        let foundResults = false;

        categoriesData.forEach(({ category, data }) => {
          if (data && Array.isArray(data) && data.length > 0) {
            resultsData[category] = data.slice(0, MAX_CARDS_PER_CATEGORY);
            foundResults = true;
          }
        });

        // console.log("Processed results:", resultsData);
        setResults(resultsData);
        setHasResults(foundResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllCategoryData();
  }, [searchQuery]);

  const getCategoryName = (categoryId) => {
    const category = PLACE_CATEGORIES.find((cat) => cat.id === categoryId);
    return category
      ? category.name
      : categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
  };

  const handleCitySelect = (city) => {
    navigate(`/search?query=${encodeURIComponent(city)}`);
  };

  const popularCities = [
    "New Delhi",
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Chennai",
    "Kolkata",
    "Pune",
    "Ahmedabad",
  ];

  const handleSeeAllCategory = () => {
    navigate(`/services/`);
  };
  const handleItemClick = (categoryId) => {
    handleSeeAllCategory(categoryId);
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100vw";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isLoading]);

  return (
    <div className="mt-16 min-h-screen bg-white">
      {/* Simple header for search results */}
      <section className="relative px-4 md:px-8 lg:px-16 py-10 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {searchQuery ? (
              <span>
                Results for{" "}
                <span className="text-blue-600">&quot;{searchQuery}&quot;</span>
              </span>
            ) : (
              "Search Results"
            )}
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <main className="relative px-4 md:px-8 lg:px-16 py-8 md:py-12">
        {isLoading ? (
          // Enhanced loading state with realistic content skeletons
          <div className="max-w-7xl mx-auto">
            {/* Category title skeleton */}
            {[1, 2, 3].map((category) => (
              <div key={category} className="mb-12">
                <div className="flex justify-between items-center mb-6">
                  <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array(category === 1 ? 6 : 3)
                    .fill()
                    .map((_, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-white h-[320px] flex flex-col"
                      >
                        <div className="h-40 bg-gray-200 animate-pulse relative overflow-hidden flex-shrink-0">
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 w-full h-full">
                            <div className="shimmer-effect"></div>
                          </div>
                        </div>
                        <div className="p-4 flex-grow flex flex-col">
                          <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-3"></div>
                          <div className="h-4 w-full bg-gray-100 rounded animate-pulse mb-2"></div>
                          <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse mb-2"></div>
                          <div className="flex items-center justify-between mt-auto">
                            <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-5 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}

            {/* Add styles for shimmer effect */}
            <style jsx="true">{`
              @keyframes shimmer {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(100%);
                }
              }
              .shimmer-effect {
                animation: shimmer 1.5s infinite;
                background: linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0),
                  rgba(255, 255, 255, 0.5),
                  rgba(255, 255, 255, 0)
                );
                height: 100%;
                width: 50%;
                position: absolute;
                top: 0;
                left: 0;
              }
            `}</style>
          </div>
        ) : !hasResults ? (
          // No results found
          <div className="max-w-4xl mx-auto text-center py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <FiSearch className="text-gray-400 text-3xl" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                No results found for &quot;{searchQuery}&quot;
              </h2>
              <p className="text-gray-600 max-w-md mx-auto mb-8">
                We couldn&apos;t find any results matching your search. Please
                try a different term or check these popular cities.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-3">
                    Try searching popular locations
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {popularCities.map((city, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleCitySelect(city)}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors duration-200 cursor-pointer"
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          // Results display
          <div className="max-w-7xl mx-auto">
            {/* Render each category with its results */}
            {Object.keys(results).map((categoryId, catIdx) =>
              results[categoryId] && results[categoryId].length > 0 ? (
                <div className="mb-12" key={catIdx}>
                  <div className="flex justify-between items-center mb-6">
                    <motion.h2
                      className="text-2xl font-bold text-gray-800"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {getCategoryName(categoryId)}
                    </motion.h2>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      onClick={() => handleSeeAllCategory(categoryId)}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center cursor-pointer"
                    >
                      See All
                      <svg
                        className="ml-1 w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 6L15 12L9 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results[categoryId].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="h-full flex"
                      >
                        <div
                          onClick={() => handleItemClick(categoryId)}
                          className="cursor-pointer w-full flex flex-col"
                        >
                          <div className="h-full flex-grow">
                            <ItemCard
                              item={item}
                              categoryId={categoryId}
                              styles={getCategoryStyles(categoryId)}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : null,
            )}

            {/* More Categories Section */}
            <div className="mt-16 mb-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
              <motion.h2
                className="text-2xl font-bold text-gray-800 mb-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Looking for More Categories?
              </motion.h2>

              <p className="text-gray-600 text-center max-w-xl mx-auto mb-8">
                Discover more local services and businesses in {searchQuery} by
                exploring our complete categories collection.
              </p>

              {/* Explore More button that redirects to services page */}
              <div className="text-center">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  onClick={() => navigate("/services")}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 shadow-md cursor-pointer"
                >
                  Explore More Categories
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-gray-900 hover:bg-gray-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 cursor-pointer"
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </button>
      )}

      {/* Additional CSS for equal card heights */}
      <style jsx="true">{`
        /* Ensure all cards have equal height */
        .card-item {
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .card-content {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }
        .card-title {
          height: 48px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      `}</style>

      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default SearchResult;
