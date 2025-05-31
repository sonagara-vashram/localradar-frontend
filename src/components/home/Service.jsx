import { Link } from "react-router-dom";

const ServicePage = () => {
  return (
    <div className="min-h-auto font-poppins bg-[var(--lr-neutral)] py-16 px-6 sm:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-6 md:gap-10 lg:gap-16 xl:gap-20 max-w-[83rem] mx-auto">
        {/* Left Column */}
        <div className="flex flex-col items-center md:items-start font-bebas">
          <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-7xl mb-2 sm:mb-3 md:mb-4 leading-tight text-center md:text-left">
            What We Provide
          </h1>
          {/* Added content block after social media links */}
          <div className="max-w-full md:max-w-xl mt-4 sm:mt-5 md:mt-6 lg:mt-8 text-center md:text-left font-poppins">
            <p className="text-start sm:text-lg md:text-lg lg:text-xl xl:text-2xl">
              Our goal is to make location-based searches effortless. Whether
              you&apos;re a{" "}
              <span className="bg-amber-300 px-1 sm:px-2 py-0.5 rounded-lg">
                traveler
              </span>
              ,{" "}
              <span className="bg-blue-300 px-1 sm:px-2 py-0.5 rounded-lg">
                Job
              </span>{" "}
              <span className="bg-fuchsia-300 px-1 sm:px-2 py-0.5 rounded-lg">
                seeker
              </span>
              ,
              <span className="bg-lime-300 px-1 sm:px-2 py-0.5 rounded-lg">
                entrepreneur
              </span>{" "}
              , or simply curious, our platform serves as a one-stop destination
              for all location-based insights.
            </p>

            {/* Added call-to-action button */}
            <div className="mt-6 md:mt-8 text-center md:text-left">
              <Link
                to="/services"
                className="inline-block bg-black text-white font-medium py-3 px-8 rounded-md hover:bg-gray-800 hover:shadow-lg transition-all duration-300"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>

        {/* Middle Column - Detailed Explanation */}
        <div className="flex flex-col space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-16 xl:space-y-20">
          <div className="max-w-full md:max-w-xl">
            <p className="text-start sm:text-lg md:text-lg lg:text-xl xl:text-2xl md:text-left">
              Our platform is designed to provide you with complete insights
              about any location you search for. Whether you&apos;re looking for
              job opportunities, the latest news, transportation options,
              top-rated schools, famous restaurants, or nearby hotels, we have
              got everything covered for you.
            </p>
          </div>

          <div className="max-w-full md:max-w-xl">
            <p className="text-start sm:text-lg md:text-lg lg:text-xl xl:text-2xl md:text-left">
              Just enter a{" "}
              <span className="px-1 py-0.5 bg-zinc-300 rounded-md">
                #location
              </span>
              , and within seconds, access all the essential data about that
              place. From employment options to lifestyle conveniences, our
              service ensures you make informed decisions before visiting or
              moving to a new location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;