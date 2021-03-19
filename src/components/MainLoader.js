import { useLoading, Audio } from '@agney/react-loading';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyle = makeStyles((dtheme) => ({
  root: {
    height: '100%',
    width: '100%',
    backgroundColor: 'blue',
    color: 'white'
  }
}));

export default function MainLoader() {
  const classes = useStyle();
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Audio width="100" height="100" />,
  });

  return (
    <Box
      {...containerProps}
      justifyContent="center"
      alignItems="center"
      display="flex"
      className={classes.root}
    >
      {indicatorEl}
    </Box>
  );
}
