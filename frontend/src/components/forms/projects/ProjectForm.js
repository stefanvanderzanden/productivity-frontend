import React from 'react';
import PropTypes from 'prop-types';
import {FormControl} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const ProjectForm = ({formData, errors, handleFormChange}) => {

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
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField
                                id='code'
                                name='code'
                                label='Code'
                                value={formData.code}
                                onChange={(event) => handleFormChange(event.target)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <TextField
                                id='name'
                                name='name'
                                label='Naam'
                                value={formData.name}
                                onChange={(event) => handleFormChange(event.target)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
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

ProjectForm.propTypes = {
    formData: PropTypes.object,
    errors: PropTypes.object,
    handleFormChange: PropTypes.func,
}

export default ProjectForm;