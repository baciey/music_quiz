import Image from 'next/image';
import React from 'react';
import styles from './Vinyl.module.css';
import { VinylProps } from './Vinyl.types';

export const Vinyl = ({ isMusicPlaying, isGameStarted, players }: VinylProps) => {
  if (!isGameStarted) return null;
  const playersSorted = [...players].sort((a, b) => b.score - a.score);
  const listItems = playersSorted.map((player, index) => {
    let style = {};
    if (index === 0) {
      style = { color: 'green' };
    } else if (index === players.length - 1) {
      style = { color: 'red' };
    }
    return (
      <li key={index} className={`${styles.listItem} ${styles.style}`}>
        <p style={style}>
          <span>{index + 1 + '. ' + player.name}</span>
          <span>{player.score}</span>
        </p>
      </li>
    );
  });
  return (
    <div className={styles.vinylContainer}>
      <ul className={styles.list}>{listItems}</ul>
      <Image
        src="vinyl.png"
        alt="vinyl"
        width={200}
        height={200}
        className={isMusicPlaying ? styles.vinyl : ''}
      />
      <div style={{ width: 200 }}></div>
    </div>
  );
};
