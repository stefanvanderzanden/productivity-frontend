import React, {useState, useEffect} from 'react';
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

import {useFetchSnippetsQuery, useUpdateSnippetMutation} from "../redux/snippetSlice";
import Grid from "@mui/material/Grid";
import SnippetTable from "../components/tables/snippets/SnippetTable";
import Title from "../components/typography/common/Title";
import Paper from "@mui/material/Paper";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";

const StyledDetailDrawer = styled(Box, {shouldForwardProp: (prop) => prop !== 'visible'})(
    ({theme, visible}) => ({
        marginLeft: '25px',
        width: '0%',
        overflow: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        ...(visible && {
            width: '100%',
            display: 'flex',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.standard,
            }),
        })
    })
)

const SnippetPage = () => {
    const {data, isLoading} = useFetchSnippetsQuery();
    const [selectedSnippet, setSelectedSnippet] = useState(null);
    const [snippetData, setSnippetData] = useState('');
    const [ updateSnippet ] = useUpdateSnippetMutation()

    useEffect(() => {
        if (selectedSnippet) {
            setSnippetData(selectedSnippet.snippet)
        }
    }, [selectedSnippet])

    const handleSubmit = () => {
        updateSnippet({id: selectedSnippet.id, data: {snippet: snippetData}})
    }

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
                                Snippets
                            </Title>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'

                    }}>
                        <SnippetTable
                            snippets={data}
                            onRowSelect={(row) => {
                                if (selectedSnippet && selectedSnippet === row) {
                                    setSelectedSnippet(null)
                                } else {
                                    setSelectedSnippet(row)
                                }
                            }}
                        />
                        <StyledDetailDrawer visible={selectedSnippet}>
                            <Box
                                sx={{display: 'flex', flexDirection: 'column', width: '100%'}}
                            >
                                <Box sx={{display: 'flex', justifyContent: 'flex-end', flexDirection: 'row', mb: 1}}>
                                    <Button
                                        sx={{mr: 1}}
                                        variant='contained'
                                        color='primary'
                                        onClick={handleSubmit}
                                    >
                                        Opslaan
                                    </Button>
                                </Box>

                                <AceEditor
                                    style={{
                                        width: '100%'
                                    }}
                                    value={snippetData}
                                    mode={selectedSnippet && selectedSnippet.language}
                                    theme='github'
                                    onChange={(value) => setSnippetData(value) }
                                    name='my-editor'
                                    highlightActiveLine
                                    setOptions={{
                                        // Needed for html mode
                                        useWorker: false,
                                        enableBasicAutocompletion: true,
                                        enableLiveAutocompletion: true,
                                        enableSnippets: false,
                                        showLineNumbers: true,
                                        tabSize: selectedSnippet && selectedSnippet.language === 'python' ? 4 : 2,
                                    }}
                                    // editorProps={{$blockScrolling: true}}
                                />
                            </Box>

                        </StyledDetailDrawer>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default SnippetPage;