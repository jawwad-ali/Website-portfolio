import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import { images } from "../../constants";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { motion } from "framer-motion";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

export const navItem = ["home", "about", "work", "services", "skills", "contact"];

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Check localStorage and apply theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (newMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        <a href="#home">
          <img src={images.logo} alt="logo" />
        </a>
      </div> 

      <ul className="app__navbar-links">
        {navItem.map((item) => (
          <li className="app__flex p-text" key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>

      {/* Dark mode toggle */}
      <div className="app__navbar-theme-toggle" onClick={toggleDarkMode}>
        {darkMode ? (
          <BsSunFill className="theme-icon" />
        ) : (
          <BsMoonStarsFill className="theme-icon" />
        )}
      </div>

      {/* mobile menu */}
      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <HiX onClick={() => setToggle(false)} />
            <ul>
              {navItem.map((item) => (
                <li key={item}>
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                </li>
              ))}
              <li key="theme-toggle-mobile">
                <div className="mobile-theme-toggle" onClick={toggleDarkMode}>
                  {darkMode ? (
                    <>
                      <BsSunFill className="theme-icon-mobile" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <BsMoonStarsFill className="theme-icon-mobile" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
