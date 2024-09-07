import { useState, useEffect } from 'react';
const TypeWriter = ({ text, speed }) => {
    const [displayText, setDisplayText] = useState('');
  
    useEffect(() => {
      let currentText = '';
      let currentIndex = 0;
  
      const intervalId = setInterval(() => {
        currentText = text.substring(0, currentIndex + 1);
        setDisplayText(currentText);
  
        if (currentIndex === text.length) {
          clearInterval(intervalId);
        } else {
          currentIndex++;
        }
      }, speed);
  
      return () => {
        clearInterval(intervalId);
      };
    }, [text, speed]);
  
    return <span>{displayText}</span>;
  };

  export default TypeWriter;