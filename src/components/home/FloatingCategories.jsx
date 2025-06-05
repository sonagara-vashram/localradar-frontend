import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PLACE_CATEGORIES } from "../../data/categories";

const CATEGORY_IDS = [
  "hotels",
  "restaurant",
  "hospitals",
  "schools",
  "gyms",
  "coffeeshops",
  "shoppingmalls",
  "parks",
  "museums",
  "cinemas",
];

const categories = PLACE_CATEGORIES.filter(cat => CATEGORY_IDS.includes(cat.id));

export default function FloatingCategories() {
  const [offset, setOffset] = useState(0); // -1 (left) to 1 (right)
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const containerRef = useRef();

  // Mouse move handler
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percent = (x / rect.width) * 2 - 1; // -1 (left) to 1 (right)
    setOffset(percent);
  };

  // Mouse leave: reset to center
  const handleMouseLeave = () => setOffset(0);

  // Click: redirect
  const handleClick = (cat) => {
    navigate(`/services?category=${encodeURIComponent(cat.id)}`);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      style={{ top: 0, left: 0, width: "100%", height: "100%" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex flex-wrap gap-4 justify-center items-center transition-transform duration-500"
        style={{
          transform: `translateX(${offset * 40}px)`, // max 40px left/right
          transition: "transform 0.5s cubic-bezier(.4,2,.6,1)",
          pointerEvents: "auto",
          maxWidth: "700px",
        }}
      >
        {categories.map((cat, i) => (
          <div
            key={cat.id}
            role="button"
            tabIndex={0}
            aria-label={cat.name}
            className={`bg-white border border-gray-200 shadow-md text-gray-800 font-medium rounded-xl px-4 py-2 m-1 flex items-center justify-center cursor-pointer transition-all duration-300
              ${hovered === i ? "scale-110 border-blue-300 shadow-lg z-10" : ""}
              text-xs md:text-sm pointer-events-auto`}
            style={{
              minWidth: 90,
              maxWidth: 180,
              whiteSpace: "nowrap",
              fontSize: hovered === i ? "1.1rem" : "1rem",
              transition: "all 0.25s cubic-bezier(.4,2,.6,1)",
              userSelect: "none",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(cat)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleClick(cat);
            }}
          >
            <span className="mr-2">{cat.icon}</span>
            {cat.name}
          </div>
        ))}
      </div>
    </div>
  );
}