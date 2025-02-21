import { Link } from "react-router-dom";
import WhyChooseUs from "./WhyChooseUs"; // Import the new component

const HeroSection = () => {
  return (
    <div className="bg-white font">
      {/* Hero Section */}
      <section className="w-full flex items-center py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col-reverse md:flex-row items-center justify-between">
          
          {/* Left Side - Text Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900">
              Take the Next Step in <span className="text-green-700">Your Career</span>  
              <br /> With Exclusive Garissa <br/> <span className="text-green-700">University Jobs</span>
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Explore certified job opportunities offered by Garissa university.  
              Secure your future with roles tailored for qualified professionals.
            </p>
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <Link
                to="/open-jobs"
                className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 shadow-md"
              >
                Browse Jobs
              </Link>
              <Link
                to="/login"
                className="px-6 py-3 border-2 border-green-700 text-green-700 font-semibold rounded-lg hover:bg-green-700 hover:text-white transition duration-300 shadow-md"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://shaqo-sahal.vercel.app/interview.svg"
              alt="University Jobs"
              className="rounded-lg shadow-lg w-full max-w-sm md:max-w-md"
            />
          </div>
        </div>
      </section>

      {/* Include the WhyChooseUs Component */}
      <WhyChooseUs />
    </div>
  );
};

export default HeroSection;
