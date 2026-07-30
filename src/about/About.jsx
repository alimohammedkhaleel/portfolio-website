import './About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faTrophy, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import profilePic from '../assets/profile-pic.png';
// Animation Configurations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 40, opacity: 0, rotateX: -30 },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 8,
      mass: 0.8,
      duration: 1
    }
  }
};

const statsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5
    }
  }
};

const statBoxVariants = {
  hidden: {
    y: 80,
    opacity: 0,
    scale: 0.7,
    rotate: -10
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
      mass: 0.7,
      duration: 1.2
    }
  },
  hover: {
    y: -20,
    scale: 1.1,
    boxShadow: "0px 20px 30px rgba(179, 110, 255, 0.3)",
    background: "rgba(179, 110, 255, 0.2)",
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 12,
      duration: 0.8
    }
  }
};

const iconVariants = {
  hidden: { scale: 0, rotate: -45 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 250,
      delay: 0.3,
    }
  },
  hover: {
    rotate: [0, 15, -10, 0],
    scale: 1.2,
    transition: {
      duration: 0.6
    }
  }
};

const numberVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 180,
      damping: 8,
      delay: 0.2
    }
  }
};

const titleVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 1.2,
      delay: 0.7
    }
  }
};

function About() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.div 
      id="about"
      className="about"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      style={{
        scrollMarginTop: '80px',
      }}
    >
      <div className="about-content">
        <motion.h1
          variants={{
            hidden: { x: -50, opacity: 0 },
            visible: {
              x: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 100,
                damping: 10,
                mass: 0.5
              }
            }
          }}
        >
          About Me
        </motion.h1>

        <motion.div
          className="profile-section"
          variants={containerVariants}
        >
          <motion.div className="profile-text" variants={itemVariants}>
            <h2>Hello, I'm </h2>
            <motion.h3
              className='my-name'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: 'spring' }}
            >
              ali mohammed ali
            </motion.h3>
            <motion.p variants={itemVariants}>
            React developer specializing in Animations. Aspiring to global excellence. Mastering Framer Motion & GSAP to build stunning UIs
            </motion.p>
            <motion.p variants={itemVariants}>
              My approach combines creativity with technical excellence to deliver
              outstanding results for every project I undertake.
            </motion.p>
            <motion.div className="btn-groupp" variants={itemVariants}>
              <motion.div
                className="cv-btn"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 5px 15px rgba(179, 110, 255, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="#" className="cv-link">Download CV</a>
              </motion.div>
              <motion.div
                className="view-btn"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 5px 15px rgba(179, 110, 255, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="#pricing" className="view-link">View Projects</a>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="profile-image"
            variants={{
              hidden: { x: 50, opacity: 0, rotateY: 30 },
              visible: {
                x: 0,
                opacity: 1,
                rotateY: 0,
                transition: {
                  type: 'spring',
                  stiffness: 100,
                  damping: 10,
                  delay: 0.3
                }
              }
            }}
          >
            <img src={profilePic} alt="Profile" className="image-placeholder" style={{ objectFit: 'cover' }} />
          </motion.div>
        </motion.div>

        <motion.div
          className="stats-container"
          variants={statsContainerVariants}
        >
          <motion.div
            className="stat-box"
            variants={statBoxVariants}
            whileHover="hover"
          >
            <motion.div
              className="stat-icon"
              variants={iconVariants}
            >
              <FontAwesomeIcon icon={faFolder} className="btn-icon" />
            </motion.div>
            <div className="stat-content">
              <motion.div
                className="stat-number"
                variants={numberVariants}
              >
                5+
              </motion.div>
              <motion.div
                className="stat-title"
                variants={titleVariants}
              >
                Total Projects
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="stat-box"
            variants={statBoxVariants}
            whileHover="hover"
          >
            <motion.div
              className="stat-icon"
              variants={iconVariants}
            >
              <FontAwesomeIcon icon={faTrophy} className="btn-icon" />
            </motion.div>
            <div className="stat-content">
              <motion.div
                className="stat-number"
                variants={numberVariants}
              >
                3
              </motion.div>
              <motion.div
                className="stat-title"
                variants={titleVariants}
              >
                Certifications
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="stat-box"
            variants={statBoxVariants}
            whileHover="hover"
          >
            <motion.div
              className="stat-icon"
              variants={iconVariants}
            >
              <FontAwesomeIcon icon={faBriefcase} className="btn-icon" />
            </motion.div>
            <div className="stat-content">
              <motion.div
                className="stat-number"
                variants={numberVariants}
              >
                2
              </motion.div>
              <motion.div
                className="stat-title"
                variants={titleVariants}
              >
                Years Experience
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default About;