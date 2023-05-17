import React from 'react';
import {useDispatch} from "react-redux";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {Navigate} from "react-router-dom";
import {Alert} from "@mui/material";

import useAuth from "../hooks/useAuth";
import { login } from "../redux/authSlice";

const LoginView = () => {
    const dispatch = useDispatch();
    const {authenticationError, isAuthenticated} = useAuth()

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        dispatch(login(data));
    };

    if (isAuthenticated) {
        return (
            <Navigate to='/'/>
        )
    }

    return (
        <Grid
            container
            component="main"
            sx={{height: '100vh'}}
        >
            <Grid
                item
                xs={false}
                sm={7}
                md={9}
                sx={{
                    backgroundImage: `url('/login-background.jpg')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid
                item
                xs={12}
                sm={5}
                md={3}
                component={Paper}
                elevation={6}
                square>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Inloggen
                    </Typography>
                    {authenticationError && (
                        <Alert severity="error">{authenticationError}</Alert>
                    )}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="E-mailadres"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Wachtwoord"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Inloggen
                        </Button>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
}

export default LoginView;