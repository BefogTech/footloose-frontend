"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import framer-motion for animations
import TypingEffect from 'react-typing-effect'; // Import typing effect

const Hero = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}  // Initial state for animation
      animate={{ opacity: 1 }}  // Final state for animation
      transition={{ duration: 1 }}  // Duration of the fade effect
      className="relative flex flex-col lg:flex-row w-full h-auto bg-[#E5C3FF] opacity-[80%] p-6 lg:p-16"
    >
      {/* Left Side Content */}
      <div className="flex flex-col justify-center lg:w-1/2">
        {/* Main Heading */}
        <div className="mt-8 lg:mt-0">
          <h1 className="text-4xl font-semibold text-black">
            If your kid can{" "}
            <TypingEffect
              text={['dance', 'sing', 'mimic']}
              speed={100}
              eraseSpeed={50}
              typingDelay={500}
              className="text-[#003470] font-bold"
            />
          </h1>
        </div>

        {/* Subheading */}
        <div className="mt-6">
          <p className="text-base text-[#01C4FA] font-semibold">
            Lights, Camera, talent. Your video is just a stage away!
          </p>
        </div>

        {/* Shows We Accepted */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-[#003470]">
            Shows that We Accepted
          </h2>
        </div>

        {/* Description Paragraph */}
        <div className="mt-4">
          <p className="text-lg p-3 font-semibold text-black">
            Welcome to Foot Loose Monkey, the ultimate kid s talent competition
            platform! Young stars aged 5 to 15 can showcase their talents in
            dancing, singing, acting, and more. Our mission is to provide a fun,
            encouraging environment where children can express their creativity,
            build confidence, and compete for exciting prizes. Join us in
            celebrating the vibrant talents of our young performers. Register
            today and start discovering hidden talents!
          </p>
        </div>

        {/* Register Button */}
        <div className="mt-8 flex justify-center">
          <button className="px-6 py-2 bg-[#003470] text-white font-semibold rounded hover:bg-[#01C4FA] transition duration-300">
            Register
          </button>
        </div>

    
      </div>

      {/* Right Side Image */}
      <div className="mt-12 lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end">
        <Image
          src="/hero.png"
          width={731}
          height={480}
          alt="Hero"
          className="w-full h-auto"
        />
      </div>
    </motion.div>
  );
};

export default Hero;
