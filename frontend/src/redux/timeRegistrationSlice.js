import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../app/API';

// Define a service using a base URL and expected endpoints
export const timeRegistrationsApi = createApi({
    reducerPath: 'timeRegistrations',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['TimeRegistration'],
    endpoints(build) {
        return {
            fetchTimeRegistrations: build.query({
                query: (startDate) => ({
                    url: `v1/time-registrations/`,
                    method: 'get',
                    data: {},
                    params: {
                        date: startDate
                    }
                }),
                providesTags: ['TimeRegistration']
            }),
            fetchTimeRegistration: build.query({
               query: (id) => ({
                   url: `v1/time-registrations/${id}/`,
                   method: 'get',
               })
            }),
            addTimeRegistration: build.mutation({
                query: (data) => ({
                    url: `v1/time-registrations/`,
                    method: 'post',
                    data
                }),
                invalidatesTags: ['TimeRegistration']
            }),
            updateTimeRegistration: build.mutation({
                query: ({id, data}) => {
                    return {
                        url: `v1/time-registrations/${id}/`,
                        method: 'patch',
                        data
                    }
                },
                invalidatesTags: ['TimeRegistration']
            }),
            deleteTimeRegistration: build.mutation({
                query: (id) => ({
                    url: `v1/time-registrations/${id}/`,
                    method: 'delete',
                }),
                invalidatesTags: ['TimeRegistration']
            })
        }
    }
})

export const {
    useFetchTimeRegistrationsQuery,
    useLazyFetchTimeRegistrationQuery,
    useAddTimeRegistrationMutation,
    useUpdateTimeRegistrationMutation,
    useDeleteTimeRegistrationMutation,
} = timeRegistrationsApi;

