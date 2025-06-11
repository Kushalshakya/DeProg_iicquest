// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import JobListings from "./pages/JobListings";
import VideoConference from "./pages/VideoConference";
import Profile from "./pages/Profile";

import Home from "./components/Home";
import Navbar from "./components/Navbar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Meetings from "./pages/Meetings";

function App() {
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
        <>
          <div className="flex">
            <Sidebar />
            <Dashboard />
          </div>
        </>
      ),
    },
    {
      path: "/layout",
      element: (
        <>
          <Layout />
        </>
      ),
    },
    {
      path: "/profile",
      element: (
        <>
          <div className="flex">
            <Sidebar />
            <Profile />
          </div>
        </>
      ),
    },
    {
      path: "/videoconference",
      element: (
        <>
          <div className="flex">
            <Sidebar />
            <VideoConference />
          </div>
        </>
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
        <>
             <div className="flex">
            <Sidebar />
          <JobListings />
          </div>
          
        </>
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
        <>
                <div className="flex">
            <Sidebar />
            <Meetings />
          </div>
        </>
      ),
    },
    {
      path: "*",
      element: <h1>Page Not Found</h1>,
    },
  ]);
  return (
    // <>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Home />}>
    //       <Route index element={<Dashboard />} />
    //       <Route path="jobs" element={<JobListings />} />
    //       <Route path="video" element={<VideoConference />} />
    //       <Route path="meetings" element={<Meetings />} />
    //       <Route path="profile" element={<Profile />} />
    //     </Route>
    //   </Routes>
    // </Router>
    // </>

    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
