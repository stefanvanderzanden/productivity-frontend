import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

import {useFetchSnippetsQuery} from "../redux/snippetSlice";


const SnippetPage = () => {
    const {data, isLoading} = useFetchSnippetsQuery();
    const [mode, setMode] = React.useState('python');

    const handleChange = (event) => {
        setMode(event.target.value);
    };

    if (isLoading) {
        return (
            <Box sx={{display: 'flex'}}>
                <CircularProgress/>
            </Box>
        )
    }

    return (
        <Box>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Mode</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={mode}
                    label="Mode"
                    onChange={handleChange}
                >
                    <MenuItem value='python'>Python</MenuItem>
                    <MenuItem value='sql'>SQL</MenuItem>
                    <MenuItem value='html'>HTML</MenuItem>
                </Select>
            </FormControl>
            <AceEditor
                mode={mode}
                theme='github'
                onChange={() => console.log('TESTING')}
                name='my-editor'
                highlightActiveLine
                setOptions={{
                    useWorker: false,
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 4,
                }}
                // editorProps={{$blockScrolling: true}}
            />,
        </Box>
    )
}

export default SnippetPage;