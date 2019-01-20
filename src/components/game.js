import React, { Component } from 'react';
import { isEmpty, find, isNil } from 'lodash';
import ScoresTable from './scoresTable';
import { PlayersSetUp } from './playersSetUp';
import { WeaponSelection } from './weaponSelection';
import GameOverScreen from './gameOverScreen';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: { name: '', weapon: '', victories: 0, label: 'player1' },
      player2: { name: '', weapon: '', victories: 0, label: 'player2' },
      winner: null,
      roundsHistory: [],
      canPlay: false,
      showSelectWeapon: false,
      showPlayersName: true,
    };
  }

  handleNameChange = (event) => {
    const { value: name, id: player } = event.target;
    this.setState(
      prevState => ({
        [player]: {
          ...prevState[player],
          name,
        },
        prevCanPlay: prevState.canPlay,
      }),
      () => {
        const { player1, player2, prevCanPlay } = this.state;
        if (!isEmpty(player1) && !isEmpty(player2)) {
          this.setState({ canPlay: true });
        } else if (isEmpty(player1) || (isEmpty(player2) && prevCanPlay)) {
          this.setState({ canPlay: false });
        }
      },
    );
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

  gameOverScreen = () => {
    this.setState({
      showSelectWeapon: false,
      showPlayersName: false,
      roundsHistory: [],
    });
  };

  getRoundWinner = () => {
    // const { gameConfiguration } = this.props;
    const gameConfiguration = [{ move: 'PAPER', kills: 'ROCK' }, { move: 'ROCK', kills: 'SCISSORS' }, { move: 'SCISSORS', kills: 'PAPER' }];
    const {
      player1: { name: p1Name, weapon: p1Weapon, victories: p1PrevVictories },
      player2: { name: p2Name, weapon: p2Weapon, victories: p2PrevVictories },
      roundsHistory,
    } = this.state;
    let threeRoundsWinner;
    let result;
    let p1Victories = p1PrevVictories;
    let p2Victories = p2PrevVictories;

    if (p1Weapon === p2Weapon) {
      result = { winner: 'Tie' };
    } else if (find(gameConfiguration, { move: p1Weapon, kills: p2Weapon })) {
      p1Victories += 1;
      result = { winner: p1Name, player: 'player1', victories: p1Victories };
    } else {
      p2Victories += 1;
      result = { winner: p2Name, player: 'player2', victories: p2Victories };
    }

    if (p1Victories >= 3) {
      threeRoundsWinner = p1Name;
    } else if (p2Victories >= 3) {
      threeRoundsWinner = p2Name;
    }

    this.setState(
      (prevState) => {
        const { winner, player, victories } = result;
        let newState = { roundsHistory: [...roundsHistory, { winner }] };

        if (winner !== 'Tie') {
          newState = {
            ...newState,
            [player]: { ...prevState[player], victories },
          };
        }

        return newState;
      },
      () => {
        if (!isNil(threeRoundsWinner)) {
          this.setState({ winner: threeRoundsWinner }, () => {
            this.gameOverScreen();
          });
        }
      },
    );
  };

  render() {
    const {
      canPlay, player1, player2, showSelectWeapon, showPlayersName, roundsHistory, winner,
    } = this.state;
    // const { weapons } = this.props;
    const weapons = [{ name: 'ROCK', value: 'ROCK' }, { name: 'PAPER', value: 'PAPER' }, { name: 'SCISSORS', value: 'SCISSORS' }];
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
    const gameOverScreenProps = { winner };
    const showGameOverScreen = winner && !showPlayersName && !showSelectWeapon && !showScores;

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

export default Game;
