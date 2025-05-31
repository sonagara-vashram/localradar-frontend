/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import {
  fetchCategoryData,
  getCategoryIcon,
  getCategoryName,
} from "../api/categoryAPI";
import { setLocation } from "../redux/slices/locationSlice";
import { CategoryRenderer } from "../components/categories";

export default function CategoryDetail() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get location state from Redux
  const reduxLocation = useSelector((state) => state.location.location);
  const cachedData = useSelector((state) => state.location.data);

  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [location, setLocationState] = useState(reduxLocation || "Jamnagar");

  useEffect(() => {
    // Update location from Redux when it changes
    if (reduxLocation) {
      setLocationState(reduxLocation);
    }
    loadData();
  }, [categoryId, reduxLocation]);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (cachedData[location]?.[categoryId]) {
        setData(cachedData[location][categoryId]);
        setIsLoading(false);
        return;
      }

      const result = await fetchCategoryData(categoryId, location);

      const resultData = result.data || [];
      setData(resultData);

      dispatch({
        type: "location/setData",
        payload: {
          location,
          category: categoryId,
          data: resultData,
        },
      });
    } catch (err) {
      console.error("Failed to load data:", err);

      let errorMessage = "Failed to load data. Please try again later.";

      if (err.response) {
        errorMessage = `Error ${err.response.status}: ${err.response.statusText || err.message}`;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setLocationState(searchQuery);
      dispatch(setLocation(searchQuery));

      setData([]);
      setIsLoading(true);

    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleBack = () => {
    navigate("/services");
  };

  const renderCategoryComponent = () => {
    return <CategoryRenderer categoryId={categoryId} data={data} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mt-16">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-black mb-10 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Services
          </button>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="text-6xl mb-4 font-ios-emoji">
            {getCategoryIcon(categoryId)}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-center uppercase">
            {getCategoryName(categoryId)} in {location}
          </h1>
        </div>

        {/* Updated Search */}
        <div className="flex justify-center w-full mb-8">
          <div className="relative mt-6 w-full max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full border rounded-full py-3 pl-5 pr-14 text-lg shadow-sm focus:ring-[0.52px] duration-150 focus:ring-[#111] focus:outline-none"
              placeholder="Enter location..."
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[var(--lr-dark-500)] text-white p-3 rounded-full hover:bg-gray-800 transition"
            >
              <FaSearch />
            </motion.button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="relative flex flex-col h-full overflow-hidden group"
              >
                {/* Card content */}
                <div className="relative flex flex-col h-full bg-white/50 rounded-2xl shadow-lg overflow-hidden z-10">
                  {/* Category identifier skeleton */}
                  <div className="flex items-center px-6 pt-6 pb-2">
                    <div className="p-2 rounded-xl bg-gray-200 animate-pulse mr-3 h-9 w-9"></div>
                    <span className="text-sm font-medium w-24 h-5 bg-gray-200 animate-pulse rounded"></span>
                  </div>

                  {/* Title section skeleton */}
                  <div className="px-6">
                    <div className="h-7 bg-gray-200 animate-pulse rounded w-3/4 mb-2"></div>
                    <div className="h-7 bg-gray-200 animate-pulse rounded w-1/2"></div>
                  </div>

                  {/* Tags section skeleton */}
                  <div className="flex flex-wrap gap-2 px-6 mt-3">
                    <div className="h-6 w-16 bg-gray-200 animate-pulse rounded-full"></div>
                    <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-full"></div>
                  </div>

                  {/* Rating section skeleton */}
                  <div className="flex items-center px-6 mt-4">
                    <div className="relative overflow-hidden rounded-lg py-1 px-2 bg-gray-200 animate-pulse h-6 w-12"></div>
                    <div className="w-16 h-5 bg-gray-200 animate-pulse rounded ml-2"></div>
                  </div>

                  {/* Content section skeleton */}
                  <div className="px-6 mt-5 min-h-[100px] flex-grow">
                    <div className="flex items-center py-1.5">
                      <div className="w-5 h-5 bg-gray-200 animate-pulse rounded"></div>
                      <div className="ml-3 w-full">
                        <div className="h-5 bg-gray-200 animate-pulse rounded w-full mb-1"></div>
                        <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4"></div>
                      </div>
                    </div>
                    <div className="flex items-center py-1.5 mt-2">
                      <div className="w-5 h-5 bg-gray-200 animate-pulse rounded"></div>
                      <div className="ml-3 w-full">
                        <div className="h-5 bg-gray-200 animate-pulse rounded w-full mb-1"></div>
                        <div className="h-5 bg-gray-200 animate-pulse rounded w-3/4"></div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                  {/* Button section skeleton */}
                  <div className="px-6 py-5">
                    <div className="w-full h-12 bg-gray-200 animate-pulse rounded-xl relative overflow-hidden">
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 w-full h-full">
                        <div className="shimmer-effect"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shimmer effect styles */}
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
            ))}
          </div>
        )}

        {/* Modern Error State */}
        {error && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto mb-10 bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="flex items-center justify-center py-6 px-4 bg-red-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                Oops! Something went wrong
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={loadData}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {!isLoading && !error && (
          <>
            <p className="text-center mb-6 text-gray-600">
              Found {data.length} results for {getCategoryName(categoryId)} in{" "}
              {location}
            </p>
            {renderCategoryComponent()}
          </>
        )}
      </div>
    </div>
  );
}
