import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaWhatsapp, FaEnvelope, FaGithub, FaCode, FaExternalLinkAlt } from 'react-icons/fa';
import { SiVercel } from 'react-icons/si';
import './Footer.css';

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 2.449 6.34 6.34 0 0 0 1.157 8.784 6.34 6.34 0 0 0 7.7-1.026c.928-.928 1.455-2.18 1.455-3.493V8.87a8.213 8.213 0 0 0 4.315 1.258V6.686z"/>
  </svg>
);

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.12,
      ease: "easeOut"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" }
  }
};

const Footer = () => {
  return (
    <footer className="premium-footer" dir="ltr">
      <div className="footer-glow-line" />
      
      <motion.div 
        className="footer-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* Main Grid Content */}
        <div className="footer-grid">
          
          {/* Col 1: Brand & Developer Info */}
          <motion.div className="footer-col brand-col" variants={itemVariants}>
            <h3 className="footer-brand-title">ZLOLCODING <span className="highlight-purple">PORTFOLIO</span></h3>
            <p className="footer-brand-desc">
              Personal web development portfolio of Ali Mohamed Ali Khaleel. Specialized in building modern, interactive web applications using React, GSAP, Framer Motion, and high-performance UI/UX designs.
            </p>
            <div className="management-badge">
              <FaCode size={16} className="highlight-purple" />
              <span>Lead Developer: <strong>Ali Mohamed Ali Khaleel</strong></span>
            </div>
          </motion.div>

          {/* Col 2: Quick Contact */}
          <motion.div className="footer-col contact-col" variants={itemVariants}>
            <h4 className="col-title">📞 Direct Contact</h4>
            <ul className="contact-list">
              <li>
                <a href="https://wa.me/201121360605" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                  <FaWhatsapp size={18} className="highlight-green" />
                  <span>+20 1121360605 (WhatsApp)</span>
                </a>
              </li>
              <li>
                <a href="mailto:alimohamedkhaleelabd@gmail.com" className="contact-link-item">
                  <FaEnvelope size={16} className="highlight-purple" />
                  <span>alimohamedkhaleelabd@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="https://wa.me/201121360605" target="_blank" rel="noopener noreferrer" className="whatsapp-badge-link">
                  💬 Chat Instantly on WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Col 3: Key Featured Projects */}
          <motion.div className="footer-col location-col" variants={itemVariants}>
            <h4 className="col-title">🚀 Featured Projects</h4>
            <ul className="projects-mini-list">
              <li>
                <a href="https://nct-system.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <span>NCT System Portal</span> <FaExternalLinkAlt className="mini-icon" />
                </a>
              </li>
              <li>
                <a href="https://infinity-gym-kt7x.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <span>Infinity Gym Platform</span> <FaExternalLinkAlt className="mini-icon" />
                </a>
              </li>
              <li>
                <a href="https://nctvpn.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <span>NCT VPN Framework</span> <FaExternalLinkAlt className="mini-icon" />
                </a>
              </li>
              <li>
                <a href="https://maktabatyy.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <span>Maktabatyy E-Library</span> <FaExternalLinkAlt className="mini-icon" />
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Col 4: TikTok & Social Media Links */}
          <motion.div className="footer-col hours-col" variants={itemVariants}>
            <h4 className="col-title social-title">🌐 Connect &amp; Follow</h4>
            <div className="footer-socials-grid">
              <a
                href="https://github.com/alimohammedkhaleel"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn github"
                title="GitHub Profile"
              >
                <FaGithub size={18} />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.tiktok.com/@zlolcoding"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn tiktok"
                title="TikTok Video"
              >
                <TikTokIcon />
                <span>TikTok</span>
              </a>
              <a
                href="https://vercel.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn vercel"
                title="Vercel"
              >
                <SiVercel size={18} />
                <span>Vercel</span>
              </a>
            </div>

            <div className="tiktok-featured-box">
              <a
                href="https://www.tiktok.com/@zlolcoding"
                target="_blank"
                rel="noopener noreferrer"
                className="tiktok-direct-link"
              >
                🎬 Watch TikTok Showcase @zlolcoding
              </a>
            </div>
          </motion.div>

        </div>

        {/* Bottom Bar with Developer & Copyright info */}
        <motion.div className="footer-bottom-bar" variants={itemVariants}>
          <p className="copyright-text">
            © {new Date().getFullYear()} zlolcodin Portfolio. All rights reserved.
          </p>
          
          <div className="developer-credits">
            <p className="dev-para">
              Crafted with <FaHeart size={13} className="heart-icon" /> by{' '}
              <span className="dev-name-highlight">Ali Mohamed Ali Khaleel</span>
            </p>
            <div className="dev-meta-links">
              <span className="dev-skill-tag">Full Stack React &amp; Node.js Developer</span>
              <a href="https://wa.me/201121360605" target="_blank" rel="noopener noreferrer" className="dev-tel-link">
                📞 +20 1121360605
              </a>
              <a
                href="https://www.tiktok.com/@zlolcoding"
                target="_blank"
                rel="noopener noreferrer"
                className="dev-tiktok-link"
              >
                🎵 TikTok: @zlolcoding
              </a>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </footer>
  );
};

export default Footer;
