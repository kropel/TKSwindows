import React from 'react';
import { Switch, Route } from 'react-router';
import bgPng from '../../assets/background/bg.png';
import bgPng1 from '../../assets/background/bg1.png';
import bgPng2 from '../../assets/background/bg2.png';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Header } from '../Header/Header';
import { Home } from '../../pages/Home/Home';
import { Footer } from '../Footer/Footer';
import { Gallery } from '../../pages/Gallery/Gallery';
import { Page } from '../../pages/Page/Page';
import { SubPage } from '../../pages/SubPage/SubPage';
import { Contact } from '../../pages/Contact/Contact';

const useStyles = makeStyles((theme) => {
  return {
    page: { minHeight: '100vh' },
    Content: {
      flex: 1,
      marginTop: 105,
      [theme.breakpoints.down('sm')]: { marginTop: 56 },
    },
    footer: {},
    body: {
      backgroundColor: 'rgb(223,223,223)',
      backgroundImage: `
      linear-gradient(45deg, rgba(223,223,223,1) 0%, rgba(230,230,230,1) 26%, rgba(255,255,255,1) 43%, rgba(214,214,214,1) 53%, rgba(236,235,235,1) 71%, rgba(175,175,175,1) 100%)`,
      backgroundRepeat: 'repeat',
      backgroundSize: '250%',
      animation: '$bgAnimation 120s linear infinite',
    },
    '@keyframes bgAnimation': {
      '0%': {
        backgroundPosition: '0% 0%',
      },
      '25%': {
        backgroundPosition: '50% 50%',
      },
      '50%': {
        backgroundPosition: '100% 100%',
      },
      '75%': {
        backgroundPosition: '50% 50%',
      },
      '100%': {
        backgroundPosition: '0% 0%',
      },
    },
  };
});

export const Layout = () => {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <Grid container direction="column" className={classes.page} justify="flex-start">
        <Grid container item>
          <Header />
        </Grid>
        <Grid container item className={classes.Content}>
          <Switch>
            <Route path={['', '/']} exact component={Home} />
            <Route path="/gallery" exact component={Gallery} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/:category" exact component={Page} />
            <Route path="/:category/:subPage" exact component={SubPage} />
          </Switch>
        </Grid>
        <Grid container item className={classes.footer}>
          <Footer />
        </Grid>
      </Grid>
    </div>
  );
};
