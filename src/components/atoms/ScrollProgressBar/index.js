import { useState, useEffect } from "react";

const ScrollProgressBar = () => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScroll(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${scroll}%`,
        height: "5px",
        backgroundColor: "#29e",
        zIndex: 9999,
        transition: "none",
      }}
    />
  );
};

export default ScrollProgressBar;
