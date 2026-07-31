import React, { useState, useEffect } from 'react';

const Typewriter = ({
  text = '',
  speed = 70,
  delay = 500,
  loop = false,
  pauseDelay = 2000,
  className = '',
  cursorChar = '|',
  showCursor = true
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;

    if (!text) return;

    if (currentIndex === 0 && !isDeleting && displayedText === '') {
      timer = setTimeout(() => {
        setDisplayedText(text.substring(0, 1));
        setCurrentIndex(1);
      }, delay);
      return () => clearTimeout(timer);
    }

    if (!isDeleting && currentIndex < text.length) {
      timer = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex + 1));
        setCurrentIndex((prev) => prev + 1);
      }, speed);
    } else if (!isDeleting && currentIndex === text.length) {
      if (loop) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDelay);
      }
    } else if (isDeleting && currentIndex > 0) {
      timer = setTimeout(() => {
        setDisplayedText(text.substring(0, currentIndex - 1));
        setCurrentIndex((prev) => prev - 1);
      }, speed / 2);
    } else if (isDeleting && currentIndex === 0) {
      setIsDeleting(false);
      timer = setTimeout(() => {
        setDisplayedText(text.substring(0, 1));
        setCurrentIndex(1);
      }, delay);
    }

    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, text, speed, delay, loop, pauseDelay, displayedText]);

  return (
    <span className={`typewriter-container ${className}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
      <span>{displayedText}</span>
      {showCursor && (
        <span 
          className="typewriter-cursor"
          style={{
            display: 'inline-block',
            marginLeft: '2px',
            fontWeight: 'bold',
            animation: 'typewriterBlink 0.8s infinite',
            color: '#b36eff'
          }}
        >
          {cursorChar}
        </span>
      )}
      <style>{`
        @keyframes typewriterBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
};

export default Typewriter;
