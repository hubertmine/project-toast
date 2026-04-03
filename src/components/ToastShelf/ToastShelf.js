import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';
import { ToastContext } from '../ToastProvider';

function ToastShelf() {
  const { toasts, hideToast } = React.useContext(ToastContext);

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {toasts.map((t) => {
        return <li className={styles.toastWrapper} key={t.id}>
          <Toast variant={t.variant} hideToast={() => hideToast(t.id)}>{t.children}</Toast>
        </li>
      })}
    </ol>
  );
}

export default ToastShelf;
