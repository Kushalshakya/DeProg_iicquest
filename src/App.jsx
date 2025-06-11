import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import About from "./pages/About";
import Jobs from "./pages/Jobs";

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
          <Navbar />
          <Dashboard />

        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Navbar />
          <About />
      
        </>
      ),
    },
        {
      path: "/jobs",
      element: (
        <>
          <Navbar />
          <Jobs />
      
        </>
      ),
    },
    {
      path: "*",
      element: <h1>Page Not Found</h1>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
