import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
       <Link to={`${item?.link}`}
          key={item?.link}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.name}</CardTitle>
            <CardDescription style={{ marginBottom: "8px" }}>{item.occupation}</CardDescription>
            <CardDescription style={{ marginBottom: "8px" }}>{item.experience}</CardDescription>
            <CardDescription style={{ marginBottom: "8px" }}>{item.info}</CardDescription>
            <CardDescription>
              {item.skills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    marginTop: "8px",
                    marginRight: "8px",
                    padding: "4px 8px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                  }}
                >
                  {skill}
                </span>
              ))}
            </CardDescription>{" "}
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    
    <div
      className={cn(
        "rounded-2xl h-full w-full p-0 overflow-hidden bg-black border border-transparent dark:border-white/[0.4] group-hover:border-slate-800 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-2", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({ className, children }) => {
  return (
    <p
      className={cn(
        "mt-4 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};
