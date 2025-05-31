import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PLACE_CATEGORIES } from "../../data/categories";
import { FaArrowRight } from "react-icons/fa6";

export default function AllServices() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] =
    useState(PLACE_CATEGORIES);
  const [showTopButton, setShowTopButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const filtered = PLACE_CATEGORIES.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredCategories(filtered);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-auto bg-gray-50 p-4 sm:p-6 md:p-8 lg:p-10 relative mt-5">
      {/* Fixed Search Bar and Title */}
      <div className="fixed top-0 left-0 w-full bg-white p-4 z-50 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-left">
            Explore Location Services
          </h1>
          <input
            type="text"
            placeholder="Search for services..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 rounded-full border border-gray-300 focus:ring-blue-500 focus:border-transparent shadow-sm w-full sm:w-80"
          />
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto mt-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`${category.color} rounded-xl shadow-lg p-4 sm:p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl sm:text-4xl font-ios-emoji">
                  {category.icon}
                </span>
                <div className="bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-70">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {category.name}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-base sm:text-lg text-gray-600">
              No services found matching &quot;{searchTerm}&quot;
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Back to Top Button */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-(--lr-dark-700) text-white p-3 rounded-full shadow-lg hover:bg-(--lr-dark-300) transition-all"
        >
          <FaArrowRight className="rotate-[-90deg]" size={17} />
        </button>
      )}
    </div>
  );
}
