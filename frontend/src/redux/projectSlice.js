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
            }),
            fetchProject: build.query({
               query: (id) => ({
                   url: `v1/projects/${id}/`,
                   method: 'get',
               })
            }),
            addProject: build.mutation({
                query: (data) => ({
                    url: `v1/projects/`,
                    method: 'post',
                    data
                }),
                invalidatesTags: ['Project']
            }),
            updateProject: build.mutation({
                query: ({id, data}) => {
                    return {
                        url: `v1/projects/${id}/`,
                        method: 'patch',
                        data
                    }
                },
                invalidatesTags: ['Project']
            }),
            deleteProject: build.mutation({
                query: (id) => ({
                    url: `v1/projects/${id}/`,
                    method: 'delete',
                }),
                invalidatesTags: ['Project']
            }),
            fetchSubProjects: build.query({
                query: () => ({
                    url: `v1/sub-projects/`,
                    method: 'get',
                }),
                providesTags: ['SubProject']
            })
        }
    }
})

export const {
    useFetchProjectsQuery,
    useLazyFetchProjectQuery,
    useAddProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
    useFetchSubProjectsQuery
} = projectsApi