import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HiddenAdminAccess() {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const [showAdminButton, setShowAdminButton] = useState(false);
  const navigate = useNavigate();
  
  // Secret key combination: Ctrl + Shift + A + D + M + I + N
  const secretKeys = ['Control', 'Shift', 'KeyA', 'KeyD', 'KeyM', 'KeyI', 'KeyN'];
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the current key combination matches the secret
      if (event.ctrlKey && event.shiftKey && event.code.startsWith('Key')) {
        const newSequence = [...keySequence, event.code];
        setKeySequence(newSequence);
        
        // Check if the sequence matches the secret
        const isSecretMatch = secretKeys.every((key, index) => {
          if (key === 'Control') return event.ctrlKey;
          if (key === 'Shift') return event.shiftKey;
          return newSequence.includes(key);
        });
        
        if (isSecretMatch && newSequence.length >= 5) {
          setShowAdminButton(true);
          setKeySequence([]);
          
          // Auto-hide after 10 seconds
          setTimeout(() => {
            setShowAdminButton(false);
          }, 10000);
        }
        
        // Reset if sequence gets too long
        if (newSequence.length > 7) {
          setKeySequence([]);
        }
      } else {
        // Reset sequence if non-secret key is pressed
        setKeySequence([]);
      }
    };

    const handleKeyUp = () => {
      // Reset sequence when modifier keys are released
      setTimeout(() => {
        setKeySequence([]);
      }, 1000);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [keySequence]);

  if (!showAdminButton) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => navigate('/admin')}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium transition-all duration-300 animate-pulse"
        title="Admin Access - This button will disappear in 10 seconds"
      >
        🔐 Admin Access
      </button>
    </div>
  );
}
