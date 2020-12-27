import React, { useState } from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import StarBorderIcon from '@material-ui/icons/StarBorder';

const RatingComponent = ({ label, name }) => {
  return (
    <>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend" style={{ marginLeft: '10px' }}>
          {label}
        </Typography>
        <Rating
          name={name}
          id="rating"
          precision={0.5}
          emptyIcon={<StarBorderIcon fontSize="inherit" />}
          style={{ marginLeft: '1%' }}
        />
      </Box>
    </>
  );
};

export default RatingComponent;
