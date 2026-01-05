import { useState } from "react";
import "./Footer.scss";
import emailjs from "@emailjs/browser";
import { MdEmail } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa";

import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import { emailConfig } from "../../emailConfig";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message } = formData;

  // get value of input field
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // onSubmit function
  const handleSubmit = () => {
    // Form validation
    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);

    // Prepare template parameters
    const templateParams = {
      from_name: name,
      from_email: email,
      to_email: "connectaj09@gmail.com",
      message: message,
      message_time: new Date().toLocaleString(),
    };

    // Send email using EmailJS
    emailjs
      .send(emailConfig.serviceID, emailConfig.templateID, templateParams, emailConfig.publicKey)
      .then(
        (response) => {
          console.log("Email sent successfully!", response.status, response.text);

          // Also save to Sanity (optional backup)
          const contact = {
            _type: "contact",
            name: name,
            email: email,
            message: message,
          };

          client.create(contact).then(() => {
            setLoading(false);
            setIsFormSubmitted(true);
          }).catch((err) => {
            console.error("Sanity save error:", err);
            // Still mark as submitted since email was sent
            setLoading(false);
            setIsFormSubmitted(true);
          });
        },
        (error) => {
          console.error("Email sending failed:", error);
          setLoading(false);
          alert("Failed to send message. Please try again or contact directly at connectaj09@gmail.com");
        }
      );
  };

  return (
    <>
      <h2>Take a coffee & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <MdEmail className="app__footer-card-icon" />
          <a href="mailto:connectaj09@gmail.com" className="p-text">
            connectaj09@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <FaCalendarCheck className="app__footer-card-icon" />
          <a href="https://calendly.com/connectaj09/30min" target="_blank" rel="noopener noreferrer" className="p-text">
            Book a Coffee Chat
          </a>
        </div>
      </div>

      {/* form */}
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              onChange={handleInputChange}
              value={name}
              name="name"
              placeholder="Your Name"
            />
          </div>

          <div className="app__flex">
            <input
              className="p-text"
              onChange={handleInputChange}
              value={email}
              name="email"
              placeholder="Your Email"
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Message"
              value={message}
              name="message"
              onChange={handleInputChange}
            />
          </div>
          <button className="p-text" onClick={handleSubmit}>
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      ) : (
        <div className="app__footer-success">
          <h3>Thank you for getting in touch!</h3>
          <button
            className="p-text"
            onClick={() => {
              setIsFormSubmitted(false);
              setFormData({ name: "", email: "", message: "" });
            }}
          >
            Send Another Message
          </button>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__primarybg"
); 