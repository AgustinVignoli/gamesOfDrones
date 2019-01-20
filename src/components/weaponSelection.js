import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import WeaponsList from './weaponsList';

export function WeaponSelection({
  player1, player2, handleSelectWeapon, weapons = [], canPlay, getRoundWinner,
}) {
  const commonProps = { handleSelectWeapon, weapons };
  return (
    <Fragment>
      <h3 className="row">Select your weapon:</h3>
      <div className="select-weapon row">
        <div className="col-40">
          <WeaponsList player={player1} {...commonProps} />
        </div>
        <div className="col-20">
          <Button
            size="large"
            variant="outlined"
            color="primary"
            className="btn__basic"
            disabled={!canPlay}
            onClick={() => getRoundWinner()}
          >
            Fight!
          </Button>
        </div>
        <div className="col-40">
          <WeaponsList player={player2} {...commonProps} />
        </div>
      </div>
    </Fragment>
  );
}

WeaponSelection.propTypes = {
  canPlay: PropTypes.bool.isRequired,
  getRoundWinner: PropTypes.func.isRequired,
  handleSelectWeapon: PropTypes.func.isRequired,
  player1: PropTypes.object.isRequired,
  player2: PropTypes.object.isRequired,
};
