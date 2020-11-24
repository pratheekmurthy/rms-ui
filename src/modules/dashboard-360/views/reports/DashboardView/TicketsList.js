import {
 Avatar, Box, Chip, Divider, Link, List, ListItem, ListItemAvatar, ListItemText, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    floatRight: {
      float: 'right'
    }
}));

export default function TicketsList() {
    const classes = useStyles();
    return (
    <List className={classes.root}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={(
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Link>#1234</Link>
                    <Box my={1}>
                        <Chip label="Escalated" color="secondary" />
                    </Box>
                </Box>
              )}
            secondary={(
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Profile -&gt; Profile Update
                </Typography>
                {' — I moved my business to new location, Please update my address'}
                <br />
                <Typography component="span" variant="subtitle2" className={classes.floatRight}>23/11/2020</Typography>
              </>
            )}
          />
        </ListItem>
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={(
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Link>#1234</Link>
                    <Box my={1}>
                        <Chip label="Escalated" color="secondary" />
                    </Box>
                </Box>
              )}
            secondary={(
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Profile -&gt; Profile Update
                </Typography>
                {' — I moved my business to new location, Please update my address'}
                <br />
                <Typography component="span" variant="subtitle2" className={classes.floatRight}>23/11/2020</Typography>
              </>
            )}
          />
        </ListItem>
        <Divider component="li" />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary={(
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Link>#1234</Link>
                    <Box my={1}>
                        <Chip label="Escalated" color="secondary" />
                    </Box>
                </Box>
              )}
            secondary={(
              <>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  Profile -&gt; Profile Update
                </Typography>
                {' — I moved my business to new location, Please update my address'}
                <br />
                <Typography component="span" variant="subtitle2" className={classes.floatRight}>23/11/2020</Typography>
              </>
            )}
          />
        </ListItem>
    </List>
    );
}
