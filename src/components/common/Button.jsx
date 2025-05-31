import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Button = ({
  children,
  variant = "primary",
  to,
  onClick,
  className = "",
  disabled = false,
}) => {
  const baseStyles = "rounded-full transition-all duration-500 cursor-pointer";

  const variants = {
    primary:
      "border-2 border-[#2e2e2e] hover:bg-[#2e2e2e] hover:text-white text-black px-6 py-1",
    search: "p-3 rounded-4xl",
    searchEnabled: "bg-zinc-700 text-white",
    searchDisabled: "bg-zinc-300 text-gray-500",
  };

  const buttonStyles = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={buttonStyles} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${buttonStyles} ${disabled ? variants.searchDisabled : variants.searchEnabled}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  to: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
