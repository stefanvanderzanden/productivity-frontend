import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import authReducer from './authSlice';
import { timeRegistrationsApi } from "./timeRegistrationSlice";
import { projectsApi } from "./projectSlice";
import { snippetsApi } from "./snippetSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [timeRegistrationsApi.reducerPath]: timeRegistrationsApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [snippetsApi.reducerPath]: snippetsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      timeRegistrationsApi.middleware,
      projectsApi.middleware,
      snippetsApi.middleware,
  )
})

setupListeners(store.dispatch);
