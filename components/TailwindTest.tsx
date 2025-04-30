"use client";

import React from 'react';

export default function TailwindTest() {
  return (
    <div style={{ margin: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Testing colors */}
      <div className="bg-blue-500 text-white p-4">
        This should have blue background with white text and padding
      </div>
      
      {/* Testing layout */}
      <div className="flex space-x-4">
        <div className="bg-red-500 w-1/3 h-20"></div>
        <div className="bg-green-500 w-1/3 h-20"></div>
        <div className="bg-yellow-500 w-1/3 h-20"></div>
      </div>
      
      {/* Testing typography */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Large Bold Text</h1>
        <p className="text-sm text-gray-500">Small gray text</p>
      </div>
      
      {/* Testing spacing */}
      <div className="space-y-2">
        <div className="bg-purple-500 h-8 w-full"></div>
        <div className="bg-purple-500 h-8 w-full"></div>
      </div>
      
      {/* Testing borders */}
      <div className="border-2 border-blue-500 rounded-lg p-4">
        Box with border and rounded corners
      </div>
    </div>
  );
} 