import React from 'react';
import Grid from '@mui/material/Grid';
import {FormControl} from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AceEditor from 'react-ace';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const SnippetForm = ({formData, handleFormChange}) => {

    const handleSnippetChange = (v) => {
        handleFormChange({name: 'snippet', value: v})
    }

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
                    rowSpacing={2}
                >
                    <Grid item xs={4}>
                        <FormControl fullWidth variant='standard'>
                            <TextField
                                id='name'
                                name='name'
                                label='Naam'
                                value={formData.name}
                                onChange={(event) => handleFormChange(event.target)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={4}>
                        <FormControl fullWidth variant='standard'>
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
                            <InputLabel id='language-label'>Dialect</InputLabel>
                            <Select
                                labelId='language-label'
                                id='language'
                                value={formData.language}
                                label='Dialect'
                                name='language'
                                onChange={(event) => handleFormChange(event.target)}
                            >
                                <MenuItem value='python'>Python</MenuItem>
                                <MenuItem value='sql'>SQL</MenuItem>
                                <MenuItem value='html'>HTML</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <AceEditor
                            style={{
                                width: '100%',
                                height: '200px'
                            }}
                            value={formData.snippet}
                            mode={formData.language}
                            theme='github'
                            onChange={(value) => handleSnippetChange(value)}
                            name='my-editor'
                            highlightActiveLine
                            setOptions={{
                                // Needed for html mode
                                useWorker: false,
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: formData.language === 'python' ? 4 : 2,
                            }}
                            // editorProps={{$blockScrolling: true}}
                        /> </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default SnippetForm;