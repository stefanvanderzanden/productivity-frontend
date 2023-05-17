import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../app/API';

// Define a service using a base URL and expected endpoints
export const snippetsApi = createApi({
    reducerPath: 'snippets',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Snippet'],
    endpoints(build) {
        return {
            fetchSnippets: build.query({
                query: () => ({
                    url: `v1/snippets/`,
                    method: 'get',
                    data: {},
                }),
                providesTags: ['Snippet']
            }),
            // fetchTimeRegistration: build.query({
            //    query: (id) => ({
            //        url: `v1/time-registrations/${id}/`,
            //        method: 'get',
            //    })
            // }),
            addSnippetMutation: build.mutation({
                query: (data) => ({
                    url: `v1/snippets/`,
                    method: 'post',
                    data
                }),
                invalidatesTags: ['Snippet']
            }),
            // updateTimeRegistration: build.mutation({
            //     query: ({id, data}) => {
            //         return {
            //             url: `v1/time-registrations/${id}/`,
            //             method: 'patch',
            //             data
            //         }
            //     },
            //     invalidatesTags: ['TimeRegistration']
            // }),
            // deleteTimeRegistration: build.mutation({
            //     query: (id) => ({
            //         url: `v1/time-registrations/${id}/`,
            //         method: 'delete',
            //     }),
            //     invalidatesTags: ['TimeRegistration']
            // })
        }
    }
})

export const {
    useFetchSnippetsQuery,
    // useFetchTimeRegistrationsQuery,
    // useLazyFetchTimeRegistrationQuery,
    useAddSnippetMutation,
    // useUpdateTimeRegistrationMutation,
    // useDeleteTimeRegistrationMutation,
} = snippetsApi;

