import { useEffect, useState } from "react";

export default function useHandleScroll() {
  const [bottom, setBottom] = useState(false);
  const handleScroll = () => {
    const isScrolled =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight;

    setBottom(() => isScrolled);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return bottom;
}
