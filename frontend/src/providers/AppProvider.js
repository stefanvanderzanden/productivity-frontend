import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useAuth from "../hooks/useAuth";
import { fetchUser } from '../redux/authSlice';
import {Box, CircularProgress} from "@mui/material";

const AppProvider = ({children}) => {
    const dispatch = useDispatch();
    const { userStatus } = useAuth();

    useEffect(() => {
        if (userStatus === 'idle') {
            dispatch(fetchUser())
        }
    }, [dispatch, userStatus])

    if (userStatus === 'fetched') {
        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        )
    } else if (userStatus === 'loading' || userStatus === 'idle') {
        return (
            <Box>
                <CircularProgress />
            </Box>
        )
    }
}

export default AppProvider;