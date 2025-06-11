import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Detect session after magic link redirect
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard"); // or reload
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          navigate("/dashboard");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:5173", // make sure this is whitelisted
      },
    });

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

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Gmail Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-400 text-white py-2 rounded-lg hover:bg-emerald-500 transition"
            >
              Verify
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>

          <button className="mt-6 w-full">
            <img src="/src/assets/google.png" alt="Google" className="w-6 mx-auto" />
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
