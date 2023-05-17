import React from 'react'
import {Provider} from 'react-redux'
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';

// import './App.css';

import {store} from './redux/store';
import theme from './app/theme';
import AuthenticatedView from './layouts/PrivateLayout';
import PrivateRoute from './components/PrivateRoute';
import LoginView from './views/LoginView';
import AppProvider from './providers/AppProvider';
import {ModalProvider} from './providers/ModalProvider';

import dayjs from 'dayjs';
import 'dayjs/locale/nl'
dayjs.locale('nl');
dayjs.extend(require('dayjs/plugin/isoWeek'))
dayjs.extend(require('dayjs/plugin/weekday'))
// dayjs.extend(require('dayjs/plugin/duration'))



const App = () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <AppProvider>
                        <BrowserRouter>
                            <ModalProvider>
                                <Routes>
                                    <Route
                                        path='/*'
                                        element={
                                            <PrivateRoute>
                                                <AuthenticatedView/>
                                            </PrivateRoute>
                                        }
                                    />
                                    <Route path='/login' element={<LoginView/>}/>
                                    <Route path='*' element={<Navigate to='/'/>}/>
                                </Routes>
                            </ModalProvider>
                        </BrowserRouter>
                    </AppProvider>
                </ThemeProvider>
            </Provider>
        </LocalizationProvider>
    );
}
export default App;
