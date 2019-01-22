import React from 'react';
import PropTypes from 'prop-types';

export default function Round({ winner: roundWinner, looser: roundLooser, movement: { killer, killed }, index }) {
  return (
    <div className="round-bloc">
      <p>{index + 1}</p>
      <div className="round-bloc__winner">
        <p>
          Winner: <b>{roundWinner}</b>
        </p>
        <p>
          Movement: <b>{killer}</b>
        </p>
      </div>
      <div className="round-bloc__looser">
        <p>
          Looser: <b>{roundLooser}</b>
        </p>
        <p>
          Movement: <b>{killed}</b>
        </p>
      </div>
    </div>
  );
}

Round.propTypes = {
  index: PropTypes.number,
  looser: PropTypes.string,
  movement: PropTypes.object,
  winner: PropTypes.string,
};
