import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';
import Toast from '../Toast';
import ToastShelf from '../ToastShelf';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {

  const [selectedVariant, setSelectedVariant] = React.useState(VARIANT_OPTIONS[0])
  const [message, setMessage] = React.useState('');

  const [toasts, setToasts] = React.useState([]);

  const handleClick = () => {
    setToasts((toasts) => [...toasts, {
      variant: selectedVariant, isShowed: true, children: message, id: crypto.randomUUID()
    }])
  };

  const hideToast = (id) => {
    const toastsToKeep = toasts.filter(t => t.id !== id)
    setToasts(toastsToKeep);
  }
  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <div className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={message}
              onChange={e => { setMessage(e.target.value) }}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >

            {VARIANT_OPTIONS.map(option => {
              return <label key={option} htmlFor={`variant-${option}`}>
                <input
                  id={`variant-${option}`}
                  type="radio"
                  name="variant"
                  value={option}
                  checked={selectedVariant === option}
                  onChange={e => setSelectedVariant(e.target.value)}
                />
                {option}
              </label>

            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            <Button onClick={handleClick}>Pop Toast!</Button>
          </div>
        </div>
      </div>
      <ToastShelf toasts={toasts} hideToast={hideToast}></ToastShelf>
    </div>
  );
}

export default ToastPlayground;
