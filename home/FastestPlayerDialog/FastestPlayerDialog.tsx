import React from 'react';
import Dialog from '@mui/material/Dialog';
import { Button, Typography } from '@mui/material';
import { ThumbUpAlt, ThumbDownAlt } from '@mui/icons-material';
import { FastestPlayerDialogProps } from './FastestPlayer.types';

export const FastestPlayerDialog = ({
  player,
  handleGoodAnswer,
  handleWrongAnswer,
}: FastestPlayerDialogProps) => {
  if (!player) return null;
  return (
    <Dialog open={true}>
      <Typography sx={{ fontSize: 48, textAlign: 'center' }}>{player.name}</Typography>
      <div style={{ display: 'flex' }}>
        <Button onClick={handleGoodAnswer} sx={{ fontSize: 100 }}>
          <ThumbUpAlt color="success" fontSize="inherit" />
        </Button>
        <Button onClick={handleWrongAnswer} sx={{ fontSize: 100 }}>
          <ThumbDownAlt color="error" fontSize="inherit" />
        </Button>
      </div>
    </Dialog>
  );
};
