import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../app/API';

// Define a service using a base URL and expected endpoints
export const ticketsApi = createApi({
    reducerPath: 'ticket',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['Ticket'],
    endpoints(build) {
        return {
            fetchTickets: build.query({
                query: () => ({
                    url: `v1/tickets/`,
                    method: 'get',
                }),
                providesTags: ['Ticket']
            }),
            fetchTicket: build.query({
               query: (id) => ({
                   url: `v1/tickets/${id}/`,
                   method: 'get',
               })
            }),
            addTicket: build.mutation({
                query: (data) => ({
                    url: `v1/tickets/`,
                    method: 'post',
                    data
                }),
                invalidatesTags: ['Ticket']
            }),
            updateTicket: build.mutation({
                query: ({id, data}) => {
                    return {
                        url: `v1/tickets/${id}/`,
                        method: 'patch',
                        data
                    }
                },
                invalidatesTags: ['Ticket']
            }),
            deleteTicket: build.mutation({
                query: (id) => ({
                    url: `v1/tickets/${id}/`,
                    method: 'delete',
                }),
                invalidatesTags: ['Ticket']
            }),
            fetchTicketTypes: build.query({
                query: () => ({
                    url: `v1/ticket-types/`,
                    method: 'get',
                }),
            }),
        }
    }
})

export const {
    useFetchTicketsQuery,
    useLazyFetchTicketQuery,
    useAddTicketMutation,
    useUpdateTicketMutation,
    useDeleteTicketMutation,
    useFetchTicketTypesQuery
} = ticketsApi