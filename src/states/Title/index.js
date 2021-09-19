import { useEffect } from "react";

function useTitle(tit) {

  useEffect(() => {
    document.title = `${tit} - Yawara`;
    return () => {
      document.title = `Yawara`;
    }
  }, [tit])

}

export default useTitle;

