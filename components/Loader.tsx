"use client";

import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black space-y-4">
      <div className="flex space-x-2">
        <div className="h-3 w-3 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="h-3 w-3 bg-gray-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="h-3 w-3 bg-gray-600 rounded-full animate-bounce" />
      </div>
      <p className="text-slate-300 text-sm font-medium animate-pulse">Loading Sidvia...</p>
    </div>
  );
};

export default Loader;
