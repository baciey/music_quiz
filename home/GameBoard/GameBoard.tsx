import React from 'react';
import { GameBoardProps } from './GameBoardTypes';
import styles from './GameBoard.module.css';

export const GameBoard = ({
  isGameStarted,
  inactiveKeyCodes,
  players,
  fastestPlayer,
}: GameBoardProps) => {
  return (
    <div
      className={`${styles.playersContainer}`}
      style={{ gridTemplateColumns: `repeat(${players.length}, 1fr)` }}
    >
      {isGameStarted &&
        players.map((player, index) => {
          const isFastest = fastestPlayer?.name === player.name;
          return (
            <div
              key={index}
              className={`${styles.player} ${
                inactiveKeyCodes.includes(player.keyCode) && styles.inactivePlayer
              } ${isFastest && styles.fastestPlayer}`}
            >
              <div
                className={`${styles.playerInner} ${isFastest && styles.fastestPlayerInner}`}
              ></div>
              <div className={styles.playerData}>
                <p>{player.name}</p>
                <p>{'Punkty: ' + player.score}</p>
                <p>{'Życie: ' + player.lives}</p>
                <p>{player.keyCode.slice(3)}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};
