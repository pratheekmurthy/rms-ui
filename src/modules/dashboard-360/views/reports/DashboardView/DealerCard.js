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

export default function DealerCard() {
    const classes = useStyles();
    const {
        name,
        dealerId,
        membershipId,
        lastInteractionId,
        lastInteractionDate,
        lastOrderReference,
        rank,
        membershipDate
    } = {
        name: 'Dealer 1',
        dealerId: 'DL1234',
        membershipId: 'MB56923',
        lastInteractionId: 'N/A',
        lastInteractionDate: 'N/A',
        lastOrderReference: 'N/A',
        rank: 'N/A',
        membershipDate: '23rd October 2020'
    };
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
                                <span>{dealerId}</span>
                            </Box>
                          )}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary={(
                            <Box display="flex" flexDirection="row" alignItems="center">
                                <Typography variant="h5" className={classes.maxW50}>Dealer Name</Typography>
                                <span>{name}</span>
                            </Box>
                          )}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary={(
                            <Box display="flex" flexDirection="row" alignItems="center">
                                <Typography variant="h5" className={classes.maxW50}>Membership ID</Typography>
                                <span>{membershipId}</span>
                            </Box>
                          )}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary={(
                            <Box display="flex" flexDirection="row" alignItems="center">
                                <Typography variant="h5" className={classes.maxW50}>Membership Date</Typography>
                                <span>{membershipDate}</span>
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
                                <Typography variant="h5" className={classes.maxW50}>Dealer ID</Typography>
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
                                <span>{lastOrderReference}</span>
                            </Box>
                          )}
                        />
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary={(
                            <Box display="flex" flexDirection="row" alignItems="center">
                                <Typography variant="h5" className={classes.maxW50}>Rank</Typography>
                                <span>{rank}</span>
                            </Box>
                          )}
                        />
                    </ListItem>
                </List>
        </Card>
    );
}
