import React from "react";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Navbar() {
  return (
    <nav className="shadow-md py-2 px-6 flex items-center justify-between">
      {/* Left: Logo */}
      {/* <div className=" font-bold bg-clip-text text-transparent pl-25">
        <span className="text-slate-400 font-mono text-3xl">SkillYatra</span>
      </div> */}
      <div className="py-4 pl-20 flex items-center justify-between">
        <Link
          to="/"
        
        >
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
          to="/jobs"
          className="text-1xl font-semibold text-gray-700 hover:text-slate-400 transition duration-300"
        >
          Find Jobs
        </Link>
        {/* <Link
          to="/dashboard"
          className="text-1xl font-semibold text-gray-700 hover:text-slate-400 transition duration-300"
        >
          Dashboard
        </Link> */}
        <Link
          to="/about"
          className="text-1xl font-semibold text-gray-700 hover:text-slate-400 transition duration-300"
        >
          About Us
        </Link>
      </div>

      <Link
        to="/login"
        className="flex font-bold text-white bg-emerald-400 hover:bg-teal-400 rounded p-2 px-5 mr-25"
      >
        <span className="mr-2 pt-1">Get Started</span>
      </Link>
    </nav>
  );
}

export default Navbar;
