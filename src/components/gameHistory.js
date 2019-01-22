import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { partial, isEmpty } from 'lodash';
import classNames from 'classnames';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import { loadGames } from '../actions/gameActions';

class GameHistory extends Component {
  constructor(props) {
    super(props);

    const { savedGames } = this.props;
    this.state = { savedGames: savedGames || [] };
  }

  componentDidMount() {
    const { onLoadGames } = this.props;
    onLoadGames();
  }

  componentDidUpdate(prevProps) {
    const { savedGames: prevSavedGames } = prevProps;
    const { savedGames } = this.props;

    if (savedGames !== prevSavedGames) {
      this.setState({ savedGames });
    }
  }

  handleDeleteRecord = (id) => {
    const { onDeleteRecord } = this.props;
    onDeleteRecord(id);
  };

  render() {
    const { savedGames } = this.state;
    const savedGamesLoaded = !isEmpty(savedGames);

    return (
      <Fragment>
        {!savedGamesLoaded && <h1 className="game-title"> Loading...</h1>}
        {savedGamesLoaded && (
          <Fragment>
            <h1 className="game-title">History</h1>
            {savedGames.map(({ _id, winner, looser, rounds }, index) => (
              <div className="match">
                <div className="match-number">{index + 1}</div>
                <div className="winner-avatar">
                  <Avatar className="winner-avatar__icon">
                    <Icon className={classNames('fas fa-trophy')} />
                  </Avatar>
                  <p>{winner}</p>
                </div>
                <div className="looser-avatar">
                  <Avatar className="looser-avatar__icon">
                    <Icon className={classNames('fas fa-skull')} />
                  </Avatar>
                  <p>{looser}</p>
                </div>
                <div className="rounds">
                  <div className="rounds__wrapper">
                    <p className="rounds-header">Rounds: </p>
                    {rounds.map(({ winner: roundWinner, looser: roundLooser, movement: { killer, killed } }) => (
                      <div className="round-bloc">
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
                    ))}
                  </div>
                </div>
                <div className="actions">
                  <Avatar className="delete-button" onClick={partial(this.handleDeleteRecord, _id)}>
                    <Icon className={classNames('far fa-trash-alt')} />
                  </Avatar>
                </div>
              </div>
            ))}
          </Fragment>
        )}
      </Fragment>
    );
  }
}

GameHistory.propTypes = {
  savedGames: PropTypes.array.isRequired,
  onDeleteRecord: PropTypes.func.isRequired,
  onLoadGames: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { gameReducer: { savedGames, isLoaded, errors } } = state;
  return {
    savedGames: isLoaded ? savedGames : [],
    errors,
  };
};

const mapDispatchToProps = dispatch => ({
  onLoadGames() {
    dispatch(loadGames());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameHistory);
