import React from "react";
import { navItem } from "../components/Navbar/Navbar";
 
const NavigationDots = ({ active }) => {
  return ( 
    <div className="app__navigation">
      {navItem.map((item, idx) => ( 
        <a
          href={`#${item}`}
          key={item + idx}
          className="app__navigation-dot"
          style={active === item ? { backgroundColor: "#313BAC" } : {}}
        />
      ))}
    </div> 
  );
};

export default NavigationDots;
