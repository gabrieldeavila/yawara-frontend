import { useState, useEffect } from "react";

//boolean-> if it is true, will return true, otherwise it will return false, that is, it changes the order of the checkIfMobile function
export default function useMobile(widthMobile, boolean) {
  const [isMobile, setIsMobile] = useState("");

  const checkIfMobile = () => {
    if (window.innerWidth <= widthMobile) return boolean;
    else return !boolean;
  };

  useEffect(() => {
    //check for the first time
    setIsMobile(checkIfMobile());

    function handleResize() {
      // check when user resizes
      setIsMobile(checkIfMobile());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}
