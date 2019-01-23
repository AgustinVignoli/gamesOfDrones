import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isNull, isEmpty } from 'lodash';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { loadGames, deleteRecordById } from '../actions/gameActions';
import Round from './round';
import ConfirmationDialog from './confirmDialog';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    width: '80%',
    maxHeight: 435,
  },
});

class GameHistory extends Component {
  constructor(props) {
    super(props);

    const { savedGames, onLoadGames } = this.props;
    this.state = { savedGames, openModal: false, confirmDelete: false };
    onLoadGames();
  }

  componentDidUpdate(prevProps) {
    const { savedGames: prevSavedGames } = prevProps;
    const { savedGames, onDeleteRecord } = this.props;
    const { confirmDelete, recordToBeDeleted } = this.state;

    if (savedGames !== prevSavedGames) {
      this.setState({ savedGames });
    }

    if (confirmDelete) {
      this.setState({ confirmDelete: false }, () => {
        onDeleteRecord(recordToBeDeleted);
      });
    }
  }

  handleDeleteRecord = (id) => {
    this.setState({
      openModal: true,
      recordToBeDeleted: id,
    });
  };

  handleCloseModal = (confirmDelete) => {
    this.setState({ confirmDelete, openModal: false });
  };

  render() {
    const { savedGames, openModal } = this.state;
    const { isLoaded, classes } = this.props;
    const savedGamesLoaded = !isNull(savedGames) && !isEmpty(savedGames);
    const showLoadingTitle = !isLoaded && isNull(savedGames);
    const showEmptyHistoryTitle = !savedGamesLoaded;

    return (
      <Fragment>
        {showLoadingTitle && <h1 className="game-title">Loading...</h1>}
        {showEmptyHistoryTitle && <h1 className="game-title">Empty history</h1>}
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
                    {rounds.map((round, i) => (
                      <Round {...round} index={i} />
                    ))}
                  </div>
                </div>
                <div className="actions">
                  <IconButton aria-label="Delete" onClick={() => this.handleDeleteRecord(_id)}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </Fragment>
        )}
        <ConfirmationDialog classes={{ paper: classes.paper }} open={openModal} onClose={this.handleCloseModal} />
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
    savedGames: savedGames || null,
    isLoaded: isLoaded || false,
    errors,
  };
};

const mapDispatchToProps = dispatch => ({
  onLoadGames() {
    dispatch(loadGames());
  },
  onDeleteRecord(id) {
    dispatch(deleteRecordById(id));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(GameHistory));
