import React from 'react';
import './contact.css';
import { FaComment, FaUser, FaImage, FaPaperPlane, FaGithub, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { SiVercel } from 'react-icons/si';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function Contact() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.15,
        delayChildren: isMobile ? 0.05 : 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: isMobile ? 8 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.2 : 0.45,
        ease: "easeOut"
      }
    }
  };

  const formVariants = {
    hidden: { x: isMobile ? 0 : -50, y: isMobile ? 10 : 0, opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.25 : 0.5,
        ease: "easeOut"
      }
    }
  };

  const commentFormVariants = {
    hidden: { x: isMobile ? 0 : 50, y: isMobile ? 10 : 0, opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.25 : 0.5,
        ease: "easeOut"
      }
    }
  };

  // Use inView hooks
  const [contactRef, contactInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [formsRef, formsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Contact Form Submission
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "c51a3ed0-bb91-409f-9b9b-ab0747a9c7c5");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        alert("Your message has been sent successfully!");
        event.target.reset();
      } else {
        throw new Error(data.message || "Failed to submit form");
      }
    } catch (error) {
      alert("Error: Failed to send message. Please try again later.");
      console.error("Error:", error);
    }
  };

  // Comment Form Submission
  const onSubmitComment = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/alimohamedkhaleelabd@gmail.com", {
        method: "POST",
        body: new FormData(event.target),
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await response.json();
      
      if (data.success) {
        alert("Your comment has been submitted successfully!");
        event.target.reset();
      } else {
        throw new Error(data.message || "Failed to submit comment");
      }
    } catch (error) {
      alert("Error: Failed to submit comment. Please try again later.");
      console.error("Error:", error);
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/alimohammedkhaleel',
      label: 'alimohammedkhaleel',
      className: 'social-github'
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp />,
      url: 'https://wa.me/201121360605',
      label: '01121360605',
      className: 'social-whatsapp'
    },
    {
      name: 'Vercel',
      icon: <SiVercel />,
      url: 'https://vercel.com/',
      label: 'Vercel',
      className: 'social-vercel'
    },
    {
      name: 'TikTok',
      icon: <FaTiktok />,
      url: 'https://www.tiktok.com/@zlolcoding',
      label: '@zlolcoding',
      className: 'social-tiktok'
    }
  ];

  return (
    <motion.div 
      id="contact" 
      className="contact-container"
      ref={contactRef}
      initial="hidden"
      animate={contactInView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.h1 className='contact-header' variants={itemVariants}>
        Contact Me
      </motion.h1>
      <motion.p className='contact-discription' variants={itemVariants}>
        If you have any questions, feel free to reach out!
      </motion.p>
      
      <div className="forms-wrapper" ref={formsRef}>
        {/* Contact Form - Left Side */}
        <motion.form 
          onSubmit={onSubmit}
          className="contact-form"
          initial="hidden"
          animate={formsInView ? "visible" : "hidden"}
          variants={formVariants}
        >
          <div className="form-container contact-form-container">
            <motion.h1 className='form-header' variants={itemVariants}>
              Get in Touch
            </motion.h1>
            <motion.p className='form-discription' variants={itemVariants}>
              Have something to discuss? Send me a message and let's talk.
            </motion.p>
            <motion.input 
              type="text" 
              placeholder="Your Name" 
              className="input-field" 
              variants={itemVariants}
              whileFocus={{ scale: 1.02 }}
              name='name'
              required
            />
            <motion.input 
              type="email" 
              placeholder="Your Email" 
              className="input-field" 
              variants={itemVariants}
              whileFocus={{ scale: 1.02 }}
              name='email'
              required
            />
            <motion.textarea 
              placeholder="Your Message" 
              className="input-field message-field" 
              variants={itemVariants}
              whileFocus={{ scale: 1.02 }}
              name='message'
              required
            />
            <motion.button 
              className="submit-button"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>

            {/* Social Links */}
            <motion.div className="contact-socials" variants={itemVariants}>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`contact-social-link ${social.className}`}
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.label}
                >
                  <span className="contact-social-icon">{social.icon}</span>
                  <span className="contact-social-label">{social.label}</span>
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.form>

        {/* Comment Form - Right Side */}
        <motion.form 
          onSubmit={onSubmitComment}
          className="comment-form"
          encType="multipart/form-data"
          initial="hidden"
          animate={formsInView ? "visible" : "hidden"}
          variants={commentFormVariants}
        >
          <div className="form-container comment-form-container">
            <motion.h1 className='form-header' variants={itemVariants}>
              <FaComment className="form-icon" />
              Leave a Comment
            </motion.h1>
            <motion.p className='form-discription' variants={itemVariants}>
              Share your thoughts with me.
            </motion.p>
            
            <motion.div className="input-group" variants={itemVariants}>
              <label htmlFor="comment-name">
                <FaUser className="input-icon" />
                Name
              </label>
              <motion.input 
                type="text" 
                id="comment-name" 
                placeholder="Your Name" 
                className="input-field"
                whileFocus={{ scale: 1.02 }}
                name='name'
                required
              />
            </motion.div>
            
            <motion.div className="input-group" variants={itemVariants}>
              <label htmlFor="comment-message">
                <FaComment className="input-icon" />
                Message
              </label>
              <motion.textarea 
                id="comment-message" 
                placeholder="Your Comment" 
                className="input-field message-field"
                whileFocus={{ scale: 1.02 }}
                name='message'
                required
              />
            </motion.div>
            
            <motion.div className="input-group" variants={itemVariants}>
              <label htmlFor="comment-photo">
                <FaImage className="input-icon" />
                Profile Photo
              </label>
              <motion.div className="file-upload">
                <input 
                  type="file" 
                  id="comment-photo" 
                  accept="image/*" 
                  className="file-input" 
                  name='photo'
                />
                <motion.label 
                  htmlFor="comment-photo" 
                  className="upload-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Choose File
                </motion.label>
              </motion.div>
            </motion.div>
            
            <motion.button 
              type="submit"
              className="submit-button"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPaperPlane className="button-icon" />
              Post Comment
            </motion.button>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
}

export default Contact;