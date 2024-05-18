"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="w-full h-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            delay: 2,
            duration: 0.3,
            ease: "easeIn",
          },
        }}
      >
        {/* images */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 2.4,
              duration: 0.3,
              ease: "easeInOut",
            },
          }}
          className="w-[304px] h-[304px] xl:w-[478px] xl:h-[478px] mix-blend-lighten absolute"
        >
          <Image
            src="/assets/hbsoft.png"
            priority
            quality={100}
            fill
            alt=""
            className="object-contain"
          />
        </motion.div>

        {/* circle */}
        <motion.svg
          className="w-[300px] h-[300px] xl:w-[476px] xl:h-[476px] mix-blend-lighten"
          fill="transparent"
          viewBox="0 0 456 456"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{
              strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
              rotate: [120, 360],
            }}
            cx="230"
            cy="230"
            r="225"
            stroke="#00ff99"
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default Photo;
