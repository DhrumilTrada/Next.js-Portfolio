"use client";

import { motion } from "framer-motion";
import { Coffee } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import grainImage from "@/assets/images/grain.jpg";

const experience = {
  title: "Backend Intern",
  company: "Kiara TechX",
  period: "December 2024 - Present",
  icon: Coffee,
  points: [
    "Designed and implemented MongoDB schemas to structure and optimize data storage for efficient querying and retrieval.",
    "Optimized build times for a Vue/Astro project with Strapi integration by leveraging local caching, enhancing the performance of the OpenObserve open-source initiative.",
    "Developed and maintained backend services using NestJS and TypeScript, ensuring scalability, maintainability, and adherence to best practices.",
    "Designed and documented RESTful APIs using NestJS and Swagger, enhancing API usability, maintainability, and developer efficiency. Implemented modular and scalable API structures to ensure smooth integration with front-end and third-party services.",
    "Working on creating automated pipelines using Gitlab CI/CD to improve development workflow and ensure continuous delivery of high-quality code.",
  ],
};

const TimelineSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="py-8 relative inset-0 px-4">
      <div className="container mx-auto">
        <div
          className="absolute inset-0 -z-10 opacity-5"
          style={{ backgroundImage: `url(${grainImage.src})` }}
        ></div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <SectionHeader
            eyebrow="Timeline"
            title="My Work Experience"
            description="Check out my work and what I've been working on."
          />
        </motion.div>

        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <div
            className="
              bg-[#1A2333]/80 backdrop-blur-sm rounded-2xl p-8 
              shadow-[0_0_15px_rgba(49,230,189,0.1)] 
              border border-emerald-500/10 
              hover:border-emerald-400/30 
              hover:shadow-[0_0_20px_rgba(49,230,189,0.15)] 
              transition-all duration-300
            "
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-emerald-300/20 p-4 rounded-full backdrop-blur-sm border border-emerald-400/30">
                <Coffee className="w-6 h-6 text-emerald-300" />
              </div>
              <div>
                <h3 className="text-2xl font-sans font-bold text-white">
                  {experience.title}
                </h3>
                <p className="text-emerald-400 font-sans font-medium">
                  {experience.company}
                </p>
                <p className="text-gray-400 text-sm">{experience.period}</p>
              </div>
            </div>

            <ul className="space-y-4 text-gray-300">
              {experience.points.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-2 h-2 bg-emerald-300 rounded-full mt-2 flex-shrink-0"></span>
                  <p className="font-semibold">{point}</p>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TimelineSection;
