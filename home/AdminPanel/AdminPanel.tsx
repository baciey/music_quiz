import React from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { Close, SkipNext, SkipPrevious, PlayArrow, Pause } from '@mui/icons-material';
import { AdminPanelProps } from './AdminPanel.types';
import styles from './AdminPanel.module.css';
import { Song, SongType } from '../Home.types';

export const AdminPanel = ({
  isGameStarted,
  setIsGameStarted,
  keyCode,
  setKeyCode,
  handleAddPlayer,
  playerName,
  currentSongIndex,
  setCurrentSongIndex,
  setIsSongTitleDialogOpen,
  audioRef,
  songs,
  pauseSound,
  playSound,
  players,
  setPlayers,
  setPlayerName,
  setInactiveKeyCodes,
  setSongs,
  setIsMusicPlaying,
  lives,
  setLives,
}: AdminPanelProps) => {
  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      handleAddPlayer();
    }
  };

  const handleUploadFiles = (event: React.ChangeEvent<HTMLInputElement>, type: SongType) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    const newSongs: Song[] = [];
    files?.forEach(file => {
      const audio = new Audio(URL.createObjectURL(file));
      const name = file.name.split('.')[0];
      const url = URL.createObjectURL(file);
      const song = { audio, name, url, type };
      songs.push(song);
    });
    setSongs([...songs, ...newSongs]);
  };

  const shuffleArray = (arr: Song[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  const handleStartGame = () => {
    shuffleArray(songs);
    setIsGameStarted(true);
    localStorage.setItem('players', JSON.stringify(players));
    const copy = [...players];
    players.forEach(player => {
      player.lives = lives;
    });
    setPlayers(copy);
  };

  const handleLivesChange = (event: SelectChangeEvent) => {
    setLives(Number(event.target.value));
  };

  return (
    <>
      {!isGameStarted ? (
        <div className={styles.addPlayersPanel}>
          <div>
            <TextField
              label="Key"
              variant="outlined"
              placeholder="key"
              value={keyCode}
              size="small"
              onKeyDown={e => setKeyCode(e.code)}
            />
            <TextField
              label="Name"
              variant="outlined"
              placeholder="name"
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              size="small"
              onKeyDown={handleEnterPress}
            />
            <Button variant="contained" onClick={handleAddPlayer}>
              Add player
            </Button>
            <Button
              variant="contained"
              component="label"
              sx={{ marginLeft: '8px', marginRight: '8px' }}
            >
              Upload Songs (artist)
              <input type="file" hidden multiple onChange={e => handleUploadFiles(e, 'artist')} />
            </Button>
            <Button variant="contained" component="label">
              Upload Songs (title)
              <input type="file" hidden multiple onChange={e => handleUploadFiles(e, 'title')} />
            </Button>
            <span style={{ marginLeft: '8px' }}>Lives</span>
            <Select value={String(lives)} onChange={handleLivesChange} size="small">
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </div>
          <Button variant="contained" onClick={handleStartGame} disabled={songs.length === 0}>
            Start
          </Button>
        </div>
      ) : (
        <div className={styles.navigationPanel}>
          <div>
            <Typography>{'Piosenka: ' + (currentSongIndex + 1) + '/' + songs.length}</Typography>
            <Button
              variant="contained"
              onClick={() => {
                setInactiveKeyCodes([]);
                setIsMusicPlaying(false);
                setCurrentSongIndex(prev => prev - 1);
              }}
              disabled={currentSongIndex === 0}
            >
              <SkipPrevious />
            </Button>
            <Button
              variant="contained"
              onClick={playSound}
              sx={{ marginLeft: '8px', marginRight: '8px' }}
            >
              <PlayArrow />
            </Button>
            <Button variant="contained" onClick={pauseSound} sx={{ marginRight: '8px' }}>
              <Pause />
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setInactiveKeyCodes([]);
                setIsMusicPlaying(false);
                setCurrentSongIndex(prev => prev + 1);
              }}
              sx={{ marginRight: '8px' }}
              disabled={currentSongIndex === songs.length - 1}
            >
              <SkipNext />
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setInactiveKeyCodes([]);
                setIsSongTitleDialogOpen(true);
              }}
            >
              Pokaż tytuł
            </Button>
          </div>
          <Typography sx={{ fontSize: '50px' }}>
            {songs[currentSongIndex]?.type === 'artist'
              ? 'Wykonawca: punkty x1'
              : 'Tytuł piosenki: punkty x2'}
          </Typography>
          <audio ref={audioRef} src={songs[currentSongIndex]?.url} />
        </div>
      )}
      <div>
        {!isGameStarted
          ? players.map((player, index) => (
              <div className={styles.playerListItemContainer} key={index}>
                <div>{player.name + ' ' + player.keyCode}</div>
                <Button onClick={() => setPlayers(players.filter((_, i) => i !== index))}>
                  <Close />
                </Button>
              </div>
            ))
          : null}
      </div>
    </>
  );
};
