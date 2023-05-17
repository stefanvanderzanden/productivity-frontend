import React from 'react';
import { NavLink } from 'react-router-dom';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

const NavigationItem = ({href, icon: Icon, label}) => {

    return (
        <ListItemButton
            sx={{
                '&.active': {
                    color: '#005A97',
                    fontWeight: 'bold',
                    '> .MuiListItemIcon-root': {
                        color: '#005A97',
                    }
                }
            }}
            component={NavLink}
            to={href}
        >
            <ListItemIcon>
                {Icon}
            </ListItemIcon>
            <ListItemText primary={label}/>
        </ListItemButton>
    )
}

export default NavigationItem;