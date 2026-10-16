"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { motion } from "framer-motion";

import {
  FaCode,
  FaCodeBranch,
  FaProjectDiagram,
  FaUsers,
} from "react-icons/fa";
import {
  SiAngular,
  SiDocker,
  SiExpress,
  SiGitlab,
  SiJenkins,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNestjs,
  SiNginx,
  SiNodedotjs,
  SiNuxtdotjs,
  SiPrisma,
  SiPwa,
  SiRabbitmq,
  SiRedis,
  SiSequelize,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";

// about data
const about = {
  title: "About me",
  description:
    "I specialize in Vue.js and Nuxt.js architecture, type-safe applications, and offline-first PWAs. My work spans complex consumer platforms and admin panels, with close collaboration across product and design teams. I also mentor engineers and review code to keep systems maintainable.",
  info: [
    {
      fieldName: "Name",
      fieldValue: "Hossein Bajan",
    },
    {
      fieldName: "Experience",
      fieldValue: "9+ years",
    },
    {
      fieldName: "Email",
      fieldValue: "hossein.bajan@gmail.com",
    },
    {
      fieldName: "Focus",
      fieldValue: "Vue.js / Nuxt.js",
    },
  ],
};

// experience data
const experience = {
  icon: "/assets/resume/badge.svg",
  title: "My experience",
  description:
    "Frontend architecture, full-stack delivery, and technical leadership across consumer products, admin platforms, and offline-first applications.",
  items: [
    {
      company: "LastSecond",
      position: "Senior Front-End Developer",
      duration: "06/2024 - Present",
    },
    {
      company: "Aminsoft",
      position: "Technical Team Lead – Full Stack Developer",
      duration: "04/2020 - 05/2024",
    },
    {
      company: "Malima",
      position: "Co-Founder – Full Stack Developer",
      duration: "09/2020 - 12/2023",
    },
    {
      company: "RoydadOn",
      position: "Front-End Developer",
      duration: "10/2016 - 11/2019",
    },
  ],
};

// education data
const education = {
  icon: "/assets/resume/cap.svg",
  title: "My education",
  description:
    "Occaecat do eiusmod ullamco id tempor labore consectetur tempor.",
  items: [
    {
      institution: "Islamic Azad University",
      degree: "Master's degree, Computer Software Engineering",
      duration: "2018",
    },
    {
      institution: "Islamic Azad University",
      degree: "Bachelor's degree, Computer Science",
      duration: "2014",
    },
  ],
};

// skills data
const skills = {
  title: "My skills",
  description:
    "Tools and practices I use across frontend architecture, full-stack development, and delivery.",
  groups: [
    {
      title: "Frontend",
      items: [
        { icon: <SiVuedotjs />, name: "Vue.js" },
        { icon: <SiNuxtdotjs />, name: "Nuxt.js" },
        { icon: <SiTypescript />, name: "TypeScript" },
        { icon: <SiAngular />, name: "Angular" },
        { icon: <SiTailwindcss />, name: "Tailwind CSS" },
        { icon: <SiPwa />, name: "Progressive Web Apps" },
      ],
    },
    {
      title: "Backend",
      items: [
        { icon: <SiNodedotjs />, name: "Node.js" },
        { icon: <SiNestjs />, name: "NestJS" },
        { icon: <SiExpress />, name: "Express.js" },
        { icon: <FaCode />, name: "REST APIs" },
        { icon: <SiRedis />, name: "Redis" },
        { icon: <SiRabbitmq />, name: "RabbitMQ" },
      ],
    },
    {
      title: "Databases and ORM",
      items: [
        { icon: <SiMysql />, name: "MySQL" },
        { icon: <SiMongodb />, name: "MongoDB" },
        { icon: <SiPrisma />, name: "Prisma" },
        { icon: <SiSequelize />, name: "Sequelize" },
      ],
    },
    {
      title: "DevOps",
      items: [
        { icon: <SiDocker />, name: "Docker / Compose" },
        { icon: <SiNginx />, name: "Nginx" },
        { icon: <SiGitlab />, name: "GitLab CI/CD" },
        { icon: <SiJenkins />, name: "Jenkins" },
        { icon: <SiLinux />, name: "Linux" },
      ],
    },
    {
      title: "Engineering",
      items: [
        { icon: <FaUsers />, name: "Agile / Scrum" },
        { icon: <FaCodeBranch />, name: "Code review" },
        { icon: <FaUsers />, name: "Team mentoring" },
        { icon: <FaProjectDiagram />, name: "System architecture" },
      ],
    },
  ],
};

const Resume = () => {
  return (
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
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0">
            <TabsTrigger value={"experience"}>Experience</TabsTrigger>
            <TabsTrigger value={"education"}>Education</TabsTrigger>
            <TabsTrigger value={"skills"}>Skills</TabsTrigger>
            <TabsTrigger value={"about"}>About me</TabsTrigger>
          </TabsList>

          {/* content */}
          <div className="min-h-[70vh] w-full">
            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {experience.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                            {item.position}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.company}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {education.description}
                </p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {education.items.map((item, index) => {
                      return (
                        <li
                          key={index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left">
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.institution}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* skills */}
            <TabsContent value="skills" className="w-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                </div>
                <ScrollArea className="h-[400px]">
                  <div className="flex flex-col gap-8 pr-4">
                    {skills.groups.map((group) => (
                      <section key={group.title} aria-label={group.title}>
                        <h4 className="text-xl font-semibold mb-4">{group.title}</h4>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px] gap-4">
                          {group.items.map((skill) => (
                            <li key={skill.name}>
                              <TooltipProvider delayDuration={100}>
                                <Tooltip>
                                  <TooltipTrigger aria-label={skill.name} className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                                    <span aria-hidden="true" className="text-6xl group-hover:text-accent transition-all duration-300">
                                      {skill.icon}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{skill.name}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* about */}
            <TabsContent
              value="about"
              className="w-full text-center xl:text-left"
            >
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">
                  {about.description}
                </p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                  {about.info.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="flex items-center justify-center xl:justify-start gap-4"
                      >
                        <span className="text-white/60">{item.fieldName}</span>
                        <span className="text-xl">{item.fieldValue}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
