import React from "react";
import Footer from "./Footer";
import { FaUserPlus } from "react-icons/fa";
import { MdWorkOutline } from "react-icons/md";
import { BsCameraVideo } from "react-icons/bs";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
  <main className="m-6 px-14 md:m-10 space-y-10">
  {/* Hero Section */}
  <section className="flex flex-col-reverse md:flex-row items-center gap-10">
    <div className="text-center md:text-left max-w-2xl">
      <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight">
        Find Your Dream Job & Get Hired Instantly
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mt-4">
        Discover top job opportunities and attend live interviews from anywhere. Your career journey starts here.
      </p>
    </div>
    <div className="flex justify-center">
      <img src="interview.png" alt="Interview illustration" width={500} height={300} className="object-contain" />
    </div>
  </section>

  {/* Steps Section */}

<section>
  <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
    Only a Few Steps to Get Started..
  </h2>
  <div className="flex flex-col md:flex-row justify-center gap-6 px-6">
    <div className="bg-blue-50 p-6 rounded-xl shadow w-full md:w-1/3 transition hover:shadow-lg text-center">
      <FaUserPlus className="text-4xl text-blue-600 mb-3 mx-auto" />
      <h3 className="text-xl font-semibold text-blue-800 mb-2">Create Account</h3>
      <p className="text-gray-700 text-sm">
        Create your free account and complete a quick verification to unlock all platform features.
      </p>
    </div>

    <div className="bg-blue-50 p-6 rounded-xl shadow w-full md:w-1/3 transition hover:shadow-lg text-center">
      <MdWorkOutline className="text-4xl text-blue-600 mb-3 mx-auto" />
      <h3 className="text-xl font-semibold text-blue-800 mb-2">Apply for Jobs</h3>
      <p className="text-gray-700 text-sm">
        Explore a wide range of job opportunities and apply to positions that match your skills and interests.
      </p>
    </div>

    <div className="bg-blue-50 p-6 rounded-xl shadow w-full md:w-1/3 transition hover:shadow-lg text-center">
      <BsCameraVideo className="text-4xl text-blue-600 mb-3 mx-auto" />
      <h3 className="text-xl font-semibold text-blue-800 mb-2">Get Interviewed</h3>
      <p className="text-gray-700 text-sm">
        Get shortlisted by top employers and attend live interviews directly through our platform — simple, fast, and convenient.
      </p>
    </div>
  </div>
</section>


{/* Live Interview Feature */}
<section className="bg-blue-50 rounded-2xl p-8 md:p-12 max-w-6xl mx-auto">
  <div className="flex flex-col md:flex-row items-center justify-between gap-10">
    <div className="flex-1 space-y-4">
      <h2 className="text-3xl font-bold text-blue-900">Live Interviews Made Effortless</h2>
      <p className="text-gray-700">
        Interview directly from your browser — no downloads, no complications. Get matched, get interviewed, and get hired faster than ever.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-blue-800">2,000+</p>
          <p className="text-sm text-gray-600">Active Users</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-800">500+</p>
          <p className="text-sm text-gray-600">Jobs Listed</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-800">100+</p>
          <p className="text-sm text-gray-600">Interviews This Week</p>
        </div>
      </div>
    </div>
    <div className="hidden md:flex flex-1 items-center justify-center">
      <img
        src="interview2.jpg" // Replace this path with your actual image path
        alt="Live Interview Illustration"
        className="w-100 h-72 object-cover rounded-xl shadow-lg"
      />
    </div>
  </div>
</section>


  {/* Newsletter Section */}
  <section className="dark:bg-gray-900">
    <div className="py-12 px-6 max-w-screen-xl mx-auto">
      <div className="max-w-screen-md mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Sign up for our newsletter
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">
          Stay up to date with roadmap progress, announcements, and exclusive discounts. Sign up with your email.
        </p>
        <form action="#">
          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md mx-auto">
            <div className="relative w-full">
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                className="block w-full p-3 pl-10 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 16">
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                </svg>
              </div>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-3 text-white bg-emerald-400 hover:bg-slate-400 rounded-lg font-medium"
            >
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4 dark:text-gray-300">
            We care about your data. <a href="#" className="text-blue-600 hover:underline">Read our Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  </section>

  {/* Divider & Footer */}
  <hr className="my-8 border-gray-200" />
  <Footer />
</main>

    </>

  );
}

export default Home;
