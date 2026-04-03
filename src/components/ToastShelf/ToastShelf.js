import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';

function ToastShelf({ toasts, hideToast }) {
  return (
    <ol className={styles.wrapper}>
      {toasts.map((t) => {
        return <li className={styles.toastWrapper} key={t.id}>
          <Toast variant={t.variant} hideToast={() => hideToast(t.id)}>{t.children}</Toast>
        </li>
      })}
    </ol>
  );
}

export default ToastShelf;
