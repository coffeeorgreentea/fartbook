import { useState, useEffect } from "react";

const useScreenSize = () => {
  // State to store the current screen dimensions
  const [dimensions, setDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  // Use useEffect to run the effect after a render
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Function to update the screen dimensions state
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Add the resize event listener to the window
    window.addEventListener("resize", handleResize);

    // Clean up the resize event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Only run the effect once on mount

  return dimensions;
};

export default useScreenSize;
