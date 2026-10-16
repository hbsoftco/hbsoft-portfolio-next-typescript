"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    category: "Podcast platform",
    title: "Bavexa",
    description:
      "A Persian podcast PWA architected for scale. I led its layered Vue/Nuxt frontend, validated API boundaries with Zod, and built audio and offline-first features.",
    stack: ["Nuxt 4", "Vue 3", "TypeScript", "Pinia", "Workbox"],
    image: null,
    live: null,
    github: null,
  },
  {
    num: "02",
    category: "Open-source library",
    title: "Diana Panel",
    description:
      "A Vue admin component library in active development, with typed DaisyUI-based components, consistent theming, and Persian/English support.",
    stack: ["Vue", "TypeScript", "DaisyUI"],
    image: null,
    live: null,
    github: "https://github.com/hbsoftco/diana-vue-admin-panel",
  },
  {
    num: "03",
    category: "Personal project",
    title: "Audio-to-Subtitle Tool",
    description:
      "A full-stack tool for audio upload, self-hosted Persian speech recognition, downloadable SRT files, and synchronized playback.",
    stack: ["Whisper", "Persian ASR", "SRT"],
    image: null,
    live: null,
    github: "https://github.com/hbsoftco/persian-speech-recognition",
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]);
  const reduceMotion = useReducedMotion();

  const handleSlideChange = (swiper: SwiperClass) => {
    setProject(projects[swiper.activeIndex] ?? projects[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: reduceMotion ? 0 : 0.65, duration: reduceMotion ? 0 : 0.3, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:min-h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[24px]">
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              <div>
                <p className="text-accent mb-2">{project.category}</p>
                <h1 className="text-[36px] xl:text-[42px] font-bold leading-tight text-white">
                  {project.title}
                </h1>
              </div>
              <p className="text-white/60 max-w-[600px]">{project.description}</p>
              <ul className="flex flex-wrap gap-x-3 gap-y-1" aria-label="Technologies">
                {project.stack.map((item, index) => (
                  <li key={item} className="text-lg text-accent">
                    {item}{index !== project.stack.length - 1 && ","}
                  </li>
                ))}
              </ul>
              <div className="border border-white/20" />
              {(project.live || project.github) && (
                <div className="flex items-center gap-4">
                  {project.live && (
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} live project`} className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                            <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent><p>Live project</p></TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  {project.github && (
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} GitHub repository`} className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                            <BsGithub className="text-white text-3xl group-hover:text-accent" />
                          </a>
                        </TooltipTrigger>
                        <TooltipContent><p>GitHub repository</p></TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((item) => (
                <SwiperSlide key={item.num}>
                  <div className="h-[460px] relative group flex justify-center items-center bg-[#232329] overflow-hidden">
                    {item.image ? (
                      <Image src={item.image} fill className="object-cover" alt={`${item.title} project visual`} />
                    ) : (
                      <div className="w-full h-full flex flex-col justify-center items-center px-8 text-center border border-white/10" aria-label={`${item.title} project visual`}>
                        <span className="text-accent text-lg mb-6">{item.category}</span>
                        <span className="text-4xl xl:text-5xl font-semibold text-white leading-tight">{item.title}</span>
                        <span className="mt-8 h-[2px] w-24 bg-accent" aria-hidden="true" />
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] h-[44px] w-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Work;
