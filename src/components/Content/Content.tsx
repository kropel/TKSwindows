import React, { FC, PropsWithChildren } from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyle = makeStyles((theme: Theme) => ({
  Content: {
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginTop: -15,
    marginBottom: -25,
    padding: 20,
    paddingBottom: 35,
    paddingTop: 35,
    justifyContent: 'center',
    zIndex: 100,
    minHeight: 'calc(100% - 75px)',
  },
}));

export const Content: FC<PropsWithChildren<{}>> = ({ children }) => {
  const classes = useStyle();

  return (
    <Grid sm={11} md={11} lg={11} xl={8} item container className={classes.Content}>
      {children}
    </Grid>
  );
};
