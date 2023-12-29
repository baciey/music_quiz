import { Player } from '../Home.types';

export interface GameBoardProps {
  inactiveKeyCodes: string[];
  gameOverKeyCodes: string[];
  isGameStarted: boolean;
  players: Player[];
  fastestPlayer: Player | null;
}
