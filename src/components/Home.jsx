import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
   
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
          </div>
        </div>
        <div className="pr-15 pl-15 mr-25  mt-20 mb-4 border">Image Here</div>
      </div>

      {/* steps to  */}
      <span className="mx-22 text-2xl">Only a Few Steps to Get Started..</span>
      <div className="flex mx-15">
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 p-6 bg-white">
          {/* Card 1 */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-md w-full md:w-1/3">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Create Account
            </h3>
            <p className="text-gray-700 text-sm">
              Create your free account and complete a quick verification to
              unlock all platform features.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-md w-full md:w-1/3">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Apply for Jobs
            </h3>
            <p className="text-gray-700 text-sm">
              Explore a wide range of job opportunities and apply to positions
              that match your skills and interests.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-blue-50 p-6 rounded-xl shadow-md w-full md:w-1/3">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">
              Get Interviewed
            </h3>
            <p className="text-gray-700 text-sm">
              Get shortlisted by top employers and attend live interviews
              directly through our platform — simple, fast, and convenient.
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white py-16 px-6 md:px-12 space-y-20">
          {/* Top Hiring Companies */}
          <section>
            <h2 className="text-3xl font-bold text-center mb-10">
              Top Hiring Companies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {/* Company Card */}
              {[
                { name: "TechNova", status: "Hiring Fast" },
                { name: "PixelCorp", status: "Active Now" },
                { name: "CloudSphere", status: "Hiring Fast" },
                { name: "NeoBytes", status: "Active Now" },
              ].map((company, index) => (
                <div
                  key={index}
                  className="border rounded-xl p-4 flex flex-col items-center text-center shadow hover:shadow-lg transition"
                >
                  <div className="w-16 h-16 bg-blue-100 text-blue-700 flex items-center justify-center rounded-full text-xl font-bold mb-3">
                    {company.name[0]}
                  </div>
                  <h4 className="text-lg font-semibold">{company.name}</h4>
                  <span className="mt-1 text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full font-medium">
                    {company.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Live Interview Feature Highlight */}
          <section className="bg-blue-50 rounded-2xl p-8 md:p-12 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 text-blue-900">
                  Live Interviews Made Effortless
                </h2>
                <p className="text-gray-700 mb-6">
                  Interview directly from your browser — no downloads, no
                  complications. Get matched, get interviewed, and get hired
                  faster than ever.
                </p>

                {/* Stats */}
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
                    <p className="text-sm text-gray-600">
                      Interviews This Week
                    </p>
                  </div>
                </div>
              </div>

              {/* Optional Visual or Illustration */}
              <div className="flex-1 hidden md:flex items-center justify-center">
                <div className="w-48 h-48 bg-blue-200 rounded-full flex items-center justify-center text-blue-900 text-5xl font-bold">
                  🎥
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-md sm:text-center">
                <h2 class="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Sign up for our newsletter</h2>
                <p class="mx-auto mb-8 max-w-2xl  text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">Stay up to date with the roadmap progress, announcements and exclusive discounts feel free to sign up with your email.</p>
                <form action="#">
                    <div class="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                        <div class="relative w-full">
                            <label for="email" class="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                            <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                              </svg>
                            </div>
                            <input class="block p-3 pl-9 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your email" type="email" id="email" required="" />
                        </div>
                        <div>
                            <button type="submit" class="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Subscribe</button>
                        </div>
                    </div>
                    <div class="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">We care about the protection of your data. <a href="#" class="font-medium text-primary-600 dark:text-primary-500 hover:underline">Read our Privacy Policy</a>.</div>
                </form>
            </div>
        </div>
      </section>
      <div className="border-1 my-2"></div>
      
      <Footer />
    </main>
    </>

  );
}

export default Home;
