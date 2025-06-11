import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");

  const handleVerify = () => {
    if (!email.endsWith("@gmail.com")) {
      alert("Please enter a valid Gmail address.");
    } else {
      // Proceed with verification logic
      alert("Email verified!");
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google Sign-In here
    alert("Redirecting to Google login...");
  };

  return (
    <main>
      <div className="h-150 flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Login to SkillYatra
          </h2>

          {/* Gmail input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Gmail Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Verify button */}
          <button
            onClick={handleVerify}
            className="w-full bg-emerald-400 text-white py-2 rounded-lg hover:bg-emerald-500 transition"
          >
            Verify
          </button>

          {/* Continue with Google - separate section */}
          <div className="mt-8 border-t pt-6 text-center">
            <button
              onClick={handleGoogleLogin}
              className="flex w-full border bg-white text-gray-700 py-2 px-20 rounded-lg hover:bg-slate-200 transition"
            >
              <span>
                <img src="google.png" className="w-8 h-8" />
              </span>
              <span className="pt-1 pr-1"> Signin with Google</span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
