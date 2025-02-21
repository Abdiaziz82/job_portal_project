import { FaShieldAlt, FaBriefcase, FaClock } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="w-full bg-gray-50 pt-8 md:pt-12 pb-32 md:pb-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Heading */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Why use GAU recruitment Portal?
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            A trusted platform designed for certified professionals seeking exclusive university-based job opportunities.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Secure & Verified Jobs */}
          <div className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-sm">
              <FaShieldAlt className="text-white text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mt-5">Secure & Verified</h3>
            <p className="text-gray-600 mt-3 text-base leading-relaxed">
              Every job listing is carefully verified, ensuring authenticity and trust.
            </p>
          </div>

          {/* Exclusive University Jobs */}
          <div className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-sm">
              <FaBriefcase className="text-white text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mt-5">Exclusive Jobs</h3>
            <p className="text-gray-600 mt-3 text-base leading-relaxed">
              Get access to jobs posted directly by the university, tailored for professionals.
            </p>
          </div>

          {/* Fast & Easy Applications */}
          <div className="group p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full shadow-sm">
              <FaClock className="text-white text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mt-5">Quick Applications</h3>
            <p className="text-gray-600 mt-3 text-base leading-relaxed">
              Apply for jobs in just a few clicks with our streamlined process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;