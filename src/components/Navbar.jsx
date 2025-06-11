import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabaseClient";

function Navbar() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for session changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    navigate("/");
  };

  return (
    <nav className="shadow-md py-2 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="py-4 pl-20 flex items-center justify-between">
        <Link to="/">
          <span className="text-slate-400 font-bold text-3xl">SkillYatra</span>
        </Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="space-x-5 ml-auto mr-10">
        <Link
          to="/home"
          className="text-1xl font-semibold text-gray-700 hover:text-slate-400 transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/joblistings"
          className="text-1xl font-semibold text-gray-700 hover:text-slate-400 transition duration-300"
        >
          Find Jobs
        </Link>
        <Link
          to="/dashboard"
          className="text-1xl font-semibold text-gray-700 hover:text-slate-400 transition duration-300"
        >
          About Us
        </Link>
      </div>

      {/* Right Side: Auth Button */}
      {session ? (
        <div className="flex gap-3 items-center">
          <Link
            to="/dashboard"
            className="flex font-bold text-white bg-emerald-400 hover:bg-teal-400 rounded p-2 px-5"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-600"
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="flex font-bold text-white bg-emerald-400 hover:bg-teal-400 rounded p-2 px-5 mr-25"
        >
          <span className="mr-2 pt-1">Get Started</span>
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
