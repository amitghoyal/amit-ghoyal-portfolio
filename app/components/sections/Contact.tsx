"use client";

import {
  Mail,
  Phone,
  MapPin,
  Copy,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

export default function Contact() {
  const copyEmail = async () => {
    await navigator.clipboard.writeText(
      "amittghoyal@gmail.com"
    );

    alert("Email copied!");
  };

  return (
    <section className="section" id="contact">
      <div className="container">

        <div className="sec-head">
          <p className="sec-tag">Get In Touch</p>

          <h2 className="sec-h2">
            Let's Build Something Together
          </h2>

          <p className="sec-lead">
            Have a role in mind, or just want to say hi?
            My inbox is always open.
          </p>
        </div>

        <div className="contact-grid">

          {/* Contact Form */}

          <div className="contact-form-wrap sr-l up">

            <h3 className="form-title">
              Send a Message
            </h3>

            <form>

              <div className="form-row">

                <div className="fg">
                  <label>Name</label>

                  <input
                    type="text"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="fg">
                  <label>Email</label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

              </div>

              <div className="fg">
                <label>Subject</label>

                <input
                  type="text"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div className="fg">
                <label>Message</label>

                <textarea
                  rows={5}
                  placeholder="Tell me a bit more..."
                  required
                />
              </div>

              <button
                type="submit"
                className="btn btn-teal btn-md"
              >
                Send Message
              </button>

            </form>
          </div>

          {/* Contact Info */}

          <div className="contact-info-wrap sr-r up">

            {/* Email */}

            <div className="ci-card">

              <div className="ci-icon">
                <Mail size={20} />
              </div>

              <div className="ci-row">

                <div>
                  <div className="ci-label">
                    Email
                  </div>

                  <div className="ci-val">
                    amittghoyal@gmail.com
                  </div>
                </div>

                <button
                  className="ci-copy"
                  onClick={copyEmail}
                  type="button"
                >
                  <Copy size={16} />
                </button>

              </div>
            </div>

            {/* Phone */}

            <div className="ci-card">

              <div className="ci-icon">
                <Phone size={20} />
              </div>

              <div>
                <div className="ci-label">
                  Phone
                </div>

                <div className="ci-val">
                  9510360227
                </div>
              </div>

            </div>

            {/* Location */}

            <div className="ci-card">

              <div className="ci-icon">
                <MapPin size={20} />
              </div>

              <div>
                <div className="ci-label">
                  Location
                </div>

                <div className="ci-val">
                  Ahmedabad, Gujarat
                </div>
              </div>

            </div>

            {/* LinkedIn */}

            <div className="ci-card">

              <div className="ci-icon">
                <FaLinkedin size={20} />
              </div>

              <div>
                <div className="ci-label">
                  LinkedIn
                </div>

                <div className="ci-val">
                  linkedin.com/in/amit-ghoyal-136858393
                </div>
              </div>

            </div>

            {/* Social Buttons */}

            <div className="social-row">

              <a
                className="soc-btn"
                href="https://github.com/amitghoyal"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>

              <a
                className="soc-btn"
                href="https://www.linkedin.com/in/amit-ghoyal-136858393/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                className="soc-btn"
                href="mailto:amittghoyal@gmail.com"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}