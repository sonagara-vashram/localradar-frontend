import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setLocation } from "../../redux/slices/locationSlice";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import {
  AnimatedText,
  CountuniousText,
  LeftToRightText,
} from "../../animation/AnimatedText";
import FloatingCategories from "./FloatingCategories";

// import AnimateButton from "../common/Button2";

const HeroSection = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (input.trim()) {
      dispatch(setLocation(input));
      navigate(`/search?query=${encodeURIComponent(input)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const locationText = "Your Location";
  const aboutText = "about";
  const discoverText = "Discover";
  const everythingText = "Everything";

  return (
    <div className=" min-h-screen p-5 flex flex-col items-center m-auto z-50">
      <FloatingCategories />
      <div className="flex flex-col items-center justify-center flex-grow px-6 text-center sm:mt-[-9rem] md:mt-[-2rem] lg:mt-5">
        <div className="text-5xl sm:text-6xl md:text-7xl text-gray-900 max-w-2xl leading-tight font-poppins font-semibold flex flex-wrap justify-center gap-x-2 sm:gap-x-3">
          <AnimatedText text={discoverText} />
          <div className="relative perspective-[1200px] group">
            <div className="relative overflow-hidden flex items-center justify-center">
              <CountuniousText text={everythingText} />
            </div>
          </div>
          <div className="relative inline-block min-w-[70px]">
            {aboutText}
            <motion.div
              className="absolute top-0 right-0 bottom-0 bg-[var(--lr-background-alt)] z-10"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{
                ease: [0.76, 0, 0.24, 1],
                duration: 1,
                delay: 1.2,
              }}
            />
          </div>
          <LeftToRightText
            className="text-[43px] sm:text-6xl md:text-7xl"
            text={locationText}
          />
        </div>
        <p className="text-gray-600 mt-4 max-w-xl text-lg">
          Enter any location and explore hotels, transport, education, events,
          weather, tourist areas, and more!
        </p>

        {/* Search bar with login button */}
        <div className="relative mt-6 w-full max-w-md flex flex-col items-center">
          <div className="w-full relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full border rounded-full py-3 px-5 text-lg shadow-sm focus:ring-[0.52px] duration-150 focus:ring-[#111] focus:outline-none"
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

          {/* Login button
          <div className="mt-4">
            <AnimateButton to="/login" text="Sign In to Save Searches" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
