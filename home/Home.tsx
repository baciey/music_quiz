import type { NextPage } from 'next';
import styles from './Home.module.css';
import { useEffect, useRef, useState } from 'react';
import { Player, Song } from './Home.types';
import { Confetti } from './Confetti/Confetti';
import { Vinyl } from './Vinyl/Vinyl';
import { SongTitleDialog } from './SongTitleDialog/SongTitleDialog';
import { FastestPlayerDialog } from './FastestPlayerDialog/FastestPlayerDialog';
import { AdminPanel } from './AdminPanel/AdminPanel';
import { GameBoard } from './GameBoard/GameBoard';
import Image from 'next/image';

const fakePlayers = [
  {
    name: 'Mirek',
    score: 0,
    lives: 3,
    img: null,
    keyCode: 'KeyQ',
  },
  {
    name: 'Halina',
    score: 0,
    lives: 3,
    img: null,
    keyCode: 'KeyW',
  },
  {
    name: 'Gocha',
    score: 0,
    lives: 3,
    img: null,
    keyCode: 'KeyE',
  },
  {
    name: 'Tomasz',
    score: 0,
    lives: 3,
    img: null,
    keyCode: 'KeyR',
  },
  {
    name: 'Kacha',
    score: 0,
    lives: 3,
    img: null,
    keyCode: 'KeyT',
  },
  {
    name: 'Sara',
    score: 0,
    lives: 3,
    img: null,
    keyCode: 'KeyY',
  },
];

export const HomePage: NextPage = () => {
  const [players, setPlayers] = useState<Player[]>(fakePlayers);
  const [playerName, setPlayerName] = useState<string>('');
  const [keyCode, setKeyCode] = useState<string>('');
  const [songs, setSongs] = useState<Song[]>([]);
  const [lives, setLives] = useState<number>(3);

  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [fastestPlayer, setFastestPlayer] = useState<Player | null>(null);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [inactiveKeyCodes, setInactiveKeyCodes] = useState<string[]>([]);
  const [gameOverKeyCodes, setGameOverKeyCodes] = useState<string[]>([]);
  const [isSongTitleDialogOpen, setIsSongTitleDialogOpen] = useState<boolean>(false);
  const [isExploding, setIsExploding] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const asyncStoragePlayers = localStorage.getItem('players');
    if (asyncStoragePlayers) {
      setPlayers(JSON.parse(asyncStoragePlayers));
    }
  }, []);

  const handleAddPlayer = () => {
    if (!playerName.trim() || !keyCode) return;
    const player = {
      name: playerName,
      score: 0,
      lives: 3,
      img: null,
      keyCode: keyCode,
    };
    setPlayers([...players, player]);
    setPlayerName('');
    setKeyCode('');
  };

  const playSound = () => {
    audioRef?.current?.play();
    setIsMusicPlaying(true);
  };

  const pauseSound = () => {
    audioRef?.current?.pause();
    setIsMusicPlaying(false);
  };

  const handleKeyDownWhenMusicIsPlaying = (e: KeyboardEvent) => {
    if (!isMusicPlaying) return;
    const fastestPlayer = players.find(player => player.keyCode === e.code) || null;
    if (
      fastestPlayer &&
      !inactiveKeyCodes.includes(fastestPlayer.keyCode) &&
      !gameOverKeyCodes.includes(fastestPlayer.keyCode)
    ) {
      setIsMusicPlaying(false);
      audioRef?.current?.pause();
      setFastestPlayer(fastestPlayer);
    }
  };

  const handleGoodAnswer = () => {
    if (!fastestPlayer) return;
    const copy = [...players];
    const index = copy.findIndex(player => player.name === fastestPlayer.name);
    const points = songs[currentSongIndex]?.type === 'artist' ? 10 : 20;
    copy[index].score += points;
    setPlayers(copy);
    setFastestPlayer(null);
    setIsSongTitleDialogOpen(true);
    setInactiveKeyCodes([]);
    setIsExploding(true);
  };

  const handleWrongAnswer = () => {
    if (!fastestPlayer) return;
    const copy = [...players];
    const index = copy.findIndex(player => player.name === fastestPlayer.name);
    copy[index].lives -= 1;
    setPlayers(copy);
    setFastestPlayer(null);
    setInactiveKeyCodes([...inactiveKeyCodes, fastestPlayer.keyCode]);
    if (copy[index].lives === 0) {
      setGameOverKeyCodes([...gameOverKeyCodes, fastestPlayer.keyCode]);
    }
  };

  const handleCloseSongTitleDialog = () => {
    setIsSongTitleDialogOpen(false);
    setIsExploding(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDownWhenMusicIsPlaying);
    return () => document.removeEventListener('keydown', handleKeyDownWhenMusicIsPlaying);
  }, [isMusicPlaying]);

  return (
    <>
      <div className={styles.container}>
        <Image
          src="bg.jpeg"
          alt="bg"
          className={styles.bgImage}
          width={100}
          height={100}
          layout="fill"
        />
        <AdminPanel
          keyCode={keyCode}
          setKeyCode={setKeyCode}
          setPlayerName={setPlayerName}
          handleAddPlayer={handleAddPlayer}
          playerName={playerName}
          isGameStarted={isGameStarted}
          setIsGameStarted={setIsGameStarted}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          setIsSongTitleDialogOpen={setIsSongTitleDialogOpen}
          audioRef={audioRef}
          pauseSound={pauseSound}
          playSound={playSound}
          players={players}
          setPlayers={setPlayers}
          setInactiveKeyCodes={setInactiveKeyCodes}
          songs={songs}
          setSongs={setSongs}
          setIsMusicPlaying={setIsMusicPlaying}
          lives={lives}
          setLives={setLives}
        />
        <GameBoard
          players={players}
          isGameStarted={isGameStarted}
          inactiveKeyCodes={inactiveKeyCodes}
          fastestPlayer={fastestPlayer}
          gameOverKeyCodes={gameOverKeyCodes}
        />
        <Vinyl isMusicPlaying={isMusicPlaying} isGameStarted={isGameStarted} players={players} />
      </div>
      {/* MODALS  */}
      <FastestPlayerDialog
        player={fastestPlayer}
        handleGoodAnswer={handleGoodAnswer}
        handleWrongAnswer={handleWrongAnswer}
      />
      <SongTitleDialog
        isSongTitleDialogOpen={isSongTitleDialogOpen}
        handleCloseSongTitleDialog={handleCloseSongTitleDialog}
        songTitle={songs[currentSongIndex]?.name}
      />
      <Confetti isOpen={isExploding} />
    </>
  );
};
