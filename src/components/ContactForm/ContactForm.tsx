import React, { FC, useState } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import Popover from '@material-ui/core/Popover';

import * as yup from 'yup';
import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles({
  Form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  Field: { margin: 10 },
  Buttons: { margin: 10, display: 'flex', justifyContent: 'space-around' },
  Popover: {
    backgroundColor: '#474747',
    padding: 20,
  },
});

const initialValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
};

type TInitialValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

interface IMessage {
  color: string;
  statusTest: string;
  icon: JSX.Element;
  text: string;
}
const initialMessage = {
  color: '',
  statusTest: '',
  icon: <></>,
  text: '',
};

const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const ContactForm: FC = () => {
  const classes = useStyle();
  const [popoverVisible, setPopoverVisible] = useState(false);
  const [message, setMessage] = useState({ ...initialMessage });

  const handleSubmit = async (
    values: TInitialValues,
    formikHelpers: FormikHelpers<{
      name: string;
      email: string;
      phone: string;
      message: string;
    }>
  ) => {
    const message: IMessage = { ...initialMessage };
    const { status } = await axios.post(`${process.env.REACT_APP_SEND_EMAIL}`, values);

    if (status === 200) {
      formikHelpers.resetForm();
      message.color = 'green';
      message.statusTest = 'Success';
      message.icon = <CheckCircleOutlineOutlinedIcon />;
      message.text = 'The message was sent.';
    } else {
      message.color = 'red';
      message.statusTest = 'Error';
      message.icon = <ErrorOutlineOutlinedIcon />;
      message.text = 'The message was not sent.';
    }

    setMessage({ ...message });
    setPopoverVisible(true);
  };

  const closePopoverHandler = () => {
    setPopoverVisible(false);
    setMessage({ ...initialMessage });
  };

  const MessageSchema = yup.object().shape({
    name: yup.string().required('Required'),
    email: yup.string().required('Required').email('Invalid email address.'),
    phone: yup.string().matches(rePhoneNumber, 'Phone number is not valid.'),
    message: yup.string().required('Required'),
  });

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={MessageSchema}
        initialValues={initialValues}
      >
        {({ resetForm, dirty, isSubmitting, isValid }) => {
          const disabled = isSubmitting || !(dirty && isValid);

          return (
            <Form className={classes.Form}>
              <Field
                component={TextField}
                type="text"
                name="name"
                label="* Name/Company"
                className={classes.Field}
              />
              <Field
                component={TextField}
                type="email"
                name="email"
                label="* Email"
                className={classes.Field}
              />
              <Field
                component={TextField}
                type="tel"
                name="phone"
                label="Phone"
                className={classes.Field}
              />
              <Field
                component={TextField}
                multiline
                type="text"
                name="message"
                label="* Message"
                rowsmin={3}
                className={classes.Field}
              />
              <Box className={classes.Buttons}>
                <Button
                  type="submit"
                  disabled={disabled}
                  variant="outlined"
                  color="primary"
                >
                  Send
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    resetForm();
                  }}
                  variant="outlined"
                  color="secondary"
                >
                  Reset
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
      <Popover
        onClose={closePopoverHandler}
        open={popoverVisible}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 0, left: 0 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <Box className={classes.Popover}>
          <Typography style={{ color: message.color }} component="h4">
            {message.icon}
            {` ${message.statusTest}`}
          </Typography>
          <Typography
            style={{ color: message.color }}
            paragraph
          >{`${message.text}`}</Typography>
        </Box>
      </Popover>
    </>
  );
};
