import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Route, Link } from 'react-router-dom';

const ITEM_HEIGHT = 48;

class MainMenu extends React.Component {
  state = { anchorEl: null };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className="main-menu">
        <IconButton aria-label="More" aria-owns={open ? 'long-menu' : undefined} aria-haspopup="true" onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          <MenuItem key="game-link" onClick={this.handleClose}>
            <Route path="/gameHistory" exact>
              <Link to="/game">Game</Link>
            </Route>
          </MenuItem>
          <MenuItem key="history-link" onClick={this.handleClose}>
            <Route path="/gameHistory" exact>
              <Link to="/gameHistory">History</Link>
            </Route>
          </MenuItem>
          <MenuItem key="configuration-link" onClick={this.handleClose}>
            <Route path="/configuration" exact>
              <Link to="/configuration">Configuration</Link>
            </Route>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default MainMenu;
