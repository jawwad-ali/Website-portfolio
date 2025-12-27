import React from "react";
import { motion } from "framer-motion";
import "./Services.scss";
import { AppWrap, MotionWrap } from "../../wrapper";

const servicesData = [
  {
    icon: "🤖",
    title: "AI Workflow Automation",
    description: "Automate repetitive business tasks using N8N and Python. Save 20+ hours per week on data entry, email workflows, and report generation.",
    techStack: ["N8N", "Python", "FastAPI", "OpenAI"],
    price: "From $1,500",
    calendlyLink: "https://calendly.com" // Update with your actual Calendly link
  },
  {
    icon: "🚀",
    title: "MVP Development",
    description: "Launch your startup idea in 2-4 weeks. Full-stack web applications with authentication, payments, CMS, and modern UI.",
    techStack: ["Next.js", "TypeScript", "Sanity", "Stripe"],
    price: "From $3,000",
    calendlyLink: "https://calendly.com"
  },
  {
    icon: "🎨",
    title: "Figma to Code",
    description: "Pixel-perfect conversion of your designs into production-ready React/Next.js code. Clean, maintainable, and responsive.",
    techStack: ["React", "Next.js", "Tailwind", "TypeScript"],
    price: "From $800",
    calendlyLink: "https://calendly.com"
  }
];

const Services = () => {
  return (
    <>
      <div className="app__services-header">
        <p className="p-text app__services-label">WHAT I OFFER</p>
        <h2 className="head-text">Services</h2>
        <p className="p-text app__services-subheading">
          Professional solutions for startups and growing businesses
        </p>
      </div>

      <div className="app__services-container">
        {servicesData.map((service, index) => (
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ y: -10 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__service-card"
            key={service.title + index}
          >
            <div className="app__service-icon">
              <span>{service.icon}</span>
            </div>

            <h3 className="bold-text app__service-title">{service.title}</h3>

            <p className="p-text app__service-description">
              {service.description}
            </p>

            <div className="app__service-tech">
              {service.techStack.map((tech, idx) => (
                <span key={idx} className="app__service-tech-badge">
                  {tech}
                </span>
              ))}
            </div>

            <div className="app__service-footer">
              <p className="bold-text app__service-price">{service.price}</p>
              <a
                href={service.calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="app__service-button"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="app__services-cta"
      >
        <h3 className="head-text app__services-cta-heading">
          Ready to Start Your Project?
        </h3>
        <p className="p-text app__services-cta-subtext">
          Let's discuss how I can help bring your idea to life
        </p>
        <a
          href="https://calendly.com"
          target="_blank"
          rel="noopener noreferrer"
          className="app__services-cta-button"
        >
          Schedule Free Consultation
        </a>
        <p className="p-text app__services-cta-email">
          Or email: <a href="mailto:connectaj09@gmail.com">connectaj09@gmail.com</a>
        </p>
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Services, "app__services"),
  "services",
  "app__whitebg"
);
