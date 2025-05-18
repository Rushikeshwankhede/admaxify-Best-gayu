
import React, { useState, useEffect, useRef } from 'react';

interface StatsCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const StatsCounter: React.FC<StatsCounterProps> = ({
  value,
  suffix = '',
  prefix = '',
  duration = 2000
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const steps = 60;
          const stepDuration = duration / steps;
          const stepValue = value / steps;
          let currentStep = 0;
          
          const timer = setInterval(() => {
            currentStep++;
            const nextValue = Math.round(Math.min(stepValue * currentStep, value));
            setCount(nextValue);
            
            if (currentStep >= steps) clearInterval(timer);
          }, stepDuration);
          
          return () => clearInterval(timer);
        }
      },
      {
        threshold: 0.2,
      }
    );
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    
    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, [value, duration, hasAnimated]);
  
  return (
    <div ref={countRef} className="font-bold text-4xl md:text-5xl text-agency-purple">
      {prefix}{count}{suffix}
    </div>
  );
};

export default StatsCounter;
