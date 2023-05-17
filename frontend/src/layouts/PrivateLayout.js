import * as React from 'react';
import {Route, Routes} from 'react-router-dom';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import AppBar from '../components/menus/AppBar';
import Drawer from '../components/menus/Drawer';
import TimetrackView from '../views/TimetrackView';
import DashboardView from '../views/DashboardView';
import SnippetPage from "../views/SnippetPage";

const PrivateLayout = () => {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };


    return (
        <Box sx={{display: 'flex'}}>
            <AppBar open={open} toggleDrawer={toggleDrawer}/>
            <Drawer open={open} toggleDrawer={toggleDrawer}/>
            <Box
                component='main'
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar/>
                <Container maxWidth={false} sx={{mt: 4, mb: 4}}>
                    <Routes>
                        <Route element={<DashboardView />} path='/'/>
                        <Route element={<div>PROJECTS</div>} path='/projects'/>
                        <Route element={<div>TICKETS</div>} path='/tickets'/>
                        <Route element={<TimetrackView />} path='/time-registrations'/>
                        <Route element={<SnippetPage />} path='/snippets' />
                    </Routes>
                </Container>
            </Box>
        </Box>
    )
        ;
}

export default PrivateLayout;
