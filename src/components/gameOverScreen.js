import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

export default function GameOverScreen({ winner }) {
  return (
    <div className="game-over">
      <div className="title-screen">
        <h1 className="game-title">GAME OVER</h1>
        <h3 className="emperor">
          <b>{winner}</b> is the new Emperor!
        </h3>
        <Button size="large" variant="outlined" color="primary" href="/" className="btn__basic">
          PLAY AGAIN
        </Button>
      </div>
    </div>
  );
}

GameOverScreen.propTypes = { winner: PropTypes.string.isRequired };
