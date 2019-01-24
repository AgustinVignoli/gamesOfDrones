import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty, find, isNil } from 'lodash';
import ScoresTable from './scoresTable';
import { PlayersSetUp } from './playersSetUp';
import { WeaponSelection } from './weaponSelection';
import GameOverScreen from './gameOverScreen';
import { saveNewGame, loadPrevConfig } from '../actions/gameActions';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: { name: '', weapon: '', victories: 0, label: 'player1' },
      player2: { name: '', weapon: '', victories: 0, label: 'player2' },
      winner: null,
      looser: null,
      roundsHistory: [],
      canPlay: false,
      showSelectWeapon: false,
      showPlayersName: true,
    };
  }

  componentDidMount() {
    const { onLoadConfig } = this.props;
    onLoadConfig();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      winner,
      looser,
      roundsHistory,
      player1: { name: name1 },
      player2: { name: name2 },
    } = this.state;
    const { canPlay: prevCanPlay } = prevState;
    const { onSaveGame } = this.props;

    if (!isNil(winner)) {
      this.setState({
        matchWinner: winner,
        winner: null,
        showSelectWeapon: false,
        showPlayersName: false,
        roundsHistory: [],
      }, () => (
        onSaveGame({ winner, looser, rounds: roundsHistory })
      ));
    }

    if (!isEmpty(name1) && !isEmpty(name2) && !prevCanPlay) {
      this.setState({ canPlay: true });
    } else if ((isEmpty(name1) || isEmpty(name2)) && prevCanPlay) {
      this.setState({ canPlay: false });
    }
  }

  handleNameChange = (event) => {
    const { value: name, id: player } = event.target;
    this.setState(prevState => ({
      [player]: {
        ...prevState[player],
        name,
      },
    }));
  };

  handleSelectWeapon = (event, player) => {
    const { target: { value: weapon } } = event;
    this.setState(prevState => ({
      [player]: {
        ...prevState[player],
        weapon,
      },
    }));
  };

  startBattle = () => {
    this.setState(prevState => ({
      showSelectWeapon: !prevState.showSelectWeapon,
      showPlayersName: !prevState.showPlayersName,
    }));
  };

  getRoundWinner = () => {
    const { savedConfig: gameConfiguration } = this.props;
    const {
      player1: { name: p1Name, weapon: p1Weapon, victories: p1PrevVictories },
      player2: { name: p2Name, weapon: p2Weapon, victories: p2PrevVictories },
      roundsHistory,
    } = this.state;
    let gameWinner;
    let gameLooser;
    let result;
    let p1Victories = p1PrevVictories;
    let p2Victories = p2PrevVictories;

    if (find(gameConfiguration, { move: p1Weapon, kills: p2Weapon })) {
      p1Victories += 1;
      result = {
        winner: p1Name,
        looser: p2Name,
        movement: { killer: p1Weapon, killed: p2Weapon },
        player: 'player1',
        victories: p1Victories,
      };
    } else if (find(gameConfiguration, { move: p2Weapon, kills: p1Weapon })) {
      p2Victories += 1;
      result = {
        winner: p2Name,
        looser: p1Name,
        movement: { killer: p2Weapon, killed: p1Weapon },
        player: 'player2',
        victories: p2Victories,
      };
    } else {
      result = { winner: 'Tie', movement: { killer: '', killed: '' } };
    }

    if (p1Victories >= 3) {
      gameWinner = p1Name;
      gameLooser = p2Name;
    } else if (p2Victories >= 3) {
      gameWinner = p2Name;
      gameLooser = p1Name;
    }

    this.setState((prevState) => {
      const { winner, looser, movement, player, victories } = result;
      let newState = { roundsHistory: [...roundsHistory, { winner, looser, movement }] };

      if (winner !== 'Tie') {
        newState = {
          ...newState,
          [player]: { ...prevState[player], victories },
        };
      }

      if (!isNil(gameWinner)) {
        newState = {
          ...newState,
          winner: gameWinner,
          looser: gameLooser,
        };
      }

      return newState;
    });
  };

  render() {
    const {
      canPlay, player1, player2, showSelectWeapon, showPlayersName, roundsHistory, matchWinner,
    } = this.state;
    const { weaponsList: weapons } = this.props;
    const showScores = !isEmpty(roundsHistory);
    const scoresTableProps = {
      players: [{ name: player1.name }, { name: player2.name }],
      rounds: roundsHistory,
    };
    const setUpProps = {
      canPlay,
      player1,
      player2,
      handleNameChange: this.handleNameChange,
      startBattle: this.startBattle,
    };
    const weaponSelectionProps = {
      player1,
      player2,
      handleSelectWeapon: this.handleSelectWeapon,
      canPlay: true,
      getRoundWinner: this.getRoundWinner,
      weapons,
    };
    const gameOverScreenProps = { winner: matchWinner };
    const showGameOverScreen = matchWinner && !showPlayersName && !showSelectWeapon && !showScores;

    return (
      <div className="game-canvas">
        {showPlayersName && <PlayersSetUp {...setUpProps} />}
        {showSelectWeapon && <WeaponSelection {...weaponSelectionProps} />}
        {showScores && <ScoresTable {...scoresTableProps} />}
        {showGameOverScreen && <GameOverScreen {...gameOverScreenProps} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { configurationReducer: { savedConfig, weaponsList, isLoaded } } = state;
  return {
    savedConfig: isLoaded ? savedConfig : [],
    weaponsList: isLoaded ? weaponsList : [],
  };
};

const mapDispatchToProps = dispatch => ({
  onSaveGame(game) {
    dispatch(saveNewGame(game));
  },
  onLoadConfig() {
    dispatch(loadPrevConfig());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);
