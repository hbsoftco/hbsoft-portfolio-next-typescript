"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useNavigationVisualReady } from "./NavigationProgress";

interface PageProps {
  children?: ReactNode;
}

const PageTransition = ({ children }: PageProps) => {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const onVisualReady = useNavigationVisualReady();

  return (
    <AnimatePresence>
      <div key={pathname}>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{
            opacity: 0,
            transition: { delay: reduceMotion ? 0 : 0.6, duration: reduceMotion ? 0 : 0.3, ease: "easeInOut" },
          }}
          onAnimationComplete={() => onVisualReady(pathname)}
          className="h-screen w-screen fixed bg-primary top-0 pointer-events-none"
        />

        {children}
      </div>
    </AnimatePresence>
  );
};

export default PageTransition;
