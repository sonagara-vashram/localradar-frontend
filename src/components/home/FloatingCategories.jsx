import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import categoriesData from "../../data/categories";

const categories = categoriesData
  .filter((cat) =>
    [
      "hotels",
      "restaurants",
      "hospitals",
      "schools",
      "gyms",
      "cafes",
      "malls",
      "parks",
      "museums",
      "theaters",
    ].includes(cat.id)
  )
  .map((cat) => ({
    id: cat.id,
    name: cat.name,
    // Default color if not set in data
    color: cat.color || "bg-white border-lime-300",
    // Default icon color lime if not set in data
    icon: cat.icon,
  }));

const getRandom = (min, max) => Math.random() * (max - min) + min;

export default function FloatingCategories() {
  const [positions, setPositions] = useState(
    categories.map(() => ({
      x: getRandom(10, 80),
      y: getRandom(10, 70),
      dx: getRandom(-0.2, 0.2),
      dy: getRandom(-0.2, 0.2),
    }))
  );
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const animationRef = useRef();

  useEffect(() => {
    const animate = () => {
      setPositions((prev) =>
        prev.map((pos) => {
          let nx = pos.x + pos.dx;
          let ny = pos.y + pos.dy;
          if (nx < 0 || nx > 90) pos.dx *= -1;
          if (ny < 0 || ny > 80) pos.dy *= -1;
          return {
            ...pos,
            x: Math.max(0, Math.min(90, nx)),
            y: Math.max(0, Math.min(80, ny)),
          };
        })
      );
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  // Mouse move: move opposite
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setPositions((prev) =>
      prev.map((pos) => {
        const dx = (window.innerWidth / 2 - clientX) * 0.0005;
        const dy = (window.innerHeight / 2 - clientY) * 0.0005;
        return { ...pos, dx: pos.dx + dx, dy: pos.dy + dy };
      })
    );
  };

  // Click: redirect
  const handleClick = (cat) => {
    navigate(`/services?category=${encodeURIComponent(cat.id)}`);
  };

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{ overflow: "hidden" }}
      onMouseMove={handleMouseMove}
    >
      {categories.map((cat, i) => (
        <div
          key={cat.id}
          role="button"
          tabIndex={0}
          aria-label={cat.name}
          className={`absolute transition-all duration-300 rounded-xl shadow-md border ${cat.color} text-gray-900 font-semibold flex items-center justify-center cursor-pointer pointer-events-auto
            ${hovered === i ? "scale-125 z-10 border-2 border-lime-400 bg-lime-50" : ""}
            text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-lime-400`}
          style={{
            transform: `translate(-50%, -50%) translate(${positions[i].x}vw, ${positions[i].y}vh)`,
            padding: hovered === i ? "1rem 2.2rem" : "0.5rem 1.2rem",
            boxShadow: hovered === i ? "0 4px 24px 0 #bdfb3e44" : "0 2px 8px 0 #0001",
            fontSize: hovered === i ? "1.2rem" : "1rem",
            minWidth: 80,
            maxWidth: 180,
            whiteSpace: "nowrap",
            transition: "all 0.25s cubic-bezier(.4,2,.6,1)",
            willChange: "transform",
          }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => handleClick(cat)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleClick(cat);
          }}
        >
          <span className="mr-2 text-lime-500">{cat.icon}</span>
          {cat.name}
        </div>
      ))}
    </div>
  );
}