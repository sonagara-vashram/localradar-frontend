import {
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="min-h-auto min-w-auto bg-[#F5F5F5] pt-16 pb-2 px-6 sm:px-8 overflow-hidden">
      <div className="content relative z-10 w-full h-auto min-h-auto shadow-md m-auto p-6 sm:p-10 md:p-16 lg:p-20 bg-white rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-[2rem] border border-gray-100">
        <div className="w-full md:w-[80%] lg:w-[65%] tracking-tight text-3xl sm:text-4xl md:text-5xl lg:text-5xl leading-tight">
          <h3>From School to Jobs, We’ve Got Your Location Covered! </h3>
          <h3 className="mt-6 lg:mt-16">Let&apos;s make with happen!✨</h3>
        </div>
        <div className="mt-8 lg:mt-11">
          <button className="px-[16px] cursor-pointer py-[10px] sm:px-[20px] sm:py-[12px] text-[1rem] sm:text-[1.2rem] rounded-full bg-black text-white font-medium hover:bg-gray-800 transition-colors">
            Explore Services
          </button>
        </div>
        <div className="w-[95%] border-t-[1px] border-[#b1b1b1] m-auto mt-10 lg:mt-20 flex flex-col sm:flex-row justify-between">
          <div className="mt-5">
            <p className="text-gray-600 text-lg sm:text-xl">Connect</p>
            <div className="mt-3 sm:mt-5 text-xl sm:text-2xl">
              <h3>info@localradar.com</h3>
              {/* <h3>+91 88 667 17175</h3> */}
            </div>
          </div>
          <div className="social mt-5">
            <p className="text-gray-600 text-lg sm:text-xl">Follow</p>
            <div className="mt-3 sm:mt-5 text-2xl sm:text-3xl flex gap-5 sm:gap-10">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaXTwitter className="hover:text-[#87BA49] duration-100 cursor-pointer" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn className="hover:text-[#87BA49] duration-100 cursor-pointer" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="hover:text-[#87BA49] duration-100 cursor-pointer" />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="hover:text-[#87BA49] duration-100 cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
