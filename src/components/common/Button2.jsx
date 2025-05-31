/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const AnimateButton = ({
  text = "Sign In",
  color = "#fefffe",
  to = null,
  onClick = null,
  size = "default", // Options: "small", "default", "large"
  external = false,
  className = "",
}) => {
  const buttonStyle = { "--button-color": color };

  // Size variants configuration
  const sizeStyles = {
    small: "text-xs pb-[0.1rem] pt-[0.1rem] pr-[0.1rem] pl-[0.7rem] gap-2",
    default: "text-xs pb-[0.2rem] pt-[0.2rem] pr-[0.2rem] pl-[0.9rem] gap-3",
    large: "text-sm pb-[0.3rem] pt-[0.3rem] pr-[0.3rem] pl-[1.1rem] gap-3",
  };

  const iconSizes = {
    small: "w-[25px] h-[25px]",
    default: "w-[30px] h-[30px]",
    large: "w-[35px] h-[35px]",
  };

  const svgSizes = {
    small: "w-[11px]",
    default: "w-[13px]",
    large: "w-[15px]",
  };

  const baseClasses = `group flex items-center font-poppins rounded-full bg-[var(--button-color)] text-black font-semibold border border-black hover:bg-[#232323] hover:text-white transition-colors duration-500 cursor-pointer ${sizeStyles[size]} ${className}`;

  const iconClasses = `relative flex items-center justify-center ${iconSizes[size]} bg-[#232323] rounded-full text-[var(--button-color)] group-hover:bg-white group-hover:text-black overflow-hidden`;

  const svgClasses = `${svgSizes[size]} transform transition-all duration-500 ease-out`;

  const content = (
    <>
      <span className="whitespace-nowrap overflow-hidden overflow-ellipsis">
        {text}
      </span>
      <span className={iconClasses}>
        <svg
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${svgClasses} group-hover:translate-x-[150%] group-hover:-translate-y-[150%]`}
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          ></path>
        </svg>

        <svg
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${svgClasses} absolute -translate-x-[150%] translate-y-[150%] transition-all duration-500 ease-out delay-100 group-hover:translate-x-0 group-hover:translate-y-0`}
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          ></path>
        </svg>
      </span>
    </>
  );

  // External link
  if (external && to) {
    return (
      <a
        href={to}
        className={baseClasses}
        style={buttonStyle}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  // Internal route with React Router
  if (to) {
    return (
      <Link
        to={to}
        className={baseClasses}
        style={buttonStyle}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  // Regular button
  return (
    <button className={baseClasses} style={buttonStyle} onClick={onClick}>
      {content}
    </button>
  );
};

export default AnimateButton;
