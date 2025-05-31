import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Component to display API errors in a user-friendly way
 */
const ErrorMessage = ({
  type = "error",
  title = "An error occurred",
  message = "Something went wrong. Please try again later.",
  actionText = "Try Again",
  onAction = null,
  showHomeLink = true,
}) => {
  // Different styles based on error type
  const styles = {
    error: {
      icon: "❌",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      borderColor: "border-red-200",
    },
    unauthorized: {
      icon: "🔒",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      borderColor: "border-orange-200",
    },
    rateLimit: {
      icon: "⏱️",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-700",
      borderColor: "border-yellow-200",
    },
  };

  const style = styles[type] || styles.error;

  return (
    <div
      className={`p-6 rounded-lg ${style.bgColor} ${style.borderColor} border shadow-sm`}
    >
      <div className="flex items-center mb-4">
        <span className="text-2xl mr-2">{style.icon}</span>
        <h3 className={`font-semibold ${style.textColor}`}>{title}</h3>
      </div>

      <p className={`mb-4 ${style.textColor}`}>{message}</p>

      <div className="flex flex-wrap gap-2">
        {onAction && (
          <button
            onClick={onAction}
            className={`px-4 py-2 rounded ${style.textColor} bg-white border ${style.borderColor} hover:bg-gray-50 transition-colors`}
          >
            {actionText}
          </button>
        )}

        {showHomeLink && (
          <Link
            to="/"
            className="px-4 py-2 rounded text-blue-700 bg-white border border-blue-200 hover:bg-gray-50 transition-colors"
          >
            Back to Home
          </Link>
        )}
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  type: PropTypes.oneOf(["error", "unauthorized", "rateLimit"]),
  title: PropTypes.string,
  message: PropTypes.string,
  actionText: PropTypes.string,
  onAction: PropTypes.func,
  showHomeLink: PropTypes.bool,
};

export default ErrorMessage;
