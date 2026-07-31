import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { FaCode, FaGlobe, FaGithub } from 'react-icons/fa';
import { FaRegUser } from "react-icons/fa6";
import './portfolio.css';
import { motion } from "framer-motion";
import Navbar from '../nav-component/Navbar';
import Typewriter from '../components/Typewriter';

// Lazy load components for better performance (Code Splitting)
const MainContent = lazy(() => import('../main-content/main-content'));
const About = lazy(() => import('../about/About'));
const Showcase = lazy(() => import('../showcase/Showcase'));
const Contact = lazy(() => import('../ContactMe/contact'));
const Footer = lazy(() => import('../footer/Footer'));

const iconVariants = {
  hidden: { y: -70, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.3,
      duration: 0.8,
      ease: "backOut"
    }
  })
};

const headerVariants = {
  hidden: {
    x: -50,
    opacity: 0
  },
  visible: (i) => ({
    x: 0,
    opacity: 1,
    transition: {
      delay: (4 * 0.3) + (i * 0.3),
      duration: 0.8,
      ease: "backOut"
    }
  })
};

const headerVariants2 = {
  hidden: {
    y: 50,
    opacity: 0
  },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 2.4 + (i * 0.3),
      duration: 0.8,
      ease: "backOut"
    }
  })
};

const btnvariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 2.4,
      duration: 1.5
    }
  }
};

const Portfolio = () => {
  const [showText, setShowText] = useState(false);
  const circlesRef = useRef([]);
  const colors = ["#910A67", "#59089b", "#5c00b1", "#7a5af8"];

  useEffect(() => {
    const typewriterTimeout = setTimeout(() => {
      setShowText(true);
    }, 2000);

    const moveCircles = () => {
      const isMobile = window.innerWidth <= 768;
      if (isMobile) return;
      circlesRef.current.forEach((circle, index) => {
        if (circle) {
          gsap.to(circle, {
            x: index % 2 === 0 ? window.innerWidth - 200 : -window.innerWidth + 200,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
          });
        }
      });
    };

    const transitionTimeout = setTimeout(() => {
      gsap.to(".intro, .header-group", {
        scale: 1.14,
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => {
          gsap.to(".intro, .header-group", {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
              gsap.set(".center-item", { display: "none" });
              gsap.to(".new-background", {
                opacity: 1,
                visibility: "visible",
                duration: 1,
                ease: "power2.out",
                onComplete: () => {
                  gsap.to(".circle", {
                    opacity: 0.7,
                    duration: 1,
                    ease: "power2.out",
                    onComplete: moveCircles
                  });
                }
              });
            }
          });
        }
      });
    }, 5400);

    return () => {
      clearTimeout(typewriterTimeout);
      clearTimeout(transitionTimeout);
    };
  }, []);

  return (
    <div className="portfolio-container">
      <div className="center-item">
        {/* Icons */}
        <div className="intro">
          <motion.div
            className="icon-1"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={iconVariants}
          >
            <FaCode size={24} />
          </motion.div>
          <motion.div
            className="icon-2"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={iconVariants}
          >
            <FaRegUser size={24} />
          </motion.div>
          <motion.div
            className="icon-3"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={iconVariants}
          >
            <FaGithub size={24} />
          </motion.div>
        </div>

        {/* Headings */}
        <div className="header-group">
          <div className="header">
            <h1>
              <motion.span
                className="word"
                custom={0}
                variants={headerVariants}
                initial="hidden"
                animate="visible"
              >
                welcome
              </motion.span>
              <motion.span
                className="word"
                custom={1}
                variants={headerVariants}
                initial="hidden"
                animate="visible"
              >
                to
              </motion.span>
              <motion.span
                className="word"
                custom={2}
                variants={headerVariants}
                initial="hidden"
                animate="visible"
              >
                my
              </motion.span>
            </h1>
          </div>

          <div className="header2">
            <h1>
              <motion.span
                custom={0}
                variants={headerVariants2}
                initial="hidden"
                animate="visible"
                className="word2"
              >
                portfolio
              </motion.span>
              <motion.span
                custom={1}
                variants={headerVariants2}
                initial="hidden"
                animate="visible"
                className="word2"
              >
                website
              </motion.span>
            </h1>
          </div>
          <div className="btn">
            <motion.a
              href="#"
              className="btn-link"
              variants={btnvariants}
              initial="hidden"
              animate="visible"
            >
              <span className="globe-icon-wrapper">
                <FaGlobe className="globe-iconnn" />
              </span>
              {showText && (
                <Typewriter 
                  text="zlolcoding.vercel.app" 
                  speed={70} 
                  delay={100}
                  showCursor={true}
                />
              )}
            </motion.a>
          </div>
        </div>
      </div>

      {/* New Background with Circles */}
      <div className="new-background">
        <div id="circles-container">
          {colors.map((color, index) => (
            <div
              key={index}
              ref={el => circlesRef.current[index] = el}
              className="circle"
              id={`circle${index + 1}`}
              style={{
                backgroundColor: color,
                width: 'min(200px, 45vw)',
                height: 'min(200px, 45vw)',
                position: 'absolute',
                borderRadius: '50%',
                filter: 'blur(45px)',
                opacity: 0,
                willChange: 'transform',
                transform: 'translateZ(0)',
                ...(index === 0 && { top: '2%', left: '0' }),
                ...(index === 1 && { top: '2%', right: '0' }),
                ...(index === 2 && { bottom: '2%', left: '0' }),
                ...(index === 3 && { bottom: '2%', right: '0' })
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const presentationTimeout = setTimeout(() => {
      setShowNavbar(true);
    }, 8000);

    return () => clearTimeout(presentationTimeout);
  }, []);

  return (
    <div className="app">
      <Portfolio />
      {showNavbar && (
        <>
          <Navbar />
          <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: '#fff' }}>Loading content...</div>}>
            <MainContent />
            <About />
            <Showcase />
            <Contact />
            <Footer />
          </Suspense>
        </>
      )}
    </div>
  );
}

export default App;