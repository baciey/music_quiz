import { Player } from '../Home.types';

export interface GameBoardProps {
  inactiveKeyCodes: string[];
  isGameStarted: boolean;
  players: Player[];
  fastestPlayer: Player | null;
}
