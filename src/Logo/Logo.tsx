import React, { FC } from 'react';

import image from '../assets/logo/logo6.png';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => {
  return {
    Title: {
      // fontFamily: "'MedievalSharp', cursive",
      fontFamily: "'Times New Roman', Times, serif",
      textShadow: '1px 2px 5px rgba(255,255,255,0.4)',
      fontSize: 40,
      [theme.breakpoints.down('xs')]: {
        fontSize: 20,
      },
    },
  };
});

interface dementias {
  width?: boolean;
  height?: boolean;
  text?: boolean;
}

export const Logo: FC<dementias> = (props) => {
  const classes = useStyle();

  const styles = ((props): { height: string; width: string } => {
    if (props.height) {
      return { height: '100%', width: 'auto' };
    } else {
      return { height: 'auto', width: '100%' };
    }
  })(props);

  const logo = props.text ? (
    <Typography variant="h3" component="h1" className={classes.Title}>
      {'TKS Windows&Doors'}
    </Typography>
  ) : (
    <img src={image} alt="TKS building company logo." style={styles} title="logo" />
  );
  return logo;
};
