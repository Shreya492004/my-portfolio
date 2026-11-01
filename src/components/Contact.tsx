import React, { useState, useRef } from "react";
import { CONTACT_INFO } from "../data/portfolioData";

const Contact: React.FC = () => {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    const form = formRef.current;

    const name = (form.querySelector('input[name="name"]') as HTMLInputElement)?.value;
    const email = (form.querySelector('input[name="email"]') as HTMLInputElement)?.value;
    const subject = (form.querySelector('input[name="subject"]') as HTMLInputElement)?.value;
    const message = (form.querySelector('textarea[name="message"]') as HTMLTextAreaElement)?.value;

    try {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), 15000);

      let result: { success?: boolean | string; message?: string };
      let responseOk = false;
      try {
        const res = await fetch("https://formsubmit.co/ajax/sshreyas471@gmail.com", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name,
            email,
            subject: subject || "Portfolio Inquiry",
            message,
            _subject: "New Portfolio Message from Shreya's Site",
            _template: "table",
            _captcha: "false",
            _replyto: email,
          }),
          signal: controller.signal,
        });
        responseOk = res.ok;
        result = await res.json() as { success?: boolean | string; message?: string };
      } finally {
        window.clearTimeout(timeoutId);
      }

      if (!responseOk || result.success === false || result.success === "false") {
        throw new Error(result.message || "The email service could not accept your message.");
      }

      setStatus("success");
      setFeedbackMsg("Thanks! Your message was sent to Shreya's inbox.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedbackMsg(
        error instanceof Error && error.name === "AbortError"
          ? "Sending timed out. Please try again or email sshreyas471@gmail.com directly."
          : "Your message could not be sent. Please try again or email sshreyas471@gmail.com directly."
      );
    }
  };

  return (
    <section id="contact" className="py-section wow section-land">
      <div className="container">
        <div className="section-title wow fadeIn">
          <h6 className="section-subtitle">Get In Touch</h6>
          <div className="d-rotate">
            <h2 className="section-heading rotate-text">Let&apos;s Discuss Opportunities</h2>
          </div>
          <p className="section-desc">Have a role, project, or question? Send a message and I&apos;ll respond promptly.</p>
        </div>

        <div className="contact-card wow tilt-up" data-delay="0.15s">
          <div className="contact-info">
            <h3 className="fw-bold mb-3">Contact Information</h3>
            <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 24 }}>
              Feel free to connect directly via email, phone, or LinkedIn.
            </p>
            {CONTACT_INFO.map((info) => (
              <div key={info.label} className="contact-item hover-this">
                <i className={info.icon}></i>
                <div>
                  <span className="contact-label">{info.label}</span>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="contact-value"
                      target={info.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span className="contact-value">{info.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="contact-form-col">
            <h3 className="fw-bold mb-4">Send a Message</h3>
            <form id="contactForm" ref={formRef} onSubmit={handleSubmit}>
              <input type="hidden" name="_subject" value="New Portfolio Message from Shreya's Site" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_replyto" id="replyToField" defaultValue="" />

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="formName" className="form-label">
                    <i className="fa-regular fa-user me-1 text-primary"></i>Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="formName"
                    className="form-ctrl"
                    placeholder="e.g. John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="formEmail" className="form-label">
                    <i className="fa-regular fa-envelope me-1 text-primary"></i>Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="formEmail"
                    className="form-ctrl"
                    placeholder="e.g. john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="formSubject" className="form-label">
                  <i className="fa-solid fa-tag me-1 text-primary"></i>Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  id="formSubject"
                  className="form-ctrl"
                  placeholder="e.g. Full Stack Developer Opportunity"
                />
              </div>

              <div className="form-group">
                <label htmlFor="formMessage" className="form-label">
                  <i className="fa-regular fa-comment-dots me-1 text-primary"></i>Your Message
                </label>
                <textarea
                  name="message"
                  id="formMessage"
                  className="form-ctrl form-textarea"
                  placeholder="Please write your project requirements or message here..."
                  rows={5}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary-custom px-4 py-3 hover-this mt-2"
                disabled={status === "sending"}
              >
                {status === "sending" ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin me-2"></i>Sending...
                  </>
                ) : (
                  <>
                    <i className="fa-regular fa-paper-plane me-2"></i>Send Message
                  </>
                )}
              </button>

              {status === "success" && (
                <p className="success-msg">
                  <i className="fa-solid fa-circle-check me-1"></i>
                  {feedbackMsg || "Thank you! Your message has been sent successfully."}
                </p>
              )}
              {status === "error" && (
                <p className="error-msg">
                  <i className="fa-solid fa-triangle-exclamation me-1"></i>
                  {feedbackMsg || "Something went wrong. Please email directly to sshreyas471@gmail.com"}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;