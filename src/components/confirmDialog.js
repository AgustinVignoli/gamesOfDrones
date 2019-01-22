import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

export default class ConfirmationDialog extends React.Component {
  handleConfirm = (confirm) => {
    const { onClose } = this.props;
    onClose(confirm);
  };

  render() {
    const { value, ...other } = this.props;

    return (
      <div className="confirmation-dialog">
        <Dialog disableBackdropClick disableEscapeKeyDown maxWidth="xs" aria-labelledby="confirmation-dialog-title" {...other}>
          <DialogTitle id="confirmation-dialog-title">Confirm</DialogTitle>
          <DialogContent>
            <h4>Do you want to remove this record?</h4>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleConfirm(false)} color="primary">
              No
            </Button>
            <Button onClick={() => this.handleConfirm(true)} color="primary">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ConfirmationDialog.propTypes = {
  value: PropTypes.string,
  onClose: PropTypes.func,
};
