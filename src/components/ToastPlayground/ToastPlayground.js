import React from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';

import ToastShelf from '../ToastShelf';
import { ToastContext } from '../ToastProvider';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const { addToast } = React.useContext(ToastContext);

  const [selectedVariant, setSelectedVariant] = React.useState(VARIANT_OPTIONS[0])
  const [message, setMessage] = React.useState('');
  const messageRef = React.useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast(message, selectedVariant);
    setMessage('');
    setSelectedVariant(VARIANT_OPTIONS[0]);
    messageRef.current.focus();
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <form onSubmit={handleSubmit} className={styles.controlsWrapper}>
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
              ref={messageRef}
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
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
      <ToastShelf />
    </div>
  );
}

export default ToastPlayground;
