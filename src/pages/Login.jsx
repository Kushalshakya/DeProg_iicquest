import React, { useState } from "react";
// import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import supabase from '../supabaseClient'

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage("Failed to send link.");
    } else {
      console.log("Magic link sent to:", email);
      setMessage("Check your email for the magic link.");
    }
  };

  return (
    <main>
      <div className="h-150 flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Login to SkillYatra
          </h2>

          {/* Gmail input */}
          <form onSubmit={handleLogin}>
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

            <button
              className="w-full bg-emerald-400 text-white py-2 rounded-lg hover:bg-emerald-500 transition"
            >
              Verify
            </button>
          </form>

          <button>
            <img src="/src/assets/google.png" />
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
