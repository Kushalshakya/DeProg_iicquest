// src/components/Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <h1 className="text-4xl font-bold text-emerald-500 animate-pulse">
        SkillYatra
      </h1>
    </div>
  );
};

export default Loader;
