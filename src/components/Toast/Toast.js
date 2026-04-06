import React from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle,
  Info,
  X,
} from 'react-feather';

import VisuallyHidden from '../VisuallyHidden';

import styles from './Toast.module.css';

const ANIMATION_DURATION = 400;

const ICONS_BY_VARIANT = {
  notice: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertOctagon,
};

function Toast({ variant, hideToast, children }) {
  const Icon = ICONS_BY_VARIANT[variant];
  const [isLeaving, setIsLeaving] = React.useState(false);

  const handleDismissRef = React.useRef(null);
  handleDismissRef.current = () => {
    setIsLeaving(true);
    setTimeout(hideToast, ANIMATION_DURATION);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => handleDismissRef.current(), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.toast} ${styles[variant]} ${isLeaving ? styles.leaving : ''}`}>
      <div className={styles.iconContainer}>
        <Icon size={24} />
      </div>
      <p className={styles.content}>
        <VisuallyHidden>{variant} - </VisuallyHidden>
        {children}
      </p>
      <button className={styles.closeButton} onClick={() => handleDismissRef.current()} aria-label="Dismiss message" aria-live="off">
        <X size={24} />
      </button>
    </div>
  );
}

export default Toast;
