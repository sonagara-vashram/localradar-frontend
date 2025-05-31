import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHotel,
  FaBus,
  FaGraduationCap,
  FaCalendarAlt,
  FaCloudSun,
  FaLandmark,
  FaUtensils,
  FaBriefcase,
  FaNewspaper,
  FaCreditCard,
  FaGasPump,
  FaHospital,
  FaShoppingBag,
  FaBicycle,
  FaCar,
} from "react-icons/fa";

const CategorySection = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    {
      name: "Hotels",
      icon: FaHotel,
      description:
        "Find accommodation options ranging from luxury hotels to budget stays",
    },
    {
      name: "Transport",
      icon: FaBus,
      description: "Discover public transport options, routes, and schedules",
    },
    {
      name: "Education",
      icon: FaGraduationCap,
      description:
        "Explore schools, universities, and educational institutions",
    },
    {
      name: "Events",
      icon: FaCalendarAlt,
      description: "Find local events, festivals, and activities",
    },
    {
      name: "Weather",
      icon: FaCloudSun,
      description: "Get current weather forecasts and seasonal information",
    },
    {
      name: "Attractions",
      icon: FaLandmark,
      description: "Discover tourist attractions, museums, and landmarks",
    },
    {
      name: "Restaurants",
      icon: FaUtensils,
      description: "Find local dining options, cuisines, and popular eateries",
    },
    {
      name: "Jobs",
      icon: FaBriefcase,
      description: "Browse job opportunities and career information",
    },
    {
      name: "News",
      icon: FaNewspaper,
      description: "Stay updated with local news and developments",
    },
    {
      name: "ATMs",
      icon: FaCreditCard,
      description: "Locate nearby ATMs and banking services",
    },
    {
      name: "Gas Stations",
      icon: FaGasPump,
      description: "Find fuel stations and EV charging points",
    },
    {
      name: "Healthcare",
      icon: FaHospital,
      description: "Discover hospitals, clinics, and pharmacies",
    },
    {
      name: "Shopping",
      icon: FaShoppingBag,
      description: "Explore malls, markets, and shopping centers",
    },
    {
      name: "Rentals",
      icon: FaBicycle,
      description:
        "Find bike rentals, car rentals, and other transport options",
    },
    {
      name: "Parking",
      icon: FaCar,
      description: "Discover parking areas and parking information",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="py-16 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-black mb-3">
            Explore Categories
          </h2>
          <div className="w-24 h-1 bg-black mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover detailed information about any location across multiple
            categories
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                className="relative"
                variants={itemVariants}
                onMouseEnter={() => setHoveredCategory(index)}
                onMouseLeave={() => setHoveredCategory(null)}
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-white border-2 border-black rounded-xl p-5 flex flex-col items-center text-center h-full transition-all duration-300 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
                  <div className="w-16 h-16 flex items-center justify-center mb-3 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-black rounded-full opacity-0"
                      animate={{ opacity: hoveredCategory === index ? 0.1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <Icon size={32} className="text-black" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 hidden md:block">
                    {category.description}
                  </p>
                  <div className="mt-3 pt-2 border-t border-gray-200 w-full hidden md:block">
                    <span className="text-xs font-medium bg-black text-white px-3 py-1 rounded-full">
                      Explore
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default CategorySection;
