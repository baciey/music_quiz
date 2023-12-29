import { Dispatch, SetStateAction } from 'react';
import { Player, Song } from '../Home.types';

export interface AdminPanelProps {
  keyCode: string;
  setKeyCode: Dispatch<SetStateAction<string>>;
  isGameStarted: boolean;
  setIsGameStarted: Dispatch<SetStateAction<boolean>>;
  handleAddPlayer: () => void;
  playerName: string;
  currentSongIndex: number;
  setCurrentSongIndex: Dispatch<SetStateAction<number>>;
  setIsSongTitleDialogOpen: Dispatch<SetStateAction<boolean>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  pauseSound: () => void;
  playSound: () => void;
  players: Player[];
  setPlayerName: Dispatch<SetStateAction<string>>;
  setPlayers: Dispatch<SetStateAction<Player[]>>;
  setInactiveKeyCodes: Dispatch<SetStateAction<string[]>>;
  songs: Song[];
  setSongs: Dispatch<SetStateAction<Song[]>>;
  setIsMusicPlaying: Dispatch<SetStateAction<boolean>>;
}
