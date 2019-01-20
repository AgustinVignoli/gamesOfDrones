import React, { Component } from 'react';
import { isEmpty, find } from 'lodash';
import ScoresTable from './scoresTable';
import { PlayersSetUp } from './playersSetUp';
import { WeaponSelection } from './weaponSelection';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      player1: { name: '', weapon: '', victories: 0 },
      player2: { name: '', weapon: '', victories: 0 },
      winner: '',
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

  hanldeSelectWeapon = (event, player) => {
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
    // const { gameConfiguration } = this.props;
    const gameConfiguration = [{ move: 'PAPER', kills: 'ROCK' }, { move: 'ROCK', kills: 'SCISSORS' }, { move: 'SCISSORS', kills: 'PAPER' }];

    const {
      player1: { name: p1Name, weapon: p1Weapon, victories: p1PrevVictories },
      player2: { name: p2Name, weapon: p2Weapon, victories: p2PrevVictories },
      roundsHistory,
    } = this.state;
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
        const {
          player1: { victories: p1CurrentVictories },
          player2: { victories: p2CurrentVictories },
        } = this.state;

        if (p1CurrentVictories >= 3 || p2CurrentVictories >= 3) {
          console.log('Termino el juego!');
        }
      },
    );
  };

  render() {
    const {
      canPlay, player1, player2, showSelectWeapon, showPlayersName, roundsHistory,
    } = this.state;
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
      hanldeSelectWeapon: this.hanldeSelectWeapon,
      canPlay: true,
      getRoundWinner: this.getRoundWinner,
    };

    return (
      <div className="game-canvas">
        {showPlayersName && <PlayersSetUp {...setUpProps} />}
        {showSelectWeapon && <WeaponSelection {...weaponSelectionProps} />}
        {showScores && <ScoresTable {...scoresTableProps} />}
      </div>
    );
  }
}

export default Game;
