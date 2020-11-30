import {
    Box, Card, CardHeader, Divider, Grid, Link, List, ListItem, ListItemText, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
    maxW50: {
        maxWidth: '50%',
        width: '50%'
    }
}));

export default function DealerCard({ dealerDetails }) {
    const classes = useStyles();
    const {
        distributor_name,
        distributor_id,
        lastInteractionId,
        lastInteractionDate,
        lastOrderReference,
        distributor_rank,
        Joiningdate,
        email_id
    } = dealerDetails;
    return (
        <Card>
            <CardHeader title={(
                <Grid container justify="space-between">
                    <span>Dealer Details</span>
                    {' '}
                    <Link href="#">Create Issue</Link>
                </Grid>
            )}
            />
            <Divider />
            <List>
                <ListItem>
                    <ListItemText primary={(
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <Typography variant="h5" className={classes.maxW50}>Dealer ID</Typography>
                            <span>{distributor_id}</span>
                        </Box>
                    )}
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={(
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <Typography variant="h5" className={classes.maxW50}>Dealer Name</Typography>
                            <span>{distributor_name}</span>
                        </Box>
                    )}
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={(
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <Typography variant="h5" className={classes.maxW50}>Email Id</Typography>
                            <span>{email_id}</span>
                        </Box>
                    )}
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={(
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <Typography variant="h5" className={classes.maxW50}>Last Interaction ID</Typography>
                            <span>{lastInteractionId}</span>
                        </Box>
                    )}
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={(
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <Typography variant="h5" className={classes.maxW50}>Last Interaction Date</Typography>
                            <span>{lastInteractionDate}</span>
                        </Box>
                    )}
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={(
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <Typography variant="h5" className={classes.maxW50}>Last Order Reference</Typography>
                            <span>#{lastOrderReference}</span>
                        </Box>
                    )}
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={(
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <Typography variant="h5" className={classes.maxW50}>Rank</Typography>
                            <span>{distributor_rank}</span>
                        </Box>
                    )}
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={(
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <Typography variant="h5" className={classes.maxW50}>Membership Date</Typography>
                            <span>{Joiningdate}</span>
                        </Box>
                    )}
                    />
                </ListItem>
            </List>
        </Card>
    );
}
