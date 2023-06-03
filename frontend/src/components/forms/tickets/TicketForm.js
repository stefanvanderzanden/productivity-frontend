import React from 'react';
import PropTypes from 'prop-types';
import {FormControl} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ApiSelect from '../ApiSelect';
import {useFetchTicketTypesQuery} from '../../../redux/ticketSlice';
import {useFetchProjectsQuery, useFetchSubProjectsQuery} from '../../../redux/projectSlice';

const TicketForm = ({formData, errors, handleFormChange}) => {
    return (
        <>
            <Box
                noValidate
                component='form'
                autoComplete='off'
            >
                <Grid
                    container
                    columnSpacing={{xs: 1, sm: 2, md: 3}}
                    rowSpacing={2}>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                id='title'
                                name='title'
                                label='Titel'
                                value={formData.title}
                                onChange={(event) => handleFormChange(event.target)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <ApiSelect
                            fetchQuery={useFetchTicketTypesQuery}
                            onChange={handleFormChange}
                            initialValue={formData.ticket_type_id}
                            label='Ticket type'
                            name='ticket_type_id'
                            valueProp='code'
                            displayProp='name'
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <TextField
                                id='story_points '
                                name='story_points'
                                label='Punten'
                                value={formData.story_points}
                                onChange={(event) => handleFormChange(event.target)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl fullWidth>
                            <TextField
                                id='external_id '
                                name='external_id'
                                label='Extern ID'
                                value={formData.external_id}
                                onChange={(event) => handleFormChange(event.target)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <ApiSelect
                            fetchQuery={useFetchSubProjectsQuery}
                            onChange={handleFormChange}
                            initialValue={formData.sub_project_id}
                            label='Sub-project'
                            name='sub_project_id'
                            valueProp='code'
                            displayProp='name'
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <FormControl fullWidth>
                            <TextField
                                id='description '
                                name='description'
                                label='Omschrijving'
                                value={formData.description}
                                onChange={(event) => handleFormChange(event.target)}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

TicketForm.propTypes = {
    formData: PropTypes.object,
    errors: PropTypes.object,
    handleFormChange: PropTypes.func,
}

export default TicketForm;