import React from 'react';
import Dialog from '@mui/material/Dialog';
import { Typography } from '@mui/material';
import { SongTitleDialogProps } from './SongTitleDialog.types';

export const SongTitleDialog = ({
  isSongTitleDialogOpen,
  handleCloseSongTitleDialog,
  songTitle,
}: SongTitleDialogProps) => {
  return (
    <Dialog open={isSongTitleDialogOpen} onClose={handleCloseSongTitleDialog}>
      <div style={{ display: 'flex' }}>
        <Typography sx={{ fontSize: 48, textAlign: 'center', padding: '10px' }}>
          {songTitle}
        </Typography>
      </div>
    </Dialog>
  );
};
