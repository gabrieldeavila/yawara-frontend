import { useEffect, useState } from "react";

function usePosition(popupRef) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleResize() {
      let position = popupRef.current.getBoundingClientRect();
      setPos({ bottom: position.bottom, left: position.left });
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [popupRef]);

  return pos;
}

export default usePosition;
