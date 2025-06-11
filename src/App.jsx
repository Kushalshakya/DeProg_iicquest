import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import JobListings from "./pages/JobListings";
import VideoConference from "./pages/VideoConference";
import Profile from "./pages/Profile";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Meetings from "./pages/Meetings";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  // Simulate page load
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust as needed
    return () => clearTimeout(timeout);
  }, []);

  // Define router here
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: "/home",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <div className="flex">
          <Layout />
          <Dashboard />
        </div>
      ),
    },
    {
      path: "/layout",
      element: <Layout />,
    },
    {
      path: "/profile",
      element: (
        <div className="flex">
          <Layout />
          <Profile />
        </div>
      ),
    },
    {
      path: "/videoconference",
      element: (
        <div className="flex">
          <Layout />
          <VideoConference />
        </div>
      ),
    },
    {
      path: "/sidebar",
      element: (
        <>
          <Navbar />
          <Sidebar />
        </>
      ),
    },
    {
      path: "/joblistings",
      element: (
        <div className="flex">
          <Layout />
          <JobListings />
        </div>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <Login />
        </>
      ),
    },
    {
      path: "/meetings",
      element: (
        <div className="flex">
          <Layout />
          <Meetings />
        </div>
      ),
    },
    {
      path: "*",
      element: <h1>Page Not Found</h1>,
    },
  ]);

  if (loading) return <Loader />;

  return <RouterProvider router={router} />;
}

export default App;
