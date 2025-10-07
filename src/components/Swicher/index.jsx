import React, { useEffect, useState } from "react";
import "./swicher.scss";

const Swicher = () => {
  const [darkMode, setDarkMode] = useState(() => {
   // перевіряємо тему в локал сторажє та встановлюэмо тему браузеру
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    } else {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  });

 
  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, []);

  //Записуємо тему користувача
  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <label
      className="switch"
      title={darkMode ? "Switch to Light mode" : "Switch to Dark mode"}
    >
      <input
        type="checkbox"
        id="toggle"
        checked={darkMode}
        onChange={handleToggle}
      />
      <span className="slider"></span>
    </label>
  );
};

export default Swicher;
