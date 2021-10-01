import { useCookies } from "react-cookie";
import React, { useState, useEffect } from "react";
import { IoMdMoon, IoMdSunny, IoMdBicycle } from "react-icons/io";

function useTheme(change = false, returnTheme = false) {
  // 0 = light
  // 1 = dark
  const [cookies, setCookie] = useCookies();
  const [theme, setTheme] = useState([
    <IoMdBicycle />,
    parseInt(cookies.theme_option) === 0 ? "light" : "dark",
  ]);

  const changeCookie = () => {
    setCookie("theme_option", parseInt(cookies.theme_option) === 0 ? 1 : 0, {
      path: "/",
    });
  };

  useEffect(() => {
    if (cookies.theme_option === undefined) {
      setCookie("theme_option", 0, { path: "/" });
    } else if (change) {
      changeCookie();
    }

    if (returnTheme) {
      switch (parseInt(cookies.theme_option)) {
        case 0:
          setTheme([<IoMdMoon onClick={() => changeCookie()} />, "light"]);
          break;
        case 1:
          setTheme([<IoMdSunny onClick={() => changeCookie()} />, "dark"]);
          break;
        default:
          setCookie("theme_option", 0);
          setTheme([<IoMdMoon onClick={() => changeCookie()} />, "light"]);
      }
    }
  }, [cookies]);

  return [theme, changeCookie];
}
export default useTheme;
