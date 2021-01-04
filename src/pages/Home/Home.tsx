import React from 'react';

import { HomeTitle } from '../../components/HomeTitle/HomeTitle';
import heroBackground from '../../assets/photos/Home/hero.jpg';
import heroBackground_800 from '../../assets/photos/Home/hero_800.jpg';
import heroBackground_600 from '../../assets/photos/Home/hero_600.jpg';

import { makeStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyle = makeStyles((theme: Theme) => ({
  Hero: {
    width: '100%',
    height: 'calc(100vh - 64px)',
    overflow: 'hidden',
    backgroundImage: `url(${heroBackground})`,

    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto 100%',
    animation: '$heroBackGroundPosition 120s linear infinite',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      backgroundImage: `url(${heroBackground_800})`,
      height: 'calc(100vh - 56px)',
    },
    [theme.breakpoints.down('xs')]: {
      backgroundImage: `url(${heroBackground_600})`,
    },
  },
  '@keyframes heroBackGroundPosition': {
    '0%': {
      backgroundPosition: '0% 0%',
    },
    '50%': {
      backgroundPosition: '100% 0%',
    },
    '100%': {
      backgroundPosition: '0% 0%',
    },
  },
  Title: {},
}));

export const Home = () => {
  const classes = useStyle();
  return (
    <Box className={classes.Hero}>
      <Box className={classes.Title}>{/* <HomeTitle>TKS Windows & Doors</HomeTitle> */}</Box>
    </Box>
  );
};
