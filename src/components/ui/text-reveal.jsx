"use client";;
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

export const TextRevealByWord = ({
  text,
  className,
}) => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  return (
    (<div ref={targetRef} className={cn("relative z-0 h-[150vh]", className)}>
      <div
        className={
          "sticky top-0 md:mx-auto leading-[10] flex h-[50%] md:max-w-[100%] w-2/3 items-center bg-transparent px-[1rem] py-[5rem]"
        }>
        <p
          ref={targetRef}
          className={
            "flex flex-wrap p-5 text-4xl line-spacing-10 font-bold text-black/20 dark:text-white/20 md:p-4 md:text-6xl lg:p-10 lg:text-6xl xl:text-5xl"
          }>
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              (<Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>)
            );
          })}
        </p>
      </div>
    </div>)
  );
};

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    (<span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={"absolute md:opacity-30 opacity-1000"}>{children}</span>
      <motion.span style={{ opacity: opacity }} className={"text-black dark:text-white"}>
        {children}
      </motion.span>
    </span>)
  );
};

export default TextRevealByWord;
