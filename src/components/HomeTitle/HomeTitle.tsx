import React, { FC, PropsWithChildren } from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyle = makeStyles((theme: Theme) => {
  return {
    Title: {
      // fontFamily: "'Sansita Swashed', cursive",
      display: 'block',
      color: 'rgba(0,0,0,0.7)',
      padding: 30,
      backgroundColor: 'rgba(255,255,255,0.5)',
      backdropFilter: 'blur(5px)',
      boxShadow: '3px 3px 5px rgba(0,0,0,0.4)',
      textShadow: '3px 3px 5px rgba(0,0,0,0.4)',
      borderRadius: 2,
      margin: 5,
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.7rem',
        marginBottom: 65,
      },
    },
  };
});

export const HomeTitle: FC<PropsWithChildren<{}>> = ({ children }) => {
  const classes = useStyle();
  return (
    <Typography component="h5" variant="h5" className={classes.Title}>
      {children}
    </Typography>
  );
};
