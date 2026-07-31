import './main-content.css';
import { 
  faRocket, 
  faProjectDiagram, 
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import { SiVercel } from 'react-icons/si';
import Typewriter from '../components/Typewriter';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const hoverEffect = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400, damping: 10 }
};

const tapEffect = {
  scale: 0.95
};

function MainContent() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  });

  const socialLinks = [
    { 
      name: "github", 
      icon: <FaGithub className="social-react-icon" />, 
      url: "https://github.com/alimohammedkhaleel",
      title: "GitHub: alimohammedkhaleel"
    },
    { 
      name: "whatsapp", 
      icon: <FaWhatsapp className="social-react-icon" />, 
      url: "https://wa.me/201121360605",
      title: "WhatsApp: 01121360605"
    },
    { 
      name: "vercel", 
      icon: <SiVercel className="social-react-icon" />, 
      url: "https://vercel.com/",
      title: "Vercel"
    },
    { 
      name: "tiktok", 
      icon: <FaTiktok className="social-react-icon" />, 
      url: "https://www.tiktok.com/@zlolcoding",
      title: "TikTok: @zlolcoding"
    }
  ];

  return (
    <motion.div 
      id='home'
      className="main-content"
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.div className="content-wrapper">
        {/* Ready to Innovate Button */}
        <motion.div 
          className="main-content-btn"
          variants={itemVariants}
          whileHover={hoverEffect}
          whileTap={tapEffect}
        >
          <motion.a 
            href="#pricing" 
            className='btn-linkk'
            whileHover={{ boxShadow: "0 0 20px rgba(122, 90, 248, 0.5)" }}
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <FontAwesomeIcon icon={faRocket} className="btn-icon" />
            </motion.span>
            <span>Ready to innovate</span>
          </motion.a>
        </motion.div>
        
        <motion.div className="text-container" variants={containerVariants}>
          {/* Title */}
          <motion.h1 className="title" variants={containerVariants}>
            <motion.span 
              className="fullstack"
              variants={itemVariants}
              whileHover={{ 
                textShadow: "0 0 15px rgba(255,255,255,0.7)",
                scale: 1.05
              }}
            >
              Fullstack
            </motion.span>
            <motion.span 
              className="developer"
              variants={itemVariants}
              whileHover={{ 
                textShadow: "0 0 15px rgba(122, 90, 248, 0.7)",
                scale: 1.05
              }}
            >
              developer
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="subtitle"
            variants={itemVariants}
          >
            <Typewriter 
              text="IT student at NCT" 
              speed={75} 
              delay={300}
              loop={true}
              pauseDelay={2500}
              showCursor={true}
            />
          </motion.p>

          {/* Description */}
          <motion.p 
            className="description"
            variants={itemVariants}
            whileHover={{ 
              x: 10,
              transition: { type: "spring", stiffness: 300 }
            }}
          >
            Passionate about creating seamless digital experiences 
            with modern web technologies and innovative solutions.
          </motion.p>
          
          {/* Tech Badges */}
          <motion.div 
            className="btn-group"
            variants={containerVariants}
          >
            {["React", "GSAP", "Framer Motion", "JavaScript"].map((tech, index) => (
              <motion.div
                key={tech}
                className={`${tech.toLowerCase().replace(/\s+/g, '')}-btn`}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  boxShadow: "0 5px 15px rgba(122, 90, 248, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                custom={index}
              >
                <a href="#pricing">
                  <span className={`${tech.toLowerCase().replace(/\s+/g, '')}-text`}>{tech}</span>
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="btn-group2"
            variants={containerVariants}
          >
            {[
              { name: "Projects", target: "#pricing", icon: faProjectDiagram },
              { name: "Contact", target: "#contact", icon: faEnvelope }
            ].map((item, index) => (
              <motion.div
                key={item.name}
                className={item.name.toLowerCase()}
                variants={itemVariants}
                whileHover={{
                  y: -3,
                  scale: 1.05
                }}
                whileTap={{ scale: 0.98 }}
                custom={index + 4}
              >
                <a href={item.target}>
                  <span className={`${item.name.toLowerCase()}-text`}>{item.name}</span>
                  <FontAwesomeIcon icon={item.icon} style={{ marginLeft: 8 }} />
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Social Links (GitHub, WhatsApp, Vercel) */}
          <motion.div 
            className="social-links"
            variants={containerVariants}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                title={social.title}
                className={`social-icon ${social.name}`}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  scale: 1.2,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.5 }
                }}
                whileTap={{ scale: 0.9 }}
                custom={index + 6}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default MainContent;