import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

export function WeaponSelection({ player1, player2, hanldeSelectWeapon, canPlay, getRoundWinner }) {
  return (
    <Fragment>
      <h3 className="row">Select your weapon:</h3>
      <div className="select-weapon row">
        <div className="col-40">
          <FormControl className="select-weapon__from-control">
            <InputLabel htmlFor="player-1-weapons">{`${player1.name}´s weapon:`}</InputLabel>
            <Select
              value={player1.weapon}
              onChange={e => hanldeSelectWeapon(e, 'player1')}
              inputProps={{
                name: 'player-1-weapons',
                id: 'player-1-weapons',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="ROCK">Rock</MenuItem>
              <MenuItem value="PAPER">Paper</MenuItem>
              <MenuItem value="SCISSORS">Scissors</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="col-20">
          <Button size="large" variant="outlined" color="primary" className="btn__basic" disabled={!canPlay} onClick={() => getRoundWinner()}>
            Fight!
          </Button>
        </div>
        <div className="col-40">
          <FormControl className="select-weapon__from-control">
            <InputLabel htmlFor="player-2-weapons">{`${player2.name}´s weapon:`}</InputLabel>
            <Select
              value={player2.weapon}
              onChange={e => hanldeSelectWeapon(e, 'player2')}
              inputProps={{
                name: 'player-2-weapons',
                id: 'player-2-weapons',
              }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="ROCK">Rock</MenuItem>
              <MenuItem value="PAPER">Paper</MenuItem>
              <MenuItem value="SCISSORS">Scissors</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </Fragment>
  );
}

WeaponSelection.propTypes = {
  canPlay: PropTypes.bool.isRequired,
  getRoundWinner: PropTypes.func.isRequired,
  hanldeSelectWeapon: PropTypes.func.isRequired,
  player1: PropTypes.object.isRequired,
  player2: PropTypes.object.isRequired,
};
