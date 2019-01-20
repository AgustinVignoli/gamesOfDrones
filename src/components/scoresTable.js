import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'rgba(255,255,255,.3)',
    color: theme.palette.common.blue,
  },
  body: { fontSize: 14 },
}))(TableCell);

const styles = () => ({
  root: {
    width: '100%',
    marginTop: '50px',
    marginBottom: '50px',
    overflowX: 'auto',
  },
  table: { maxWidth: 700 },
  row: { '&:nth-of-type(odd)': { backgroundColor: 'rgba(255,255,255,.1)' } },
});

function ScoresTable({ classes, players = [], rounds = [] }) {
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell><h4>Player</h4></CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map(player => (
            <TableRow className={classes.row} key={`player-${Math.random()}`}>
              <CustomTableCell component="th" scope="row">
                {player.name}
              </CustomTableCell>
              {rounds.map(round => (
                <CustomTableCell align="right">{round.winner === player.name ? 'Win' : (round.winner === 'Tie' && 'Tie') || 'Loose'}</CustomTableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

ScoresTable.propTypes = {
  classes: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
  rounds: PropTypes.array.isRequired,
};

export default withStyles(styles)(ScoresTable);
