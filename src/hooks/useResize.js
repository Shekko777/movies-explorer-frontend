import { useState, useEffect, useCallback } from 'react';

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = useCallback((evt) => {
    setWidth(evt.target.innerWidth);
  });
  
  useEffect(() => {
    setTimeout(() => {
      window.addEventListener('resize', handleResize);
    }, 2000)
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  if(width <= 480) {
    return {
      quantity: 5,
      term: 2,
    };
  } else if (width > 480 && width <= 768) {
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


