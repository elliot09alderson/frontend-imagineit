import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

const Toast = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleRateLimit = () => {
      setMessage('Daily API limit exceeded. Please try again tomorrow.');
      setShow(true);
      // Auto hide after 5 seconds
      setTimeout(() => setShow(false), 5000);
    };

    window.addEventListener('rate-limit-exceeded', handleRateLimit);

    return () => {
      window.removeEventListener('rate-limit-exceeded', handleRateLimit);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-3 bg-red-600 text-white px-6 py-4 rounded-lg shadow-2xl border border-red-500"
        >
          <AlertTriangle size={24} />
          <span className="font-medium">{message}</span>
          <button onClick={() => setShow(false)} className="ml-4 hover:bg-red-700 p-1 rounded">
            <X size={18} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
