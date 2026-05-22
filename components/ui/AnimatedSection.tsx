"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
}

export function AnimatedSection({
    children,
    className = "",
    delay = 0,
    direction = "up",
    ...props
}: AnimatedSectionProps) {
    const getVariants = () => {
        const offset = 40;
        switch (direction) {
            case "up":
                return {
                    hidden: { opacity: 0, y: offset },
                    visible: { opacity: 1, y: 0 },
                };
            case "down":
                return {
                    hidden: { opacity: 0, y: -offset },
                    visible: { opacity: 1, y: 0 },
                };
            case "left":
                return {
                    hidden: { opacity: 0, x: offset },
                    visible: { opacity: 1, x: 0 },
                };
            case "right":
                return {
                    hidden: { opacity: 0, x: -offset },
                    visible: { opacity: 1, x: 0 },
                };
            default:
                return {
                    hidden: { opacity: 0 },
                    visible: { opacity: 1 },
                };
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
            variants={getVariants()}
            className={className}
        >
            {children}
        </motion.div>
    );
}
