import React from "react";
import Image from "next/image";

import { ModeToggle } from "@/components/mode-toggle";
import { FormToggle } from "@/components/form_toggle";

export default function Login() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center md:w-2/3 p-8 bg-[#03B8FF] bg-[length:100px_100px] bg-gradient-to-b from-white/20 to-transparent">
        {/* Optional: Add content here if needed */}
      </div>

      {/* Right Section */}
      <div className="relative flex flex-col items-center justify-center w-full md:w-1/2 p-4 sm:p-8">
        {/* Content Container */}
        <div className="flex flex-col w-full max-w-md space-y-8">
          {/* Navigation Bar */}
          <nav className="absolute top-0 left-0 w-full flex items-center justify-between p-6">
            {/* Logo */}
            <Image
              src="/healthsphere.svg"
              alt="Health Sphere Logo"
              width={200}
              height={30}
              priority
            />

            {/* Mode Toggle */}
            <ModeToggle />
          </nav>

          {/* Login Form */}
          <div className="mt-10">
            <FormToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
