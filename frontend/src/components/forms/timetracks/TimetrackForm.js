import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import {FormControl} from '@mui/material';
import Box from '@mui/material/Box';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import ApiSelect from '../ApiSelect';
import {useFetchProjectsQuery, useFetchSubProjectsQuery} from '../../../redux/projectSlice';
import {useFetchTicketsQuery} from "../../../redux/ticketSlice";


const TimetrackForm = ({formData, errors, handleFormChange}) => {
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
                        <FormControl fullWidth variant='standard'>
                            <DatePicker
                                id='date'
                                name='date'
                                label='Datum'
                                value={dayjs(formData.date, 'DD-MM-YYYY')}
                                defaultValue={dayjs(formData.date, 'DD-MM-YYYY')}
                                format={'DD-MM-YYYY'}
                                onChange={(newValue) => handleFormChange(
                                    {name: 'date', value: newValue.format('DD-MM-YYYY')}
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth variant='standard'>
                            <TimePicker
                                ampm={false}
                                label='Starttijd'
                                value={dayjs(formData.start, 'HH:mm')}
                                defaultValue={dayjs(formData.start, 'HH:mm')}
                                onChange={(newValue) => handleFormChange(
                                    {name: 'start', value: newValue.format('HH:mm')}
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TimePicker
                                ampm={false}
                                label='Eindtijd'
                                value={formData.end ? dayjs(formData.end, 'HH:mm') : null}
                                onChange={(newValue) => handleFormChange(
                                    {name: 'end', value: newValue.format('HH:mm')}
                                )}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid
                    sx={{mt: 1}}
                    container
                    columnSpacing={{xs: 1, sm: 2, md: 3}}
                    rowSpacing={2}>
                    <Grid item xs={3}>
                        <ApiSelect
                            fetchQuery={useFetchSubProjectsQuery}
                            onChange={handleFormChange}
                            initialValue={formData.sub_project_id}
                            label='Sub-Project'
                            name='sub_project_id'
                            valueProp='code'
                            displayProp='name'
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <ApiSelect
                            fetchQuery={useFetchTicketsQuery}
                            onChange={handleFormChange}
                            initialValue={formData.ticket_id}
                            label='Ticket'
                            name='ticket_id'
                            valueProp='id'
                            displayProp={(option) => `${option.external_id}: ${option.title}`}
                            customIsOptionEqualToValue={(option, value) => option.id === value.id}
                        />
                    </Grid>
                    <Grid item xs={5}>
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

TimetrackForm.propTypes = {
    formData: PropTypes.object,
    errors: PropTypes.object,
    handleFormChange: PropTypes.func,
}

export default TimetrackForm;