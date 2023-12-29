import { Player } from '../Home.types';

export interface FastestPlayerDialogProps {
  player: Player | null;
  handleGoodAnswer: () => void;
  handleWrongAnswer: () => void;
}
