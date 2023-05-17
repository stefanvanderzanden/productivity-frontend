import {styled} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ForumIcon from '@mui/icons-material/Forum';
import CodeIcon from '@mui/icons-material/Code';
import AlarmIcon from '@mui/icons-material/Alarm';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import NavigationItem from './NavigationItem';
import {drawerWidth} from '../../app/theme';

const StyledDrawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const menuItems = [
    {
        label: 'Dashboard',
        icon: <DashboardIcon />,
        href: '/'
    },
    {
        label: 'Projects',
        icon: <AccountTreeIcon />,
        href: '/projects'
    },
    {
        label: 'Tickets',
        icon: <AppRegistrationIcon />,
        href: '/tickets'

    },
    {
        label: 'Timeregistrations',
        icon: <AlarmIcon />,
        href: '/time-registrations'
    },
    {
        label: 'Snippets',
        icon: <CodeIcon />,
        href: '/snippets'
    },
    {
        label: 'Notities',
        icon: <ForumIcon />,
        href: '/notes'
    }
]

const Drawer = ({open, toggleDrawer}) => {
    return (
        <StyledDrawer variant='permanent' open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1],
                }}
            >
                <span style={{fontWeight: 'bold', textAlign: 'left', width: '100%', marginLeft: '10px'}}>Worktools</span>
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon/>
                </IconButton>
            </Toolbar>
            <Divider/>
            <List component='nav'>
                {menuItems.map((menuItem) => {
                    return (
                        <NavigationItem
                            key={menuItem.label}
                            href={menuItem.href}
                            icon={menuItem.icon}
                            label={menuItem.label}
                        />)
                })}
                <Divider sx={{my: 1}}/>
            </List>
        </StyledDrawer>
    )
}


export default Drawer;
