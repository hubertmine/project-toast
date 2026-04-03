import React from 'react';

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = (message, variant) => {
    setToasts((prev) => [
      ...prev,
      { id: crypto.randomUUID(), children: message, variant },
    ]);
  };

  const hideToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setToasts([]);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
