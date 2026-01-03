import React from "react";
import { AppWrap, MotionWrap } from "../../wrapper";
import { motion } from "framer-motion";
import "./Skills.scss";
import images from "../../constants/images";

// Skills data from resume
const skillsData = [
  { name: "OpenAI Agents SDK", icon: images.openaiLogo, bgColor: "#FFFFFF", isImage: true },
  { name: "Docker", icon: images.dockerLogo, bgColor: "#FFFFFF", isImage: true },
  { name: "N8N", icon: images.n8nLogo, bgColor: "#FFFFFF", isImage: true },
  { name: "Next.js", icon: images.nextjs, bgColor: "#FFFFFF", isImage: true },
  { name: "TypeScript", icon: images.typescriptLogo, bgColor: "#FFFFFF", isImage: true },
  { name: "Node.js", icon: images.nodejsLogo, bgColor: "#FFFFFF", isImage: true },
  { name: "Python", icon: images.pythonLogo, bgColor: "#FFFFFF", isImage: true },
  { name: "FastAPI", icon: images.fastapi, bgColor: "#FFFFFF", isImage: true },
  { name: "Tailwind CSS", icon: images.tailwindcssLogo, bgColor: "#FFFFFF", isImage: true },
  { name: "PostgreSQL", icon: images.postgresqlLogo, bgColor: "#FFFFFF", isImage: true },
  { name: "Firebase", icon: images.firebaseLogo, bgColor: "#FFFFFF", isImage: true },
  { name: "Redux", icon: images.reduxLogo, bgColor: "#FFFFFF", isImage: true },
  { name: "GraphQL", icon: images.graphqlLogo, bgColor: "#FFFFFF", isImage: true },
  { name: "REST API", icon: images.restapiLogo, bgColor: "#FFFFFF", isImage: true },
  { name: "Git", icon: images.gitLogo, bgColor: "#FFFFFF", isImage: true },
];

// Experience data from resume
const experiencesData = [
  {
    year: "2024 - Present",
    experiences: [
      {
        title: "Full Stack Engineer",
        company: "Avialdo Solutions",
        description: "Engineering full-stack web applications utilizing Next.js 14, Sanity CMS, Python and FastAPI.",
      },
      {
        title: "Lead Teacher",
        company: "GIAIC - Governor House Sindh",
        description: "Leading 1500+ students in IT Program for the last two years.",
      },
    ],
  },
  {
    year: "2021 - 2024",
    experiences: [
      {
        title: "Full Stack Developer",
        company: "Lusion Tech",
        description: "Architected and optimized end-to-end solutions using Next.js 13, TypeScript, and Tailwind CSS, resulting in 40% faster page load speed. Implemented Headless CMS via Sanity.io and managed structured Databases and ORMs.",
      },
    ],
  },
  {
    year: "2019",
    experiences: [
      {
        title: "Frontend Developer",
        company: "IOTA Square, Karachi",
        description: "Developed dynamic user interfaces and front-end logic using React.js and Gatsby.js frameworks.",
      },
    ],
  },
];

const Skills = () => {
  return (
    <>
      <h2 className="head-text">Skills & Experience</h2>
      <p className="p-text app__skills-subtitle">
        My technical expertise and professional journey
      </p>

      <div className="app__skills-container">
        {/* Skills Section */}
        <motion.div className="app__skills-list">
          <h3 className="bold-text app__skills-section-title">Technical Skills</h3>
          <div className="app__skills-grid">
            {skillsData.map((skill, index) => (
              <motion.div
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="app__skills-item app__flex"
                key={skill.name}
              >
                <div
                  className="app__flex app__skills-icon"
                  style={{
                    backgroundColor: skill.bgColor,
                    border: skill.bgColor === "#FFFFFF" ? "2px solid #e0e0e0" : "none"
                  }}
                >
                  {skill.isImage ? (
                    <img src={skill.icon} alt={skill.name} className="skill-icon-image" />
                  ) : (
                    <span className="skill-icon-text">{skill.icon}</span>
                  )}
                </div>
                <p className="app__skills-name">{skill.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Experience Section */}
        <motion.div className="app__skills-exp">
          <h3 className="bold-text app__skills-section-title">Work Experience</h3>
          {experiencesData.map((yearData, index) => (
            <motion.div
              whileInView={{ opacity: [0, 1], x: [50, 0] }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="app__skills-exp-item"
              key={yearData.year}
            >
              <div className="app__skills-exp-year">
                <p className="bold-text">{yearData.year}</p>
              </div>
              <div className="app__skills-exp-works">
                {yearData.experiences.map((exp, idx) => (
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="app__skills-exp-work"
                    key={exp.title + idx}
                  >
                    <h4 className="bold-text">{exp.title}</h4>
                    <p className="p-text app__exp-company">{exp.company}</p>
                    <p className="p-text app__exp-description">
                      {exp.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
