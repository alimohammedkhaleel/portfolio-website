import './showcase.css';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaExternalLinkAlt, 
  FaGlobe, 
  FaLayerGroup, 
  FaGraduationCap, 
  FaCheckCircle,
  FaArrowRight
} from 'react-icons/fa';

// Import tech stack icon images
import cssIcon from '../assets/css.png';
import htmlIcon from '../assets/html.png';
import jsIcon from '../assets/js.png';
import reactIcon from '../assets/react.png';
import nodeIcon from '../assets/node.png';
import gitIcon from '../assets/git.png';
import githubIcon from '../assets/github.png';
import bootstrapIcon from '../assets/bootstrap.png';

// Import certificate images
import certSef from '../assets/cert-sef.png';
import certWe from '../assets/cert-we.png';

// Import project screenshots
import nctSystemImg from '../assets/nct-system.png';
import infinityGymImg from '../assets/infinity-gym.png';
import nctVpnImg from '../assets/nct-vpn.png';
import maktabatyyImg from '../assets/maktabatyy.png';
import cryptographyImg from '../assets/cryptography.png';
import calculatorImg from '../assets/calculator.png';
import todoListImg from '../assets/todo-list.png';

// SVG components for GSAP and Framer Motion
const GsapIcon = () => (
  <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="url(#gsapGrad)" />
    <path d="M30 52C30 39.8497 39.8497 30 52 30H70V42H52C46.4772 42 42 46.4772 42 52C42 57.5228 46.4772 62 52 62H70V74H52C39.8497 74 30 64.1503 30 52Z" fill="#88CE02"/>
    <circle cx="70" cy="36" r="6" fill="#88CE02"/>
    <defs>
      <linearGradient id="gsapGrad" x1="0" y1="0" x2="100" y2="100">
        <stop stopColor="#1A2E05" />
        <stop offset="1" stopColor="#0B1402" />
      </linearGradient>
    </defs>
  </svg>
);

const FramerMotionIcon = () => (
  <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill="url(#framerGrad)"/>
    <path d="M25 25H75V50H50L25 25Z" fill="#F08"/>
    <path d="M25 50H50L75 75H25V50Z" fill="#05F"/>
    <path d="M50 50V75L25 50H50Z" fill="#00F0FF"/>
    <defs>
      <linearGradient id="framerGrad" x1="0" y1="0" x2="100" y2="100">
        <stop stopColor="#1E1B4B"/>
        <stop offset="1" stopColor="#0F172A"/>
      </linearGradient>
    </defs>
  </svg>
);

const ExpressIcon = () => (
  <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#ffffff" />
    <text x="50" y="55" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#000000" textAnchor="middle" dominantBaseline="middle">ex</text>
  </svg>
);

