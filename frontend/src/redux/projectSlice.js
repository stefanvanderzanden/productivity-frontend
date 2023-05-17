import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../app/API';

// Define a service using a base URL and expected endpoints
export const projectsApi = createApi({
    reducerPath: 'project',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Project'],
    endpoints(build) {
        return {
            fetchProjects: build.query({
                query: () => ({
                    url: `v1/projects/`,
                    method: 'get',
                    data: {},
                }),
                providesTags: ['Project']
            })
        }
    }
})

export const {
    useLazyFetchProjectsQuery,
    useFetchProjectsQuery
} = projectsApi