import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PLACE_CATEGORIES } from "../../data/categories";
import gsap from "gsap";

// 18 random categories
const categories = PLACE_CATEGORIES.slice(0, 18);

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// Multiple avoid areas for hero text (percentages)
const avoidAreas = [
  { x1: 30, x2: 70, y1: 18, y2: 28 }, // Discover
  { x1: 23, x2: 77, y1: 28, y2: 40 }, // Everything
  { x1: 35, x2: 65, y1: 40, y2: 50 }, // about
  { x1: 28, x2: 72, y1: 50, y2: 62 }, // YourLocation
  { x1: 20, x2: 80, y1: 62, y2: 70 }, // subtext
];

function isInAnyAvoidArea(x, y) {
  return avoidAreas.some(
    (a) => x > a.x1 && x < a.x2 && y > a.y1 && y < a.y2
  );
}

export default function FloatingCategories() {
  const containerRef = useRef();
  const cardsRef = useRef([]);
  const navigate = useNavigate();

  // Random positions for cards
  const positionsRef = useRef(
    categories.map(() => {
      let x, y, tries = 0;
      do {
        x = getRandom(8, 85);
        y = getRandom(8, 70);
        tries++;
      } while (isInAnyAvoidArea(x, y) && tries < 10);
      return { x, y };
    })
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const percentX = (mouseX / rect.width) * 2 - 1; // -1 to 1
      const percentY = (mouseY / rect.height) * 2 - 1; // -1 to 1

      // Move cards based on mouse position
      positionsRef.current.forEach((pos, i) => {
        const dx = pos.x - 50;
        const dy = pos.y - 40;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const moveFactor = 1 - Math.min(distance / 60, 1); // 0 (far) to 1 (center)

        const xOffset = -percentX * 40 * moveFactor;
        const yOffset = -percentY * 18 * moveFactor;

        const cardX = pos.x + xOffset;
        const cardY = pos.y + yOffset;

        const hide = isInAnyAvoidArea(cardX, cardY);

        gsap.to(cardsRef.current[i], {
          x: `${xOffset}px`,
          y: `${yOffset}px`,
          opacity: hide ? 0 : 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    };

    const handleMouseLeave = () => {
      positionsRef.current.forEach((_, i) => {
        gsap.to(cardsRef.current[i], {
          x: "0px",
          y: "0px",
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    const container = containerRef.current;
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleClick = (cat) => {
    navigate(`/services?category=${encodeURIComponent(cat.id)}`);
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ width: "100%", height: "100%" }}
    >
      {categories.map((cat, i) => {
        const pos = positionsRef.current[i];
        return (
          <div
            key={cat.id}
            ref={(el) => (cardsRef.current[i] = el)}
            role="button"
            tabIndex={0}
            aria-label={cat.name}
            className={`bg-white border border-gray-200 shadow-md text-gray-800 font-medium rounded-xl px-4 py-2 flex items-center justify-center cursor-pointer
              transition-transform transition-shadow transition-colors duration-300
              text-xs md:text-sm pointer-events-auto`}
            style={{
              position: "absolute",
              left: `${pos.x}%`,
              top: `${pos.y}%`,
              minWidth: 90,
              maxWidth: 180,
              whiteSpace: "nowrap",
              fontSize: "1rem",
              userSelect: "none",
              boxShadow: "0 2px 8px 0 #0001",
              zIndex: 1,
            }}
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