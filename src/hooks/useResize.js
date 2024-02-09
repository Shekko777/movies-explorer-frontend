import { useState, useEffect } from 'react';

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      setWidth(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if(width <= 450) {
    return {
      quantity: 4,
      term: 1,
    };
  } else if (width > 450 && width <= 768) {
    return {
      quantity: 8,
      term: 2,
    };
  } else {
    return {
      quantity: 12,
      term: 3,
    };
  }
};