import { LazyMotion, domAnimation, m } from "framer-motion";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  name?: string;
  variants: any;
  isTransitioning?: boolean;
  setIsTransitioning?: (value: boolean) => void;
};

const Transition = ({
  children,
  className,
  name,
  variants,
  isTransitioning,
  setIsTransitioning,
}: Props) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        onAnimationStart={
          setIsTransitioning && (() => setIsTransitioning(true))
        }
        onAnimationComplete={
          setIsTransitioning && (() => setIsTransitioning(false))
        }
        className={className}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        key={name}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};

export default Transition;
