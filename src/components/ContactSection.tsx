import React from "react";
import { motion } from "motion/react";
import Earth from "./Icons/Earth";

export const ContactSection = () => {
  return (
    <section id="contact" className="min-h-screen py-24 px-4 relative">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
      >
        Contact Me
      </motion.h2>
      <div className="container grid grid-cols-2">
        <div className="text-foreground bg-white/10 flex flex-col text-center backdrop-blur-sm">
          <div className="font-bold text-2xl">My Email:</div>
          <div className="grid-rows-2"></div>
        </div>
      </div>
      
    </section>
  );
};
