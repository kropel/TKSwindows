import React from 'react';
import { useHistory } from 'react-router';

import { PageSvc } from '../../services/PageSvc';
import { Logo } from '../../Logo/Logo';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';

const themeCustom = {
  color: '#000',
  secondColor: '#666',
};
const useStyle = makeStyles((theme) => ({
  footer: {},
  Content: {
    backgroundColor: 'rgb(224,224,224)',
    background:
      'linear-gradient(180deg, rgba(224,224,224,1) 0%, rgba(255,255,255,1) 14%, rgba(255,255,255,1) 16%, rgba(249,249,249,1) 19%, rgba(226,226,226,1) 34%, rgba(214,214,214,1) 36%, rgba(230,230,230,1) 43%, rgba(235,235,235,1) 60%, rgba(240,240,240,1) 62%, rgba(236,236,236,1) 64%, rgba(176,176,176,1) 81%, rgba(139,139,139,1) 100%)',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',

    paddingTop: 45,
  },
  Button: {
    color: themeCustom.color,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    fontStyle: 'normal',
    justifyContent: 'flex-start',
    transition: '0.3s',
    paddingBottom: 5,
    marginBottom: 10,
    '& :first-child': {
      marginRight: 5,
    },
    '&:hover': {
      color: themeCustom.color,
    },
  },
  lastLink: {
    marginBottom: 20,
  },
  paragraph: {
    marginBottom: 3,
    fontStyle: 'normal',
  },
  address: {
    display: 'inline-flex',
    flexDirection: 'column',
    color: themeCustom.color,
    marginBottom: 20,
  },
  link: {
    marginRight: 5,
    justifyContent: 'flex-start',
  },
}));

export const Footer = () => {
  const classes = useStyle();
  const history = useHistory();
  const categoryLinks = PageSvc.getAllCategoryLinks();
  const contactData = PageSvc.getContactData();

  const listItems = categoryLinks.map((link, index) => (
    <Button
      onClick={() => {
        history.push('/' + link.url);
      }}
      className={classes.link}
      key={'nav-item-' + index}
    >
      {link.title}
    </Button>
  ));

  return (
    <Grid item container justify="center" alignItems="center" className={classes.footer}>
      <Grid sm={11} item container className={classes.Content} justify="center">
        <Hidden only="xs">
          <Grid lg={1} md={2} sm={2} item container direction="column">
            {listItems}
          </Grid>
        </Hidden>
        <Grid lg={3} md={4} sm={6} xs={8} item container justify="center">
          <address className={classes.address}>
            <Button variant="outlined" href={`tel:${contactData.phones[0]}`} className={classes.Button}>
              <CallOutlinedIcon />
              {` ${contactData.phones[0]}`}
            </Button>
            <Button variant="outlined" href={`tel:${contactData.phones[1]}`} className={classes.Button}>
              <CallOutlinedIcon />
              {` ${contactData.phones[1]}`}
            </Button>
            <Button
              variant="outlined"
              href={`mailto:${contactData.email}`}
              className={`${classes.Button} ${classes.lastLink}`}
            >
              <EmailOutlinedIcon />
              {contactData.email}
            </Button>
            <Typography paragraph className={classes.paragraph}>
              {contactData.companyName}
            </Typography>
            <Typography paragraph className={classes.paragraph}>
              {contactData.address.street}
            </Typography>
            <Typography paragraph className={classes.paragraph}>
              {contactData.address.district}
            </Typography>
            <Typography
              paragraph
              className={classes.paragraph}
            >{`${contactData.address.city} ${contactData.address.zip}`}</Typography>
          </address>
        </Grid>
        <Grid lg={2} md={3} sm={3} xs={6} item>
          <Logo width />
        </Grid>
      </Grid>
    </Grid>
  );
};
