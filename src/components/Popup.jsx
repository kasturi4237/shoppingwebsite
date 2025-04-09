import { useEffect } from 'react';
import '../index.css';

const Popup = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup">
        <div className="popup-content">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;