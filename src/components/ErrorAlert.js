import { Alert } from '@material-ui/lab';
import React from 'react';

export default function ErrorAlert({ variant, text, ...rest }) {
  return (
    <Alert severity={variant || 'error'} {...rest}>
      {text || 'Something went wrong! Please try again'}
    </Alert>
  );
}
