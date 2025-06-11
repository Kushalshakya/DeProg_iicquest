import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="m-10">
      <div className="flex">
        <div className="pt-6 pl-15">
          <div className="bg-white py-10 px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
              Find Your Dream Job & Get Hired Instantly
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
              Discover top job opportunities and attend live interviews from
              anywhere. Your career journey starts here.
            </p>
{/* 
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10">
              <input
                type="text"
                placeholder="Search job title or company..."
                className="px-5 py-3 w-72 sm:w-96 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Link
                to="/jobs"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Search Jobs
              </Link>
            </div> */}
{/* 
            <div className="text-gray-600 text-sm">
              <span>🚀 Live Interview Feature: </span>
              <Link
              to="/"
              className="font-semibold text-blue-700 underline hover:text-blue-900"
            >
              Apply now & connect instantly with recruiters
            </Link>
            </div> */}
          </div>
        </div>
        <div className="pr-15 pl-15 mt-20 mb-4 border">Image Here</div>
      </div>

      {/* steps to  */}
      <span className="mx-22 font-bold">How it works</span>
      <div className="flex mx-15">
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 p-6 bg-white">
          {/* Card 1 */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-md w-full md:w-1/3">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
               Create Account
            </h3>
            <p className="text-gray-700 text-sm">
           Create your free account and complete a quick verification to unlock all platform features.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-md w-full md:w-1/3">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Apply for Jobs
            </h3>
            <p className="text-gray-700 text-sm">
              Explore a wide range of job opportunities and apply to positions that match your skills and interests.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-md w-full md:w-1/3">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Get Interviewed
            </h3>
            <p className="text-gray-700 text-sm">
              Get shortlisted by top employers and attend live interviews directly through our platform — simple, fast, and convenient.
            </p>
          </div>
        </div>
      </div>
      <div className="border-1 my-2"></div>
      <Footer />
    </main>
  );
}

export default Home;
