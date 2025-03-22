"use client";
import { Card } from "@/components/Card";
import { SectionHeader } from "@/components/SectionHeader";
import Image from "next/image";
import bookImage from "@/assets/images/book-cover.png";
import JavaScriptIcon from "@/assets/icons/square-js.svg";
import HTMLIcon from "@/assets/icons/html5.svg";
import CssIcon from "@/assets/icons/css3.svg";
import ReactIcon from "@/assets/icons/react.svg";
import NestIcon from "@/assets/icons/nestjs.svg";
import MongoIcon from "@/assets/icons/mongodb-svgrepo-com.svg";
import GithubIcon from "@/assets/icons/github.svg";
import mapImage from "@/assets/images/map.png";
import smileMemoji from "@/assets/images/memoji-smile.png";
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/ToolboxItems";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const toolboxItems = [
  {
    title: "JavaScript",
    iconType: JavaScriptIcon,
  },
  {
    title: "React",
    iconType: ReactIcon,
  },
  {
    title: "Nest.js",
    iconType: NestIcon,
  },
  {
    title: "MongoDB",
    iconType: MongoIcon,
  },
  {
    title: "Git/GitHub",
    iconType: GithubIcon,
  },
  {
    title: "HTML 5",
    iconType: HTMLIcon,
  },
  {
    title: "TailwindCSS",
    iconType: CssIcon,
  },
];

const hobbies = [
  {
    title: "Travelling",
    emoji: "🚃",
    left: "5%",
    top: "5%",
  },
  {
    title: "Gaming",
    emoji: "🎮",
    left: "50%",
    top: "5%",
  },
  {
    title: "Badminton",
    emoji: "🏸",
    left: "10%",
    top: "35%",
  },
  {
    title: "Music",
    emoji: "🎵",
    left: "35%",
    top: "40%",
  },
  {
    title: "Exploring",
    emoji: "🔎",
    left: "70%",
    top: "45%",
  },
  {
    title: "Reading",
    emoji: "📖",
    left: "45%",
    top: "70%",
  },
];

export const AboutSection = () => {
  const constraintRef = useRef(null);

  const [positions, setPositions] = useState(
    hobbies.map((hobby) => ({
      id: hobby.title,
      left: hobby.left,
      top: hobby.top,
    })),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prevPositions) =>
        prevPositions.map((pos) => ({
          ...pos,
          left: pos.left + (Math.random() * 1000 - 10),
          top: pos.top + (Math.random() * 1000 - 10),
        })),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-20 lg:py-28">
      <div className="container">
        <SectionHeader
          eyebrow="About Me"
          title="A Glimpse Into My World"
          description="Learn more about who I am, what I do and what inspires me."
        />
        <div className="mt-20 flex flex-col gap-8 ">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              <CardHeader
                title="My Reads"
                description="Explore the books shaping my perspectives."
              />
              <div className="w-40 mx-auto mt-2 md:mt-0">
                <Image src={bookImage} alt="Book Cover" />
              </div>
            </Card>
            <Card className="h-[320px] p-0 md:col-span-3 lg:col-span-2">
              <CardHeader
                title="My Toolbox"
                description="Explore the technologies and tools I use to craft exceptional digital experiences."
              />
              <ToolboxItems
                items={toolboxItems}
                itemsWrapperClassName="animate-move-left [animation-duration:30s]"
              />
              <ToolboxItems
                items={toolboxItems}
                className="mt-6"
                itemsWrapperClassName="animate-move-right [animation-duration:20s]"
              />
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] p-0 flex flex-col md:col-span-3 lg:col-span-2">
              <CardHeader
                title="My Hobbies"
                description="Explore my interests and hobbies beyond coding."
                className="px-6 pt-6"
              />
              <div className="relative flex-1" ref={constraintRef}>
                {hobbies.map((hobby) => (
                  <motion.div
                    key={hobby.title}
                    className="inline-flex items-center gap-2 px-6 bg-gradient-to-tr from-emerald-300 to-sky-400 rounded-full py-1.5 absolute shadow-md cursor-pointer shadow-gray-400/20"
                    animate={{
                      left: hobby.left,
                      top: hobby.top,
                    }}
                    transition={{
                      duration: 0.4, // Smooth animation
                      ease: "easeInOut",
                    }}
                    drag
                    dragConstraints={constraintRef}
                  >
                    <span className="font-medium text-gray-950">
                      {hobby.title}
                    </span>
                    <p>{hobby.emoji}</p>
                  </motion.div>
                ))}
              </div>
              <div className="font-sans text-right relative right-4 bottom-2 text-white/60 font-semibold text-sm">
                Drag me :)
              </div>
            </Card>
            <Card className="h-[320px] p-0 relative md:col-span-2 lg:col-span-1">
              <Image
                src={mapImage}
                alt="Map"
                className="h-full w-full object-cover object-left-top"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr -z-20 animate-ping [animation-duration:2s] from-emerald-300 to-sky-400"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r -z-10 from-emerald-300 to-sky-400"></div>
                <Image
                  src={smileMemoji}
                  alt="smiling memoji"
                  className="size-20"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