// ── Modal rendered via Portal so it escapes ALL stacking contexts ──
function ProjectModal({ project, onClose }) {
  if (!project) return null;
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <motion.div
        className="modal-card"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <h3>{project.title}</h3>
            <span className="modal-sub">{project.subtitle}</span>
          </div>
          <button className="close-modal" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="modal-screenshot-container">
            <img
              src={project.image}
              alt={project.title}
              className="modal-screenshot"
            />
          </div>

          <p className="modal-desc">{project.description}</p>

          <h4>Key Capabilities &amp; Features:</h4>
          <ul className="features-list">
            {project.features.map((feat, idx) => (
              <li key={idx}><FaCheckCircle className="check-icon" /> {feat}</li>
            ))}
          </ul>

          <div className="modal-actions">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modal-launch"
            >
              <span>Launch Live Vercel App</span>
              <FaArrowRight />
            </a>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

function Showcase() {
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  const techItems = [
    { name: 'HTML5', icon: htmlIcon, category: 'frontend', level: 'Advanced' },
    { name: 'CSS3', icon: cssIcon, category: 'frontend', level: 'Advanced' },
    { name: 'JavaScript', icon: jsIcon, category: 'frontend', level: 'Advanced' },
    { name: 'React', icon: reactIcon, category: 'frontend', level: 'Expert' },
    { name: 'GSAP', customIcon: <GsapIcon />, category: 'animation', level: 'Specialist' },
    { name: 'Framer Motion', customIcon: <FramerMotionIcon />, category: 'animation', level: 'Specialist' },
    { name: 'Node.js', icon: nodeIcon, category: 'backend', level: 'Intermediate' },
    { name: 'Express', customIcon: <ExpressIcon />, category: 'backend', level: 'Intermediate' },
    { name: 'Git', icon: gitIcon, category: 'tools', level: 'Proficient' },
    { name: 'GitHub', icon: githubIcon, category: 'tools', level: 'Proficient' },
    { name: 'Bootstrap', icon: bootstrapIcon, category: 'frontend', level: 'Advanced' }
  ];

  const projects = [
    {
      id: 'nct-system',
      title: 'NCT System Portal',
      subtitle: 'New Cairo Technological University System',
      category: 'edtech',
      url: 'https://nct-system.vercel.app/',
      image: nctSystemImg,
      badgeColor: '#00d2ff',
      description: 'A comprehensive educational web portal built for New Cairo Technological University. Manages academic services, student login systems, technological workshops, and department showcases.',
      tags: ['React', 'JavaScript', 'CSS3', 'Framer Motion', 'Responsive UI'],
      features: [
        'High-performance university portal UI',
        'Technological workshop & academic department listings',
        'Secure authentication and student portal access',
        'Vercel cloud integration with fast image loading'
      ]
    },
    {
      id: 'infinity-gym',
      title: 'Infinity Gym Platform',
      subtitle: 'Fitness & Champions Portal',
      category: 'webapps',
      url: 'https://infinity-gym-kt7x.vercel.app/',
      image: infinityGymImg,
      badgeColor: '#38ef7d',
      description: 'An interactive fitness platform featuring live leaderboards, workout programs, trainer profiles, subscription packages, and energetic fitness UI animations.',
      tags: ['React', 'GSAP', 'Framer Motion', 'Fitness Tech', 'Leaderboard UI'],
      features: [
        'Live Leaderboard ranking gym champions and athletes',
        'Interactive membership plans and workout services',
        'Smooth animations using GSAP and Framer Motion',
        'Dark high-contrast luxury UI for bodybuilders'
      ]
    },
    {
      id: 'nct-vpn',
      title: 'NCT VPN Framework',
      subtitle: 'National Unified VPN for Technological Universities',
      category: 'security',
      url: 'https://nctvpn.vercel.app/',
      image: nctVpnImg,
      badgeColor: '#ff5858',
      description: 'The central network portal for the National Unified VPN Framework connecting Egyptian Technological Universities under the Ministry of Higher Education.',
      tags: ['React', 'Cybersecurity', 'VPN Framework', 'Cryptographic UI', 'Tailwind/CSS'],
      features: [
        'Central administrative nexus for encrypted routing',
        'High-security dark cyber aesthetic interface',
        'Multi-university access management framework',
        'Responsive network portal architecture'
      ]
    },
    {
      id: 'maktabatyy',
      title: 'Maktabatyy E-Library',
      subtitle: 'Digital Ethics & Academic Book Library',
      category: 'edtech',
      url: 'https://maktabatyy.vercel.app/',
      image: maktabatyyImg,
      badgeColor: '#a78bfa',
      description: 'A feature-rich digital library platform containing curated e-books, interactive quizzes, student scoreboards (Al-Awael), category filtering, and reading tools.',
      tags: ['React', 'Interactive Quiz Engine', 'Arabic UI/UX', 'Fullstack Logic', 'E-Library'],
      features: [
        'Curated digital catalog across Psychology, Business, Literature & History',
        'Interactive quiz engine evaluating reader comprehension',
        'Weekly leaderboards honoring top achievers',
        'Fast searchable library UI with category filters'
      ]
    },
    {
      id: 'cryptography-project',
      title: 'Cryptography Security Lab',
      subtitle: 'Data Encryption & Security Learning Platform',
      category: 'security',
      url: 'https://cryptography-project-eta.vercel.app/',
      image: cryptographyImg,
      badgeColor: '#00F666',
      description: 'An interactive cryptography platform demonstrating encryption algorithms (RSA, SHA-1), data privacy mechanisms, and blockchain security principles.',
      tags: ['React', 'GSAP Animations', 'Cryptography', 'Algorithms', 'Cyber Security'],
      features: [
        'Visual interactive simulation for RSA and SHA-1 algorithms',
        'Explores decentralization, encryption, and data protection',
        'Advanced dynamic motion animations powered by GSAP',
        'Neon cyber-themed security visual interface'
      ]
    },
    {
      id: 'simple-calculator',
      title: 'Simple Calculator App',
      subtitle: 'Clean & Interactive Math Calculator',
      category: 'tools',
      url: 'https://simple-calculator-with-react.vercel.app/',
      image: calculatorImg,
      badgeColor: '#ec4899',
      description: 'A clean, modern React calculator app providing quick arithmetic operations, key-press support, responsive layout, and sleek dark themed UI.',
      tags: ['React', 'JavaScript', 'CSS3', 'UI Design', 'Math Engine'],
      features: [
        'Instant mathematical calculation logic and state evaluation',
        'Keyboard and touch-friendly grid interface',
        'Sleek dark theme with responsive button feedback',
        'Clean modular React state implementation'
      ]
    },
    {
      id: 'todo-list',
      title: 'Task Manager (To-Do List)',
      subtitle: 'Productivity & Task Tracking App',
      category: 'tools',
      url: 'https://to-do-list-ten-wine-58.vercel.app/',
      image: todoListImg,
      badgeColor: '#818cf8',
      description: 'An intuitive task management application featuring task creation, status filtering (All, Active, Completed), local state persistence, and clean modern aesthetics.',
      tags: ['React', 'State Management', 'Productivity', 'CSS3', 'Task Flow'],
      features: [
        'Dynamic task creation, completion toggling, and deletion',
        'Filter views by All, Active, and Completed tasks',
        'Clean empty states and visual task progress',
        'Fast responsive layout with smooth transitions'
      ]
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.45, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      id="pricing"
      className="show-case" 
      ref={ref}
    >
      <motion.div 
        className="showcase-header"
        initial={{ y: -40, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 12 }}
      >
        <span className="section-subtitle">MY WORK &amp; SKILLS</span>
        <h2>Portfolio Showcase</h2>
        <p className="section-desc">
          Explore my featured web applications and technical skills built with React, GSAP, and Framer Motion.
        </p>
      </motion.div>
      
      {/* Navigation Tabs */}
      <div className="showcase-buttons">
        <motion.button 
          className={activeTab === 'projects' ? 'active' : ''}
          onClick={() => setActiveTab('projects')}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <FaLayerGroup style={{ marginRight: 8 }} /> Projects ({projects.length})
        </motion.button>

        <motion.button 
          className={activeTab === 'tech' ? 'active' : ''}
          onClick={() => setActiveTab('tech')}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <FaGlobe style={{ marginRight: 8 }} /> Tech Stack ({techItems.length})
        </motion.button>
        
        <motion.button 
          className={activeTab === 'certificates' ? 'active' : ''}
          onClick={() => setActiveTab('certificates')}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <FaGraduationCap style={{ marginRight: 8 }} /> Certificates
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          className="showcase-content"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35 }}
        >
          {activeTab === 'projects' && (
            <div className="projects-wrapper">
              {/* Category Filter Pills */}
              <div className="category-filters">
                <button 
                  className={selectedCategory === 'all' ? 'active-filter' : ''} 
                  onClick={() => setSelectedCategory('all')}
                >
                  All Projects ({projects.length})
                </button>
                <button 
                  className={selectedCategory === 'edtech' ? 'active-filter' : ''} 
                  onClick={() => setSelectedCategory('edtech')}
                >
                  EdTech &amp; University
                </button>
                <button 
                  className={selectedCategory === 'webapps' ? 'active-filter' : ''} 
                  onClick={() => setSelectedCategory('webapps')}
                >
                  Web Apps &amp; Fitness
                </button>
                <button 
                  className={selectedCategory === 'security' ? 'active-filter' : ''} 
                  onClick={() => setSelectedCategory('security')}
                >
                  Security &amp; Encryption
                </button>
                <button 
                  className={selectedCategory === 'tools' ? 'active-filter' : ''} 
                  onClick={() => setSelectedCategory('tools')}
                >
                  Utility &amp; Tools
                </button>
              </div>

              {/* Projects Grid */}
              <motion.div 
                className="projects-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredProjects.map((project) => (
                  <motion.div 
                    key={project.id}
                    variants={itemVariants}
                    className="project-card"
                    whileHover={{ y: -8 }}
                  >
                    {/* Browser Screenshot Frame */}
                    <div className="browser-frame">
                      <div className="browser-dots">
                        <span className="dot dot-red"></span>
                        <span className="dot dot-yellow"></span>
                        <span className="dot dot-green"></span>
                      </div>
                      <span className="browser-url">{project.url.replace('https://', '')}</span>
                      <span className="live-badge" style={{ borderColor: project.badgeColor, color: project.badgeColor }}>
                        LIVE VERCEL
                      </span>
                    </div>

                    {/* Screenshot with pan-scroll effect */}
                    <div className="screenshot-wrapper">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="project-screenshot"
                        loading="lazy"
                      />
                    </div>

                    <div className="card-body">
                      <h3 className="project-title">{project.title}</h3>
                      <h4 className="project-subtitle">{project.subtitle}</h4>
                      <p className="project-desc">{project.description}</p>

                      <div className="project-tags">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="tag-pill">{tag}</span>
                        ))}
                      </div>

                      <div className="card-actions">
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn-live-demo"
                        >
                          <span>Live Demo</span>
                          <FaExternalLinkAlt className="action-icon" />
                        </a>
                        <button 
                          onClick={() => setActiveProjectModal(project)}
                          className="btn-details"
                        >
                          Key Features
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {activeTab === 'tech' && (
            <div className="tech-wrapper">
              <div className="tech-intro">
                <h3>Skills &amp; Technologies</h3>
                <p>My technology stack focused on building responsive UIs and advanced animations using GSAP and Framer Motion.</p>
              </div>
              <motion.div 
                className="tech-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {techItems.map((tech, index) => (
                  <motion.div 
                    key={index}
                    variants={itemVariants}
                    className="tech-card"
                    whileHover={{ scale: 1.06, y: -5 }}
                  >
                    <div className="tech-icon-box">
                      {tech.icon ? (
                        <motion.img 
                          src={tech.icon} 
                          alt={tech.name} 
                          whileHover={{ rotate: 12 }}
                          loading="lazy"
                        />
                      ) : (
                        tech.customIcon
                      )}
                    </div>
                    <span className="tech-name">{tech.name}</span>
                    <span className="tech-level">{tech.level}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="certificates-wrapper">
              <div className="certificate-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <img src={certSef} alt="SEF Academy Certificate" style={{ width: '100%', borderRadius: '10px' }} />
                <div className="cert-info">
                  <h3>Front-end web development Diploma (React JS)</h3>
                  <p className="cert-issuer">SEF Academy</p>
                  <div className="cert-meta">
                    <span className="cert-status"><FaCheckCircle /> Verified Certificate</span>
                  </div>
                </div>
              </div>

              <div className="certificate-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                <img src={certWe} alt="WE Certificate" style={{ width: '100%', borderRadius: '10px' }} />
                <div className="cert-info">
                  <h3>Theoretical &amp; Practical and on job training Field</h3>
                  <p className="cert-issuer">WE</p>
                  <div className="cert-meta">
                    <span className="cert-status"><FaCheckCircle /> Verified Certificate</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Modal rendered via Portal — escapes ALL parent stacking contexts */}
      <AnimatePresence>
        {activeProjectModal && (
          <ProjectModal
            project={activeProjectModal}
            onClose={() => setActiveProjectModal(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Showcase;