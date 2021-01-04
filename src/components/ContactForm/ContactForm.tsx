import React, { FC } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';
import Box from '@material-ui/core/Box';

const useStyle = makeStyles({
  Form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  Field: { margin: 10 },
  Buttons: { margin: 10, display: 'flex', justifyContent: 'space-around' },
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

const rePhoneNumber = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

export const ContactForm: FC = () => {
  const classes = useStyle();

  const handleSubmit = async (values: TInitialValues) => {
    console.log(values);
    const response = await axios.post(`${process.env.REACT_APP_SEND_EMAIL}`, values);
    console.log(response);
  };

  const MessageSchema = yup.object().shape({
    name: yup.string().required('Required'),
    email: yup.string().required('Required').email('Invalid email address.'),
    phone: yup.string().matches(rePhoneNumber, 'Phone number is not valid.'),
    message: yup.string().required('Required'),
  });

  return (
    <Formik onSubmit={handleSubmit} validationSchema={MessageSchema} initialValues={initialValues}>
      {({ resetForm, dirty, isSubmitting, isValid }) => {
        const disabled = isSubmitting || !(dirty && isValid);

        return (
          <Form className={classes.Form}>
            <Field component={TextField} type="text" name="name" label="* Name/Company" className={classes.Field} />
            <Field component={TextField} type="email" name="email" label="* Email" className={classes.Field} />
            <Field component={TextField} type="tel" name="phone" label="Phone" className={classes.Field} />
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
              <Button type="submit" disabled={disabled} variant="outlined" color="primary">
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
  );
};
