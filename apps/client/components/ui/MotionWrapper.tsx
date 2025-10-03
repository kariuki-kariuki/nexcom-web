import React from "react";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";


interface MotionWrapperProps {
  children: React.ReactNode;
  variants?: Variants;
  direction?: "up" | "down" | "left" | "right";
  amount?: number; // how much should be visible to trigger (0-1)
  once?: boolean; // trigger only once
  className?: string;
  style?: React.CSSProperties;
  distance?: number; // distance for offscreen position
  duration?: number; // animation duration
  bounce?: number; // spring bounce effect
  delay?: number; // animation delay
  type?: "spring" | "tween"; // animation type
  viewportMargin?: string; // viewport margin (e.g., "0px 0px -100px 0px")
}

export const MotionWrapper = ({
  children,
  direction = "up",
  variants,
  amount = 0.3,
  once = true,
  className,
  style,
  distance = 100,
  duration = 1.2,
  bounce = 0.2,
  delay = 0,
  type = "spring",
  viewportMargin,
}: MotionWrapperProps) => {
  const computedVariants = variants || getDefaultVariants({
    direction,
    distance,
    duration,
    bounce,
    delay,
    type,
  });

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount, once, margin: viewportMargin }}
      variants={computedVariants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

interface DefaultVariantsOptions {
  direction: "up" | "down" | "left" | "right";
  distance: number;
  duration: number;
  bounce: number;
  delay: number;
  type: "spring" | "tween";
}

// Function to compute default variants with configurable options
const getDefaultVariants = ({
  direction,
  distance,
  duration,
  bounce,
  delay,
  type,
}: DefaultVariantsOptions): Variants => {
  const transition = {
    type,
    ...(type === "spring" && { bounce }),
    duration,
    delay,
  };

  switch (direction) {
    case "up":
      return {
        offscreen: { y: distance, opacity: 0 },
        onscreen: {
          y: 0,
          opacity: 1,
          transition,
        },
      };
    case "down":
      return {
        offscreen: { y: -distance, opacity: 0 },
        onscreen: {
          y: 0,
          opacity: 1,
          transition,
        },
      };
    case "left":
      return {
        offscreen: { x: distance, opacity: 0 },
        onscreen: {
          x: 0,
          opacity: 1,
          transition,
        },
      };
    case "right":
      return {
        offscreen: { x: -distance, opacity: 0 },
        onscreen: {
          x: 0,
          opacity: 1,
          transition,
        },
      };
    default:
      return {
        offscreen: { y: distance, opacity: 0 },
        onscreen: {
          y: 0,
          opacity: 1,
          transition,
        },
      };
  }
};