import { useState } from "react";
import "./Footer.scss";

import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";

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
    setLoading(true);
    const contact = {
      _type: "contact",
      name: name,
      email: email,
      message: message,
    };

    client.create(contact).then(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    });
  };

  return (
    <>
      <h2>Take a coffee & chat with me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="email" />
          <a href="mailto:alijawwad001@yahoo.com" className="p-text">
            alijawwad001@yahoo.com
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
        <div>
          <h3>Thank you for getting in touch</h3>
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