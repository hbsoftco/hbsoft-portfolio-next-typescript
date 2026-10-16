"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { FormEvent } from "react";

import { motion, useReducedMotion } from "framer-motion";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+98) 915-585-9539",
    href: "tel:+989155859539",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "hossein.bajan@gmail.com",
    href: "mailto:hossein.bajan@gmail.com",
  },
];

const Contact = () => {
  const reduceMotion = useReducedMotion();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const name = `${fields.get("firstName") ?? ""} ${fields.get("lastName") ?? ""}`.trim();
    const subject = `Portfolio inquiry: ${fields.get("topic") ?? "General"}`;
    const body = [
      `Name: ${name}`,
      `Email: ${fields.get("email") ?? ""}`,
      `Phone: ${fields.get("phone") ?? ""}`,
      "",
      String(fields.get("message") ?? ""),
    ].join("\n");
    window.location.href = `mailto:hossein.bajan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          delay: reduceMotion ? 0 : 0.65,
          duration: reduceMotion ? 0 : 0.3,
          ease: "easeIn",
        },
      }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-[30px]">
          {/* form */}
          <div className="w-full xl:w-[65%] xl:flex-none order-2 xl:order-none">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl">
              <h1 className="text-4xl text-accent">Get in touch</h1>
              <p className="text-white/60">
                Send an engineering question or collaboration note. This form opens
                your email app so you can review and send the message yourself.
              </p>
              {/* input */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input type="text" name="firstName" aria-label="First name" placeholder="First name" required />
                <Input type="text" name="lastName" aria-label="Last name" placeholder="Last name" required />
                <Input type="email" name="email" aria-label="Email address" placeholder="Email address" required />
                <Input type="tel" name="phone" aria-label="Phone number (optional)" placeholder="Phone number (optional)" />
              </div>
              {/* select */}
              <Select name="topic">
                <SelectTrigger className="w-full" aria-label="Inquiry topic">
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a topic</SelectLabel>
                    <SelectItem value="Frontend Architecture">Frontend Architecture</SelectItem>
                    <SelectItem value="Web Applications">Web Applications</SelectItem>
                    <SelectItem value="Offline-First PWAs">Offline-First PWAs</SelectItem>
                    <SelectItem value="Technical Leadership">Technical Leadership</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* textarea */}
              <Textarea
                className="h-[200px]"
                name="message"
                aria-label="Message"
                placeholder="Type your message here."
                required
              />
              {/* btn */}
              <Button type="submit" size="default" className="max-w-48">
                Open email draft
              </Button>
            </form>
          </div>
          {/* info */}
          <div className="flex-1 min-w-0 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => {
                return (
                  <li key={index} className="flex items-center gap-6">
                    <div className="w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center">
                      <div className="text-[28px]">{item.icon}</div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60">{item.title}</p>
                      <a href={item.href} className="text-xl hover:text-accent break-words">{item.description}</a>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
