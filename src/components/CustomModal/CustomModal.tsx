import React, { FC, PropsWithChildren } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme: Theme) => {
  const textShadow = `2px 2px 5px rgba(0,0,0,0.5)`;
  return {
    Modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    Content: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90%',
      width: '90%',
      overflow: 'hidden',
      position: 'relative',
    },
    Close: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 10,
      right: 25,
      color: 'white',
      fontSize: 50,
      cursor: 'pointer',

      textShadow: textShadow,
      transition: 'all 0.5s',
      '&:hover': {
        color: '#337ab7',
        transform: 'scale(1.1)',
      },
    },
  };
});

interface Props {
  visible: boolean;
  closeFunction: () => void;
}

export const CustomModal: FC<PropsWithChildren<Props>> = ({
  children,
  visible,
  closeFunction,
}) => {
  const classes = useStyles();

  const handleClose = () => {
    closeFunction();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.Modal}
      open={visible}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={visible}>
        <div className={classes.Content}>
          {children}
          <span className={classes.Close} onClick={handleClose}>
            x
          </span>
        </div>
      </Fade>
    </Modal>
  );
};
