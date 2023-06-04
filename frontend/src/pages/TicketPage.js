import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import {useFetchTicketsQuery} from "../redux/ticketSlice";
import Grid from "@mui/material/Grid";
import Title from "../components/typography/common/Title";
import Paper from "@mui/material/Paper";
import TicketTable from "../components/tables/tickets/TicketTable";

const TicketPage = () => {
    const {data, isLoading} = useFetchTicketsQuery();

    if (isLoading) {
        return (
            <Box sx={{display: 'flex'}}>
                <CircularProgress/>
            </Box>
        )
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={12} lg={12}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: 240,
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        mb: 3,
                        pb: 1,
                        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                        alignItems: 'center'

                    }}>
                        <Box>
                            <Title>
                                Tickets
                            </Title>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'

                    }}>
                        <TicketTable
                            tickets={data}
                        />
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default TicketPage;