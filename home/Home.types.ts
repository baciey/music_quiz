export interface Player {
  name: string;
  score: number;
  lives: number;
  img: string | null;
  keyCode: string;
}

export type SongType = 'artist' | 'title';

export interface Song {
  name: string;
  audio: HTMLAudioElement;
  url: string;
  type: SongType;
}
