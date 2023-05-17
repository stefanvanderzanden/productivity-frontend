import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import API from '../app/API';

const initialState = {
    userStatus: 'idle',
    loginStatus: 'idle',
    user: {},
    authenticationError: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.userStatus = 'loading'
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.userStatus = 'fetched'
                state.user = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                // state.status = action.payload.status === 500 ? 'failed' : 'succeeded'
                state.userStatus = 'fetched'
                state.error = action.payload
            })
            .addCase(login.pending, (state, action) => {
                state.loginStatus = 'pending'
                state.user = action.payload
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loginStatus = 'fetched'
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.loginStatus = 'fetched'
                state.authenticationError = action.payload.data
            })
            .addCase(logout.fulfilled, (state, action) => {
                return initialState;
            })
    }

})

export const {} = authSlice.actions;

export const fetchUser = createAsyncThunk('auth/fetchUser', async (_, { rejectWithValue }) => {
    try {
        const response = await API.get('/get-user/')
        return response.data;
    } catch(e) {
        return rejectWithValue({status: e.response.status, data: e.response.data})
    }
})

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
    try {
        const response = await API.post('/login/', data)
        return response.data
    } catch(e) {
        return rejectWithValue({status: e.response.status, data: e.response.data})
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    const response = await API.get('/logout/')
    return response.data
})

export default authSlice.reducer;