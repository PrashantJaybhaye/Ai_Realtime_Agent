'use client';

import React from 'react';

const UserError = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
      <h2 className="text-xl font-semibold text-white">Oops! Unable to load your profile.</h2>
      <p className="text-gray-400 text-sm">
        We couldn&apos;t fetch your account details. Please try refreshing the page or sign in again.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 px-4 py-2 bg-[#10A37F] text-white rounded-md hover:bg-[#0e8e6b] transition"
      >
        Refresh Page
      </button>
    </div>
  );
};

export default UserError;
