import React, { FC } from 'react';

import { ContactForm } from '../../components/ContactForm/ContactForm';
import { Title } from '../../components/Title/Title';
import { Content } from '../../components/Content/Content';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import { PageSvc } from '../../services/PageSvc';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles((theme) => {
  const textColor = '#000';
  return {
    Container: {
      justifyContent: 'center',
      alignContent: 'flex-start',
    },
    FormContainer: {},
    Address: {
      marginTop: 30,
      marginBottom: 40,
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: 'column',
      color: textColor,
      [theme.breakpoints.down('xs')]: {
        marginBottom: 10,
      },
    },
    Button: {
      width: 250,
      color: textColor,
      marginBottom: 10,
      fontStyle: 'normal',
    },
    LastButton: {
      marginBottom: 25,
    },
    Paragraph: {
      margin: 0,
      marginBottom: 5,
      fontStyle: 'normal',
    },
  };
});

export const Contact: FC = () => {
  const classes = useStyle();
  const contactData = PageSvc.getContactData();

  return (
    <Grid item container className={classes.Container}>
      <Grid item xs={12} justify="center" container>
        <Title title="Contact" />
      </Grid>
      <Content>
        <Grid container lg={4} sm={6} xs={11} item justify="center">
          <address className={classes.Address}>
            <Button
              startIcon={<CallOutlinedIcon />}
              href={`tel:${contactData.phones[0]}`}
              variant="outlined"
              className={classes.Button}
            >
              {contactData.phones[0]}
            </Button>
            <Button
              startIcon={<CallOutlinedIcon />}
              href={`tel:${contactData.phones[1]}`}
              variant="outlined"
              className={classes.Button}
            >
              {contactData.phones[1]}
            </Button>
            <Button
              startIcon={<EmailOutlinedIcon />}
              href={`mailto:${contactData.email}`}
              variant="outlined"
              className={`${classes.Button} ${classes.LastButton}`}
            >
              {contactData.email}
            </Button>
            <Typography paragraph className={classes.Paragraph}>
              {contactData.companyName}
            </Typography>
            <Typography paragraph className={classes.Paragraph}>
              {contactData.address.street}
            </Typography>
            <Typography paragraph className={classes.Paragraph}>
              {contactData.address.district}
            </Typography>
            <Typography
              paragraph
              className={classes.Paragraph}
            >{`${contactData.address.city} ${contactData.address.zip}`}</Typography>
          </address>
        </Grid>
        <Grid container item lg={3} sm={5} xs={11} className={classes.FormContainer}>
          <ContactForm />
        </Grid>
      </Content>
    </Grid>
  );
};
