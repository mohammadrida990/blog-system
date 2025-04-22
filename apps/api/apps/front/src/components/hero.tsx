"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const textVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const imageVariant = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.6, duration: 0.8, ease: "easeOut" },
  },
};

const Hero = () => {
  return (
    <div className="text-primary pt-12 overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row items-center flex-wrap px-3">
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col w-full justify-center md:w-2/5 items-center text-center"
        >
          <motion.p
            className="capitalize tracking-wide w-full text-3xl"
            variants={textVariants}
            custom={0}
          >
            Explore our posts and add your interested post to communicate with
            us
          </motion.p>

          <motion.h2
            className="capitalize text-wrap text-6xl my-5 font-bold leading-tight text-primary"
            variants={textVariants}
            custom={1}
          >
            Welcome to blog system
          </motion.h2>

          <motion.p
            className="text-3xl leading-normal"
            variants={textVariants}
            custom={2}
          >
            Join our community
          </motion.p>
        </motion.div>

        <motion.div
          className="w-full text-end md:w-3/5 flex justify-end"
          initial="hidden"
          animate="visible"
          variants={imageVariant}
        >
          <Image
            src="/assets/home.png"
            alt="Hero Image"
            width={300}
            priority
            height={300}
            className="w-full md:w-3/4 z-30"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
