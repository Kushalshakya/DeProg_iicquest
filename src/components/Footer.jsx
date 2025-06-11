import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">

        {/* Brand / About */}
        <div>
          <h2 className="text-2xl text-slate-400 font-bold mb-2">SkillYatra</h2>
          <p className="text-sm text-gray-900 max-w-sm">
            Your trusted platform to find jobs and attend live interviews with ease. Empowering your career journey, step by step.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg text-slate-400 font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-900">
            <li><Link to="/" className="hover:text-teal-400">Home</Link></li>
            <li><Link to="/jobs" className="hover:text-teal-400">Jobs</Link></li>
            <li><Link to="/dashboard" className="hover:text-teal-400">Dashboard</Link></li>
            <li><Link to="/about" className="hover:text-teal-400">About Us</Link></li>
          </ul>
        </div>

        {/* More Info */}
        <div>
          <h3 className="text-lg text-slate-400 font-semibold mb-3">Information</h3>
          <ul className="space-y-2 text-sm text-gray-900">
            <li><Link to="/" className="hover:text-teal-400">FAQ</Link></li>
            <li><Link to="/" className="hover:text-teal-400">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-teal-400">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-10">
        © {new Date().getFullYear()} JobFinder. All rights reserved.
      </div>
    </footer>
  );
}
