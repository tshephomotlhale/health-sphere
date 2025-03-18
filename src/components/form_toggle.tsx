"use client";

import React, { useState } from "react";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";

export function FormToggle() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLogin ? (
        <LoginForm />
      ) : (
        <SignupForm />
      )}
      <div className="mt-4 text-center text-sm">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <button 
              onClick={toggleForm} 
              className="text-[#03B8FF] hover:underline"
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button 
              onClick={toggleForm} 
              className="text-[#03B8FF] hover:underline"
            >
              Log in
            </button>
          </>
        )}
      </div>
    </div>
  );
}