import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 15
  },
  textBold: {
    fontWeight: '600'
  }
}));

export default function CreateTicket() {
  return <div>Create Ticket</div>;
}
