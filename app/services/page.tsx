"use client";

import { motion } from "framer-motion";
import { BsArrowDownRight } from "react-icons/bs";

const services = [
  {
    num: "01",
    title: "Frontend Architecture",
    description:
      "Architecture for maintainable Vue.js and Nuxt.js applications, with typed data boundaries and reusable components.",
  },
  {
    num: "02",
    title: "Web Applications",
    description:
      "End-to-end development of complex frontends and admin panels with TypeScript, APIs, and dependable delivery workflows.",
  },
  {
    num: "03",
    title: "Offline-First PWAs",
    description:
      "Progressive web applications with resilient caching, offline access, and service worker integration.",
  },
  {
    num: "04",
    title: "Technical Leadership",
    description:
      "Code review, mentoring, and architecture decisions informed by hands-on delivery across product teams.",
  },
];

const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: {
              delay: 2.3,
              duration: 0.3,
              ease: "easeIn",
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-[60px]"
        >
          {services.map((service, index) => {
            return (
              <div
                key={index}
                className="flex-1 flex flex-col justify-center gap-6 group"
              >
                {/* top */}
                <div className="w-full flex justify-between items-center">
                  <div className="text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500">
                    {service.num}
                  </div>
                  <span aria-hidden="true" className="w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center group-hover:-rotate-45">
                    <BsArrowDownRight className="text-primary text-3xl" />
                  </span>
                </div>
                {/* heading */}
                <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">
                  {service.title}
                </h2>
                {/* description */}
                <p className="text-white/60">{service.description}</p>
                {/* border */}
                <div className="border-b border-white/20 w-full"></div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
