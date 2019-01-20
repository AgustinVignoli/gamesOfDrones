import React from 'react';
import Button from '@material-ui/core/Button';

export const Home = () => (
  <div className="title-screen">
    <h1 className="game-title">Game of Drones</h1>
    <Button size="large" variant="outlined" color="primary" href="/game" className="btn__basic">
      PLAY
    </Button>
  </div>
);
