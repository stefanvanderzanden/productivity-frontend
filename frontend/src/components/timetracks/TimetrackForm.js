import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import {FormControl} from '@mui/material';
import Box from '@mui/material/Box';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {TimePicker} from '@mui/x-date-pickers';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useFetchProjectsQuery} from '../../redux/projectSlice';
import ApiSelect from '../forms/ApiSelect';


const TimetrackForm = ({formData, handleFormChange}) => {

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
                    <Grid item xs={3}>
                        <FormControl variant='standard'>
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
                    <Grid item xs={3}>
                        <FormControl variant='standard'>
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
                    <Grid item xs={3}>
                        <FormControl>
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
                    <Grid item xs={3}>
                        <ApiSelect
                            onChange={handleFormChange}
                            initialValue={formData.project_id}
                            label='Project'
                            name='project_id'
                            valueProp='code'
                            displayProp='name'
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <FormControl fullWidth>
                            <TextField
                                id='description'
                                name='description'
                                label='Omschrijving'
                                value={formData.description}
                                onChange={(event) => handleFormChange(event.target)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth>
                            <TextField
                                id='external_reference'
                                name='external_reference'
                                label='Externe referentie'
                                value={formData.external_reference}
                                onChange={(event) => handleFormChange(event.target)}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
export default TimetrackForm;