import React, {useState} from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

import {useFetchProjectsQuery, useUpdateProjectMutation} from "../redux/projectSlice";
import Grid from "@mui/material/Grid";
import Title from "../components/typography/common/Title";
import Paper from "@mui/material/Paper";
import ProjectTable from "../components/tables/projects/ProjectTable";

const ProjectPage = () => {
    const {data, isLoading} = useFetchProjectsQuery();

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
                                Projects
                            </Title>
                        </Box>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between'

                    }}>
                        <ProjectTable
                            projects={data}
                        />
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default ProjectPage;