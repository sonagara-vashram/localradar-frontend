import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PLACE_CATEGORIES } from "../../data/categories";

// 18 random categories
const categories = PLACE_CATEGORIES.slice(0, 18);

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// Avoid area (hero text): center 40% width, 30% height
const avoidArea = { x1: 30, x2: 70, y1: 32, y2: 62 };

function isInAvoidArea(x, y) {
  return x > avoidArea.x1 && x < avoidArea.x2 && y > avoidArea.y1 && y < avoidArea.y2;
}

export default function FloatingCategories() {
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // -1 to 1
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const containerRef = useRef();

  // Random positions, avoid text area
  const positionsRef = useRef(
    categories.map(() => {
      let x, y, tries = 0;
      do {
        x = getRandom(8, 85);
        y = getRandom(8, 70);
        tries++;
      } while (isInAvoidArea(x, y) && tries < 10);
      return { x, y };
    })
  );

  // Mouse move handler (opposite direction)
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentX = (x / rect.width) * 2 - 1; // -1 to 1
    const percentY = (y / rect.height) * 2 - 1; // -1 to 1
    setOffset({ x: -percentX, y: -percentY }); // Opposite direction
  };

  // Mouse leave: reset to center
  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

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
        // X/Y offset: random + mouse offset (max 40px X, 18px Y)
        const xOffset = offset.x * 40;
        const yOffset = offset.y * 18;
        const pos = positionsRef.current[i];
        // Card ki new position
        const cardX = pos.x + (xOffset / (containerRef.current?.offsetWidth || 1)) * 100;
        const cardY = pos.y + (yOffset / (containerRef.current?.offsetHeight || 1)) * 100;
        // Agar avoid area me hai to hide
        const hide = isInAvoidArea(cardX, cardY);

        return (
          <div
            key={cat.id}
            role="button"
            tabIndex={0}
            aria-label={cat.name}
            className={`bg-white border border-gray-200 shadow-md text-gray-800 font-medium rounded-xl px-4 py-2 flex items-center justify-center cursor-pointer
              transition-transform transition-shadow transition-colors duration-300
              ${hovered === i ? "scale-110 border-blue-300 shadow-lg z-10" : ""}
              text-xs md:text-sm pointer-events-auto`}
            style={{
              position: "absolute",
              left: `calc(${pos.x}% + ${xOffset}px)`,
              top: `calc(${pos.y}% + ${yOffset}px)`,
              minWidth: 90,
              maxWidth: 180,
              whiteSpace: "nowrap",
              fontSize: hovered === i ? "1.12rem" : "1rem",
              transition: "all 0.28s cubic-bezier(.4,2,.6,1)",
              userSelect: "none",
              boxShadow: hovered === i
                ? "0 4px 24px 0 #b0b0b044"
                : "0 2px 8px 0 #0001",
              opacity: hide ? 0 : 1,
              pointerEvents: hide ? "none" : "auto",
              zIndex: hovered === i ? 10 : hide ? 0 : 1,
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