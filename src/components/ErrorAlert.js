import { Alert } from '@material-ui/lab';
import React from 'react';

export default function ErrorAlert({ variant, text }) {
  return (
    <Alert severity={variant || 'error'}>
      {text || 'Something went wrong! Please try again'}
    </Alert>
  );
}
