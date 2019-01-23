import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { find, findIndex, filter } from 'lodash';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import { saveNewConfig, loadPrevConfig } from '../actions/gameActions';

class Configuration extends Component {
  constructor(props) {
    super(props);

    const { savedConfig } = this.props;
    this.manuallySavedConfig = false;
    this.state = { savedConfig, showConfigSavedMessage: false };
  }

  componentDidMount() {
    const { onLoadConfig } = this.props;
    onLoadConfig();
  }

  componentDidUpdate(prevProps) {
    const { savedConfig: prevConfig } = prevProps;
    const { savedConfig } = this.props;

    if (prevConfig !== savedConfig) {
      let newState = { savedConfig };
      if (this.manuallySavedConfig) {
        this.manuallySavedConfig = false;
        newState = { ...newState, showConfigSavedMessage: true };
      }
      this.setState(newState);
    }
  }

  addNewSet = () => {
    this.setState(({ savedConfig }) => {
      if (savedConfig.length <= 10) {
        return { savedConfig: [...savedConfig, { move: '', kills: '' }] };
      }
    });
  };

  handleEditSet = (event, index, type) => {
    const { target: { value } } = event;
    this.setState(({ savedConfig }) => {
      let currentConfigSet = find(savedConfig, (set, setIndex) => setIndex === index);
      const currentConfigSetIndex = findIndex(savedConfig, (set, setIndex) => setIndex === index);
      const editedSet = type === 'move' ? { ...currentConfigSet, move: value } : { ...currentConfigSet, kills: value };
      let newConfigSet = [...savedConfig];
      newConfigSet[currentConfigSetIndex] = editedSet;
      return { savedConfig: newConfigSet };
    });
  };

  saveNewConfig = () => {
    this.manuallySavedConfig = true;
    const { savedConfig } = this.state;
    const { onSaveConfig } = this.props;
    const configList = filter(savedConfig, ({ move, kills }) => move !== '' && kills !== '');
    onSaveConfig({ moves: configList });
  };

  handleClose = () => {
    this.setState({ showConfigSavedMessage: false });
  };

  handleDeleteSet = (index) => {
    this.setState(({ savedConfig }) => {
      const reducedConfigList = filter(savedConfig, (set, setIndex) => setIndex !== index);
      if (reducedConfigList.length > 2) {
        return { savedConfig: reducedConfigList };
      }
    });
  };

  render() {
    const { savedConfig, showConfigSavedMessage } = this.state;
    const { isLoaded } = this.props;

    return (
      <div className="configuration-edit">
        <h3 className="row">Edit your configuration:</h3>
        {savedConfig.map(({ move, kills }, index) => (
          <div className="set-of-movement row" key={index}>
            <div className="col-40">
              <TextField
                value={move}
                onChange={e => this.handleEditSet(e, index, 'move')}
                InputProps={{ startAdornment: <InputAdornment position="start">Move:</InputAdornment> }}
              />
            </div>
            <div className="col-40">
              <TextField
                value={kills}
                onChange={e => this.handleEditSet(e, index, 'kills')}
                InputProps={{ startAdornment: <InputAdornment position="start">Kills:</InputAdornment> }}
              />
            </div>
            <div className="col-20 delete-set">
              <IconButton aria-label="Delete" onClick={() => this.handleDeleteSet(index)}>
                <DeleteIcon />
              </IconButton>
            </div>
          </div>
        ))}
        <div className="menu">
          <Fab color="primary" size="medium" aria-label="Add" className="add-set" onClick={() => this.addNewSet()}>
            <AddIcon />
          </Fab>
          <Fab color="secondary" disabled={!isLoaded} size="medium" aria-label="Save" className="save-set" onClick={() => this.saveNewConfig()}>
            <SaveIcon />
          </Fab>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={showConfigSavedMessage}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{ 'aria-describedby': 'message-id' }}
          message={<span id="message-id">Configuration saved</span>}
          action={[
            <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
  }
}

Configuration.propTypes = {
  savedConfig: PropTypes.array.isRequired,
  onLoadConfig: PropTypes.func.isRequired,
  onSaveConfig: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool,
};

const mapStateToProps = (state) => {
  const { configurationReducer: { savedConfig, isLoaded, errors } } = state;
  return {
    savedConfig: savedConfig || [],
    isLoaded: isLoaded || false,
    errors,
  };
};

const mapDispatchToProps = dispatch => ({
  onSaveConfig(config) {
    dispatch(saveNewConfig(config));
  },
  onLoadConfig() {
    dispatch(loadPrevConfig());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Configuration);
