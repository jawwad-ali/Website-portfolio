import React from "react";
import { motion } from "framer-motion";
import "./About.scss";
import { AppWrap, MotionWrap } from "../../wrapper";
import { ReactComponent as FullStackIcon } from "../../assets/fullstack-icon.svg";
import { ReactComponent as AIAutomationIcon } from "../../assets/ai-automation-icon.svg";
import { ReactComponent as CMSIcon } from "../../assets/cms-icon.svg";
import { ReactComponent as TeachingIcon } from "../../assets/teaching-icon.svg";

// What I Do cards data
const aboutData = [
  {
    title: "Full Stack Development",
    description:
      "Building scalable web applications with Next.js, React, TypeScript, and Node.js. Specialized in modern frameworks and best practices.",
    icon: <FullStackIcon />,
  },
  {
    title: "AI & Automation",
    description:
      "Creating intelligent automation workflows using N8N, Python, and FastAPI. Developing Cloud-Native AI Agents for business optimization.",
    icon: <AIAutomationIcon />,
  },
  {
    title: "Headless CMS Expert",
    description:
      "Implementing modern content management with Sanity.io, managing structured databases, and building seamless content delivery systems.",
    icon: <CMSIcon />,
  },
  {
    title: "Teaching & Mentorship",
    description:
      "Lead Teacher at Governor House Sindh IT Program, guiding 1500+ students in modern web development and programming.",
    icon: <TeachingIcon />,
  },
];

// Stats data
const statsData = [
  { value: "1500+", label: "Students Taught" },
  { value: "40%", label: "Performance Boost" },
  { value: "5+", label: "Years Experience" },
  { value: "20+", label: "Projects Delivered" },
];

const About = () => {
  return (
    <>
      <h2 className="head-text">
        Building <span>Digital Solutions</span>
        <br />
        That Drive <span>Real Results</span>
      </h2>

      <p className="p-text app__about-tagline">
        Full Stack Engineer specializing in Next.js, Node.js, and Cloud-Native
        AI Agents
      </p>

      {/* Stats Section */}
      <motion.div
        whileInView={{ opacity: [0, 1], y: [30, 0] }}
        transition={{ duration: 0.5 }}
        className="app__about-stats"
      >
        {statsData.map((stat, index) => (
          <motion.div
            whileInView={{ opacity: [0, 1], scale: [0.8, 1] }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="app__about-stat-item"
            key={stat.label}
          >
            <h3 className="bold-text stat-value">{stat.value}</h3>
            <p className="p-text stat-label">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* What I Do Cards */}
      <div className="app__profiles">
        {aboutData.map((about, idx) => (
          <motion.div
            whileInView={{ opacity: [0, 1], y: [30, 0] }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.5, delay: idx * 0.1, type: "tween" }}
            className="app__profile-card"
            key={about.title + idx}
          >
            <div className="app__profile-icon">{about.icon}</div>
            <h3 className="bold-text app__profile-title">{about.title}</h3>
            <p className="p-text app__profile-description">
              {about.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
