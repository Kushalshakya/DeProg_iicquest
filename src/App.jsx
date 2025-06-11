import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";

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
      path: "/login",
      element: (
        <>
          <Navbar />
          <Login />
      
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
