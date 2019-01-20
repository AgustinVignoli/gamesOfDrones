import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export function PlayersSetUp({ canPlay, player1, player2, handleNameChange, startBattle }) {
  return (
    <Fragment>
      <h3 className="row">Enter players name:</h3>
      <div className="players-set-up row">
        <div className="player col-40">
          <TextField id="player1" label="Player 1:" value={player1.name} onChange={e => handleNameChange(e)} margin="normal" />
        </div>
        <div className="col-20">
          <Button
            size="large"
            variant="outlined"
            color="primary"
            className="btn__basic"
            disabled={!canPlay}
            onClick={() => startBattle()}
          >
            Battle!
          </Button>
        </div>
        <div className="player col-40">
          <TextField id="player2" label="Player 2:" value={player2.name} onChange={e => handleNameChange(e)} margin="normal" />
        </div>
      </div>
    </Fragment>
  );
}

PlayersSetUp.propTypes = {
  canPlay: PropTypes.bool.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  player1: PropTypes.object.isRequired,
  player2: PropTypes.object.isRequired,
  startBattle: PropTypes.func.isRequired,
};
