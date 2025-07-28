/* eslint-disable react/no-unknown-property */
import { Star } from "lucide-react";
import PropTypes from "prop-types";
import {
  renderCategoryIcon,
  getCategoryLabel,
  formatReviewCount,
  renderCategoryTags,
  renderCategoryContent,
} from "./categoryUtils";

const ItemCard = ({ item, categoryId, styles }) => {
  return (
    <div className="relative flex flex-col h-full overflow-hidden group">
      {/* Decorative gradients */}
      <div
        className={`absolute -right-12 -top-12 w-32 h-32 rounded-full blur-2xl ${styles.bgGradient} opacity-30 z-0`}
      ></div>
      <div
        className={`absolute -left-12 -bottom-12 w-32 h-32 rounded-full blur-2xl ${styles.bgGradient} opacity-30 z-0`}
      ></div>

      {/* Card content */}
      <div className="relative flex flex-col h-full bg-white/50 rounded-2xl shadow-lg transition-all duration-500 overflow-hidden z-10 group-hover:shadow-2xl">
        {/* Category identifier */}
        <div className="flex items-center px-6 pt-6 pb-2">
          <div className={`p-2 rounded-xl ${styles.categoryBg} mr-3`}>
            <svg
              className={`w-5 h-5 ${styles.categoryIcon}`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {renderCategoryIcon(categoryId)}
            </svg>
          </div>
          <span className={`text-sm font-medium ${styles.categoryText}`}>
            {getCategoryLabel(categoryId)}
          </span>
        </div>

        {/* Title section */}
        <h2 className="text-xl font-bold text-gray-800 px-6 line-clamp-2">
          {item.name || "Unnamed Item"}
        </h2>

        {/* Tags section */}
        <div className="flex flex-wrap gap-2 px-6 mt-3">
          {renderCategoryTags(item, categoryId, styles)}
        </div>

        {/* Rating section */}
        {item.ratingInStar && (
          <div className="flex items-center px-6 mt-4">
            <div
              className={`relative overflow-hidden rounded-lg py-1 px-2 ${styles.ratingBg}`}
            >
              <div className="absolute inset-0 opacity-10 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
              <div className="flex items-center">
                <Star
                  className={`h-4 w-4 ${styles.ratingIcon} fill-current mr-1`}
                />
                <span className={`font-semibold ${styles.ratingText}`}>
                  {item.ratingInStar}
                </span>
              </div>
            </div>
            <span className="text-gray-500 text-sm ml-2">
              {formatReviewCount(item.ratingCount)}
            </span>
          </div>
        )}

        {/* Content section - always fixed height */}
        <div className="px-6 mt-5 min-h-[100px] flex-grow">
          {renderCategoryContent(item, categoryId, styles)}
        </div>

        {/* Divider */}
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

        {/* Button section - always at the bottom */}
        <div className="px-6 py-5">
          <button
            className={`w-full relative overflow-hidden rounded-xl py-3 font-medium text-white transition-all duration-500 ${styles.buttonGradient} shadow-lg cursor-pointer`}
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>

            {/* Button text */}
            <span className="relative z-10 inline-flex items-center justify-center">
              <span>View Details</span>
              <svg
                className="ml-2 w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 5L21 12M21 12L14 19M21 12H3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Add static method for rendering skeleton
ItemCard.renderSkeleton = () => {
  return (
    <div className="relative flex flex-col h-full overflow-hidden group">
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

        {/* Content section skeleton */}
        <div className="px-6 mt-5 min-h-[100px] flex-grow">
          <div className="flex items-center py-1.5">
            <div className="w-5 h-5 bg-gray-200 animate-pulse rounded"></div>
            <div className="ml-3 w-full">
              <div className="h-5 bg-gray-200 animate-pulse rounded w-full mb-1"></div>
            </div>
          </div>
          <div className="flex items-center py-1.5 mt-2">
            <div className="w-5 h-5 bg-gray-200 animate-pulse rounded"></div>
            <div className="ml-3 w-full">
              <div className="h-5 bg-gray-200 animate-pulse rounded w-full mb-1"></div>
            </div>
          </div>
        </div>

        {/* Button section skeleton */}
        <div className="px-6 py-5">
          <div className="w-full h-12 bg-gray-200 animate-pulse rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    ratingInStar: PropTypes.number,
    ratingCount: PropTypes.number,
  }).isRequired,
  categoryId: PropTypes.string.isRequired,
  styles: PropTypes.shape({
    bgGradient: PropTypes.string,
    categoryBg: PropTypes.string,
    categoryIcon: PropTypes.string,
    categoryText: PropTypes.string,
    ratingBg: PropTypes.string,
    ratingIcon: PropTypes.string,
    ratingText: PropTypes.string,
    buttonGradient: PropTypes.string,
  }).isRequired,
};

export default ItemCard;
