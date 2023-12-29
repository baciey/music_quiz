import React from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import styles from './Confetti.module.css';
import { ConfettiProps } from './Confetti.types';

export const Confetti = ({ isOpen }: ConfettiProps) => {
  if (!isOpen) return null;
  return (
    <>
      <div className={styles.confetti1}>
        <ConfettiExplosion duration={3000} zIndex={9999} />
      </div>
      <div className={styles.confetti2}>
        <ConfettiExplosion duration={4000} zIndex={9999} />
      </div>
      <div className={styles.confetti3}>
        <ConfettiExplosion duration={5000} zIndex={9999} />
      </div>
    </>
  );
};
