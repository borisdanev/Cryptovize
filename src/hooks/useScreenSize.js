import { useState, useEffect } from "react";
const useScreenSize = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handler = window.addEventListener("resize", () =>
      setScreenWidth(window.innerWidth)
    );
    return () => window.removeEventListener("resize", handler);
  }, [screenWidth]);
  return screenWidth;
};
export default useScreenSize;
