import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  if (!items || !Array.isArray(items) || items.length === 0) {
    return <div className="md:h-[200px] md:m-[20px] flex items-center justify-center border rounded-3xl">No items to display</div>;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          to={`/${item?.id}`}
          key={item?.id || idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-zinc-800/[0.8] block rounded-3xl"
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
            <CardTitle>{item?.name || 'Name not available'}</CardTitle>
            <p className="text-zinc-400 font-small">{item?.username || 'Username not available'}</p>
            <CardDescription style={{ marginBottom: "8px" }}>
              {item?.data?.occupation || 'Occupation not available'}
            </CardDescription>
            <CardDescription style={{ marginBottom: "8px" }}>
              Experience: {item?.data?.experience || 'Not specified'}
            </CardDescription>
            <CardDescription style={{ marginBottom: "8px" }}>
              {item?.data?.additionalInfo || 'No additional information'}
            </CardDescription>
            <CardDescription>
              {item?.data?.skills && typeof item.data.skills === 'string' 
                ? item.data.skills.split(',').map((skill, index) => (
                    <span
                      key={index}
                      style={{
                        marginTop: "8px",
                        marginRight: "8px",
                        padding: "4px 8px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                        display: "inline-block",
                      }}
                    >
                      {skill.trim()}
                    </span>
                  ))
                : 'No skills listed'
              }
            </CardDescription>
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
        " px-4 md:px-0 rounded-ss-3xl md:rounded-2xl h-[10rem] md:h-full w-full p-0 overflow-hidden bg-black border border-transparent dark:border-white/[0.4] group-hover:border-slate-800 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-6">{children}</div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-violet-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("text-[#c7d2fe] font-bold tracking-wide mt-2", className)}>
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
