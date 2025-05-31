/* eslint-disable react/prop-types */
import { useState, useCallback, memo } from "react";
import { IoMail } from "react-icons/io5";

// Memoized InputField component to prevent unnecessary re-renders.
const InputField = memo(function InputField({
  label,
  type = "text",
  name,
  placeholder = "",
  options = [],
  value,
  onChange,
  onFocus,
  error,
  active,
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        className="block text-gray-400 uppercase text-xs mb-2"
      >
        {label}
      </label>
      {type === "select" ? (
        <div className="relative">
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            className={`w-full bg-white border-b p-3 pr-10 outline-none transition-colors ${
              active ? "border-black" : "border-gray-300"
            } ${error ? "border-red-400" : ""} appearance-none`}
          >
            {options.map((option, index) => (
              <option
                key={index}
                value={option}
                className={
                  option === "-- Select an option --" ? "text-gray-400" : ""
                }
              >
                {option}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      ) : type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          rows="4"
          placeholder={placeholder}
          className={`w-full bg-white border-b p-3 outline-none transition-colors ${
            active ? "border-black" : "border-gray-300"
          } ${error ? "border-red-400" : ""}`}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={placeholder}
          className={`w-full bg-white border-b p-3 outline-none transition-colors ${
            active ? "border-black" : "border-gray-300"
          } ${error ? "border-red-400" : ""}`}
        />
      )}
      {error && <p className="text-red-400 text-[10px] mt-1">{error}</p>}
    </div>
  );
});

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    termsAccepted: false,
  });

  // We can remove activeField state if we can rely on CSS :focus styles.
  // Otherwise, if needed, use a state that doesn't trigger full re-renders for inputs.
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Use stable onChange and onFocus callbacks with useCallback.
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  const handleFocus = useCallback(() => {
    // If needed, perform any side effects on focus without triggering re-renders that affect input state.
    // Otherwise, leave this empty.
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim())
      newErrors.name = "This value should not be blank.";
    if (!formData.email.trim()) {
      newErrors.email = "This value should not be blank.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.comment.trim())
      newErrors.comment = "This value should not be blank.";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        // console.log("Message sent successfully!");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8f8] p-4 sm:p-8 mt-16">
      <h1 className="text-4xl sm:text-5xl md:text-8xl lg:text-[10rem] font-heading-bold uppercase text-center font-extralight tracking-tight mb-8 sm:mb-10">
        Contact Us
      </h1>
      <div className="w-full max-w-7xl flex flex-col md:flex-row justify-center mx-auto gap-6 sm:gap-10 px-4 sm:px-0">
        <div className="w-full md:w-1/2">
          <p className="text-base sm:text-xl text-gray-700 font-semibold font-poppins">
            We are Local Radar, and we are here to serve! How can we help you?
          </p>
          <p className="text-base sm:text-sm text-gray-700 font-poppins mt-5 tracking-wide leading-6">
            If you have any questions about location-based searches, job
            opportunities, nearby services, travel insights, or anything else
            related to our platform, we’re here to assist you!
          </p>
          <div className="flex items-center text-center text-xl font-poppins mt-6">
            <IoMail className="size-6" />
            <span>: support@localradar.com</span>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="NAME (*)"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={handleFocus}
              error={errors.name}
            />
            <InputField
              label="E-MAIL (*)"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={handleFocus}
              error={errors.email}
            />
            <InputField
              label="COMMENT (*)"
              name="comment"
              type="textarea"
              value={formData.comment}
              onChange={handleChange}
              onFocus={handleFocus}
              error={errors.comment}
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <label htmlFor="termsAccepted" className="text-gray-700 text-sm">
                I accept the terms and conditions
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-3 rounded-sm hover:bg-gray-800 transition-colors duration-300"
            >
              {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
