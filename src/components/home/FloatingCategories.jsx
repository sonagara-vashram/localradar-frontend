import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PLACE_CATEGORIES } from "../../data/categories";

// 20 random categories (aap jitni chaho utni le sakte ho)
const categories = PLACE_CATEGORIES.slice(0, 25);

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

export default function FloatingCategories() {
  const [offset, setOffset] = useState(0); // -1 (left) to 1 (right)
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const containerRef = useRef();

  // Random positions ek hi bar generate karo
  const positionsRef = useRef(
    categories.map(() => ({
      x: getRandom(10, 80), // percent of width
      y: getRandom(5, 70),  // percent of height
    }))
  );

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
      className="absolute inset-0 pointer-events-none z-0"
      style={{ width: "100%", height: "100%" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {categories.map((cat, i) => {
        // X position: random + mouse offset (max 40px left/right)
        const xOffset = offset * 40;
        const pos = positionsRef.current[i];
        return (
          <div
            key={cat.id}
            role="button"
            tabIndex={0}
            aria-label={cat.name}
            className={`bg-white border border-gray-200 shadow-md text-gray-800 font-medium rounded-xl px-4 py-2 flex items-center justify-center cursor-pointer transition-all duration-300
              ${hovered === i ? "scale-110 border-blue-300 shadow-lg z-10" : ""}
              text-xs md:text-sm pointer-events-auto`}
            style={{
              position: "absolute",
              left: `calc(${pos.x}% + ${xOffset}px)`,
              top: `${pos.y}%`,
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
        );
      })}
    </div>
  );
}