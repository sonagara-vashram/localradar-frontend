import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import PropTypes from "prop-types";
import EmptyState from "./EmptyState";
import ItemCard from "./ItemCard";
import { getCategoryStyles } from "./categoryStyles";

export default function CategoryRenderer({ categoryId, data }) {
  const [showTopButton, setShowTopButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [displayData, setDisplayData] = useState(null);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Reset state when new data comes in
    setIsLoading(true);
    setDisplayData(null);

    const timer = setTimeout(() => {
      setDisplayData(data);
      setIsLoading(false);
    }, 500); // Reduced timeout from 1000ms to 500ms

    return () => clearTimeout(timer);
  }, [data]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array(6)
          .fill()
          .map((_, idx) => (
            <div key={idx}>{ItemCard.renderSkeleton()}</div>
          ))}
      </div>
    );
  }

  // Add debugging output
  // console.log("Rendering data:", displayData);

  if (!displayData || displayData.length === 0) {
    return <EmptyState />;
  }

  const categoryStyles = getCategoryStyles(categoryId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayData.map((item, index) => (
        <ItemCard
          key={index}
          item={item}
          categoryId={categoryId}
          styles={categoryStyles}
        />
      ))}

      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 bg-[var(--lr-dark-700)] text-white p-3 rounded-full shadow-lg hover:bg-[var(--lr-dark-300)] transition-all z-10"
        >
          <FaArrowRight className="rotate-[-90deg]" size={17} />
        </button>
      )}
    </div>
  );
}

CategoryRenderer.propTypes = {
  categoryId: PropTypes.string.isRequired,
  data: PropTypes.array, 
};

CategoryRenderer.defaultProps = {
  data: [],
};
