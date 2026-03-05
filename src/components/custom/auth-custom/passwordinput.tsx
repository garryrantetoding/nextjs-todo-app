import React, { useState } from 'react';
import { Check, X, Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
  toggleVisibility: () => void;
  isVisible: boolean;
}

export default function PasswordInput({
  password,
  setPassword,
  toggleVisibility,
  isVisible,
}: PasswordInputProps) {
  return (
    <div className="relative mb-3">
      <input
        id="password"
        type={isVisible ? "text" : "password"}
        className="w-full text-sm text-slate-600 bg-white border border-slate-300 appearance-none rounded-lg ps-3.5 pe-10 py-2.5 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        placeholder="Enter your password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        aria-label="Password"
        required
      />
      {/* Toggle password visibility button */}
      <button
        className="absolute inset-y-0 end-0 flex items-center z-20 px-2.5 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus-visible:text-indigo-500 hover:text-indigo-500 transition-colors"
        type="button"
        onClick={toggleVisibility}
        aria-label={isVisible ? "Hide password" : "Show password"}
        aria-pressed={isVisible}
      >
        {isVisible ? (
          <EyeOff size={20} aria-hidden="true" />
        ) : (
          <Eye size={20} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
