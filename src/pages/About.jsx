import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";

const LocationRadarAbout = () => {
  const [hoveredSection, setHoveredSection] = useState(null);
  const containerRef = useRef(null);

  const intelligenceSections = [
    {
      title: "Smart Location Insights",
      description:
        "Get all essential information about any location in one place",
      details: [
        "Nearby Schools, Colleges, Restaurants, Jobs & More",
        "Live Map and Real-Time Updates",
        "Popular Trends and Latest Information",
        "Suggestions Based on Your Interests",
      ],
    },
    {
      title: "Easy & Fast Search",
      description: "Find details about any place with just one click",
      details: [
        "Accurate Location-Based Information",
        "Personalized Recommendations",
        "Simple and User-Friendly Interface",
        "Daily Updated Data",
      ],
    },
    {
      title: "Reliable & Up-to-Date Data",
      description: "Get the most accurate and latest details for any location",
      details: [
        "Verified Information from Multiple Sources",
        "Regularly Updated Listings",
        "Easy Navigation and Smooth Experience",
        "Accessible on Any Device",
      ],
    },
  ];



  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-white text-neutral-900 min-h-screen relative overflow-hidden"
    >
      <motion.div
        style={{
          position: "fixed",
          transform: "translate(-50%, -50%)",
          zIndex: 50,
          pointerEvents: "none",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "50%",
        }}
        animate={{
          width: hoveredSection !== null ? "200px" : "40px",
          height: hoveredSection !== null ? "200px" : "40px",
          opacity: hoveredSection !== null ? 0.2 : 0.5,
        }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 20,
        }}
        className="absolute"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-8xl lg:text-[10rem] font-heading-bold uppercase text-center font-extralight tracking-tight mb-8 sm:mb-10">
            LOCAL RADAR
          </h1>
          <p className="text-xl md:text-3xl max-w-4xl mx-auto text-neutral-600 font-light leading-relaxed mb-16">
            Pioneering the Future of Location Intelligence Through Seamless,
            Adaptive Digital Ecosystems
          </p>
        </motion.div>

        <div className="space-y-24">
          {intelligenceSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              onMouseEnter={() => setHoveredSection(index)}
              onMouseLeave={() => setHoveredSection(null)}
              className="group relative"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="w-full md:w-2/3 cursor-pointer">
                  <h3 className="text-3xl md:text-5xl font-light text-neutral-900 mb-4 transition-colors group-hover:text-lime-500">
                    {section.title}
                  </h3>
                  <p className="text-xl md:text-2xl text-neutral-600 mb-6">
                    {section.description}
                  </p>
                  <AnimatePresence>
                    {hoveredSection === index && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 text-neutral-700"
                      >
                        {section.details.map((detail, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="text-lg md:text-xl"
                          >
                            • {detail}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
                <div className="w-full md:w-1/3 flex justify-end">
                  <span className="text-[5rem] md:text-[10rem] font-extralight text-neutral-300 group-hover:opacity-100 transition-opacity">
                    0{index + 1}
                  </span>
                </div>
              </div>
              <hr className="my-8 border-neutral-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LocationRadarAbout;
