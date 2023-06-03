import React from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

import Title from '../typography/common/Title';

const Card = ({title, children}) => {
    return (
        <Paper
            elevation={3}
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 240,
            }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 3,
                pb: 1,
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                alignItems: 'center'

            }}>
                <Box>
                    <Title>
                        {title}
                    </Title>
                </Box>
            </Box>
            <Box>
                <Box>
                    {children}
                </Box>
            </Box>
        </Paper>

    )
}

export default Card