import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');
  const navbarRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const sectionObserverRef = useRef(null);

  useEffect(() => {
    // تحديد الصفحة الحالية عند التحميل
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash && ['home', 'about', 'pricing', 'contact'].includes(currentHash)) {
      setActiveLink(currentHash);
    }

    // تهيئة Intersection Observer لمراقبة الأقسام
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -50% 0px', // يمكن تعديل هذه القيم حسب الحاجة
      threshold: 0
    };

    sectionObserverRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
          // تحديث عنوان URL بدون إعادة تحميل الصفحة
          window.history.replaceState(null, '', `#${entry.target.id}`);
        }
      });
    }, observerOptions);

    // مراقبة جميع الأقسام
    const sections = ['home', 'about', 'pricing', 'contact']
      .map(id => document.getElementById(id))
      .filter(Boolean);

    sections.forEach(section => {
      if (section) sectionObserverRef.current.observe(section);
    });

    // تأثيرات التمرير للـ navbar
    let lastScrollY = window.pageYOffset;
    const SCROLL_THRESHOLD = 100;
    const SCROLL_DELAY = 300;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      setIsScrolled(currentScrollY > 50);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        if (currentScrollY > lastScrollY && currentScrollY > SCROLL_THRESHOLD) {
          setIsCollapsed(true);
        } else if (currentScrollY < lastScrollY || currentScrollY <= SCROLL_THRESHOLD) {
          setIsCollapsed(false);
        }
        lastScrollY = currentScrollY;
      }, SCROLL_DELAY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      if (sectionObserverRef.current) {
        sections.forEach(section => {
          if (section) sectionObserverRef.current.unobserve(section);
        });
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (e, linkName) => {
    e.preventDefault();
    setActiveLink(linkName);
    setIsMenuOpen(false);
    
    const element = document.getElementById(linkName);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // تحديث عنوان URL
      window.history.pushState(null, '', `#${linkName}`);
    }
  };

  return (
    <nav 
      className={`navbar ${isCollapsed ? 'collapsed' : ''} ${isScrolled ? 'scrolled' : ''}`}
      ref={navbarRef}
    >
      <div className="navbar-container">
        <motion.a 
          href="#home" 
          className="logo" 
          onClick={(e) => handleLinkClick(e, 'home')}
          whileHover={{
            y: -8,
            scale: 1.2,
            rotate: [0, -10, 10, 0],
            transition: { duration: 0.5 }
          }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="logo-text">Ellol</span>
        </motion.a>
        
        <button 
          className={`hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <FontAwesomeIcon icon={faTimes} className="hamburger-icon" />
          ) : (
            <FontAwesomeIcon icon={faBars} className="hamburger-icon" />
          )}
        </button>
        
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-menu">
            <li>
              <a 
                href="#home" 
                className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, 'home')}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, 'about')}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#pricing" 
                className={`nav-link ${activeLink === 'pricing' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, 'pricing')}
              >
                Portfolio
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}
                onClick={(e) => handleLinkClick(e, 'contact')}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;