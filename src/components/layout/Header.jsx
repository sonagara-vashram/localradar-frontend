import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// Icons
import { HiMenuAlt4 } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { FaArrowRight } from "react-icons/fa6";
import logo from "../../assets/imgs/LR.png";
// Components
import Button from "../common/Button";
import AnimateButton from "../common/Button2";

// Animation variants
const menuVariants = {
  hidden: { y: "-100%", transition: { duration: 1, ease: [0.83, 0, 0.17, 1] } },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.6, ease: [0.83, 0, 0.17, 1] },
  },
  exit: { y: "-100%", transition: { duration: 1, ease: [0.83, 0, 0.17, 1] } },
};

const searchVariants = {
  hidden: { opacity: 0, y: "-100%", transition: { duration: 0.2 } },
  visible: { opacity: 1, y: "0%", transition: { duration: 0.2 } },
};

// Search input focus animation
const inputFocusAnimation = {
  initial: { boxShadow: "0 0 0 0px rgba(189, 251, 62, 0)" },
  focus: {
    boxShadow: "0 0 0 0.4px #343131",
    scale: 1.000001,
    transition: { duration: 0.001 },
  },
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Add this to track current route

  // UI state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [desktopInputFocused, setDesktopInputFocused] = useState(false);
  const [mobileInputFocused, setMobileInputFocused] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [placeholder, setPlaceholder] = useState("Search here...");

  // Navigation data
  const navbarItems = ["Home", "Services", "About", "Contact"];

  // Function to check if a link is active
  const isActive = (path) => {
    const currentPath = location.pathname;
    if (path === "Home" && currentPath === "/") return true;
    return currentPath === `/${path.toLowerCase()}`;
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const locations = [
    "Search 'Noida'",
    "Find 'Surat'",
    "Try 'Varanasi'",
    "Explore 'Kolkata'",
    "Discover 'Mumbai'",
    "Search 'Pune'",
    "Find 'Chennai'",
  ];

  // Rotating placeholder effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(locations[index]);
      index = (index + 1) % locations.length;
    }, 3000);
    return () => clearInterval(interval);
  }, [locations]);

  // Responsive behavior for mobile search
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileSearchOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle search submission
  const handleSearch = () => {
  if (searchQuery.trim()) {
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setMobileSearchOpen(false);
  }
};

  // Handle enter key on search inputs
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <nav
      className="flex items-center bg-[var(--lr-background)] justify-between px-4 md:px-16 shadow-md py-3 fixed top-0 left-0 w-full z-[1000]"
    >
      {/* Brand logo */}
      <div
        className="text-lg font-semibold text-black cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src={logo} className="w-20 min-w-14" alt="Logo" />
      </div>

      {/* Desktop navigation - xl screens */}
      <div className="hidden xl:flex space-x-8 text-gray-600">
        {navbarItems.map((item) => (
          <Link
            key={item}
            to={item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`}
            className={`transition-all duration-300 font-poppins font-medium ${
              isActive(item) ? "text-black font-semibold" : "hover:text-black"
            }`}
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Desktop search bar - md screens and above */}
      <div className="flex-grow xl:max-w-lg max-w-lvh mx-10 relative flex">
        <motion.input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setDesktopInputFocused(true)}
          onBlur={() => setDesktopInputFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          animate={desktopInputFocused ? "focus" : "initial"}
          variants={inputFocusAnimation}
          className="w-full bg-[var(--lr-neutral-500)] rounded-full font-roboto text-[14px] tracking-wider px-5 py-2 text-gray-700 focus:outline-none transition-all duration-300 hidden md:block"
        />
        <button
          onClick={handleSearch}
          className="absolute right-3 top-2.5 text-gray-500 cursor-pointer hover:text-black transition-all duration-300 hidden md:block"
        >
          <FiSearch size={20} />
        </button>
      </div>
      <div className="hidden md:flex mx-8 items-center">
        <AnimateButton to="/login" text="Sign In" />
      </div>

      {/* Mobile search toggle - below md screens */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => {
            setMobileSearchOpen(!mobileSearchOpen);
            setMobileMenuOpen(false);
          }}
          className="text-gray-600 cursor-pointer mr-6 hover:text-black transition-all duration-300"
        >
          <FiSearch size={25} />
        </button>
      </div>

      {/* Mobile search overlay */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            variants={searchVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-x-0 top-14 bg-white p-4 shadow-md z-40"
          >
            <div className="flex items-center gap-3">
              <motion.input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setMobileInputFocused(true)}
                onBlur={() => setMobileInputFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                animate={mobileInputFocused ? "focus" : "initial"}
                variants={inputFocusAnimation}
                className="w-full bg-[var(--lr-neutral-500)] rounded-full px-5 py-2 text-gray-700 focus:outline-none transition-all duration-300"
              />
              <Button
                onClick={handleSearch}
                variant="search"
                disabled={!searchQuery.trim()}
              >
                <FaArrowRight className="rotate-[-45deg]" size={17} />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu toggle - below xl screens */}
      <button
        onClick={() => {
          setMobileMenuOpen(true);
          setMobileSearchOpen(false);
        }}
        className="xl:hidden"
      >
        <HiMenuAlt4 className="w-10 h-10 text-gray-600 cursor-pointer hover:text-black transition-all" />
      </button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-[#BDFB3E] bg-opacity-90 flex flex-col items-center justify-center space-y-6 text-black z-50"
          >
            {/* Navigation links */}
            {navbarItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.2 }}
              >
                <Link
                  to={
                    item.toLowerCase() === "home"
                      ? "/"
                      : `/${item.toLowerCase()}`
                  }
                  className={`lg:text-8xl sm:text-7xl text-5xl font-semibold font-bebas ${
                    isActive(item) ? "text-gray-800" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              </motion.div>
            ))}

            {/* Close button */}
            <motion.button
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="absolute xl:top-5 top-3 xl:right-6 right-6 cursor-pointer"
            >
              <RxCross2 size={60} />
            </motion.button>

            {/* Menu sign-in button */}
            {/* <Button
              to="/signin"
              onClick={() => setMobileMenuOpen(false)}
              className="absolute xl:bottom-5 bottom-4 xl:right-6 right-6"
            >
              Sign-in
            </Button> */}
            <AnimateButton
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              size="large"
              text="Sign In"
              className="absolute xl:bottom-5 bottom-4 xl:right-6 right-6"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
