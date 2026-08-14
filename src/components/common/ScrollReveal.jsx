import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, className = '', delay = 0, direction = 'up' }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const getDirectionClasses = () => {
    switch (direction) {
      case 'left':
        return isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0';
      case 'right':
        return isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0';
      case 'down':
        return isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0';
      case 'scale':
        return isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0';
      case 'up':
      default:
        return isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0';
    }
  };

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out transform ${getDirectionClasses()} ${className}`}
    >
      {children}
    </div>
  );
}
