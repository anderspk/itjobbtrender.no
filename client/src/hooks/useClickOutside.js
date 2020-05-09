import { useEffect } from "react";

const useClickOutside = (elRef, callback) => {
  useEffect(() => {
    console.log("in");
    const handleClickOutside = (e) => {
      console.log("clicked");
      if (elRef?.current?.contains(e.target) && callback) {
        callback(e);
      }

      document.addEventListener("click", handleClickOutside, true);
      return () => {
        document.removeEventListener("click", handleClickOutside, true);
      };
    };
  }, [callback, elRef]);
};

export default useClickOutside;
