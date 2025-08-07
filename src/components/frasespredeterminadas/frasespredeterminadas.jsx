import { useState } from 'react';
import './form.css';

function frasespredeterminadas({ phrases }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('fade-in');

  const handleRefresh = () => {
    setFadeClass('fade-out');
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      setFadeClass('fade-in');
    }, 300);
  };

  return (
    <div>
      <div className={`form-quote ${fadeClass}`}>
        “{phrases[currentIndex]}”
      </div>
      <button className="refresh-button" onClick={handleRefresh}>
        Otra frase
      </button>
    </div>
  );
}

export default frasespredeterminadas
