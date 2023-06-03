
import React, {useContext} from 'react';
import ReactTable from '../ReactTable';
import {ModalContext} from '../../../providers/ModalProvider';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDeleteTicketMutation, useLazyFetchTicketQuery} from "../../../redux/ticketSlice";

const TicketTable = ({tickets}) => {
    const {showModal} = useContext(ModalContext);
    const [deleteTicket] = useDeleteTicketMutation();
    const [trigger] = useLazyFetchTicketQuery()

    console.log('DATA TICKETS: ', tickets)

    const openModal = (id) => {
        if (id) {
            trigger(id).then((result) => {
                showModal(
                    'ticket',
                    {
                        header: id ? `Ticket bewerken` : 'Nieuw ticket toevoegen',
                        disableBackdropClick: true,
                        extraProps: {
                            ticket: result.data,
                        }
                    }
                )

            });
        } else {
            showModal(
                'ticket',
                {
                    header: id ? `Ticket bewerken` : 'Nieuw ticket toevoegen',
                    disableBackdropClick: true,
                }
            )
        }
    }

    return (
        <>
            <ReactTable
                columns={
                    [
                        {
                            Header: 'Extern ID',
                            accessor: 'external_id',
                        },
                            {
                            Header: 'Titel',
                            accessor: 'title',
                        },
                        {
                            Header: 'Hoofdproject',
                            accessor: 'sub_project.project.name',
                        },
                        {
                            Header: 'Project',
                            accessor: 'sub_project.name',
                        },
                        {
                            Header: 'Type',
                            accessor: 'ticket_type.name',
                        },
                        {
                            Header: 'Punten',
                            accessor: 'story_points',
                        },
                        {
                            Header: 'Acties',
                            accessor: 'id',
                            Cell: ({value}) => (
                                <>
                                    <IconButton
                                        size='smalll'
                                        onClick={() => openModal(value)}
                                    >
                                        <EditIcon fontSize='inherit'/>
                                    </IconButton>
                                    <IconButton
                                        size='smalll'
                                        onClick={() => deleteTicket(value)}
                                    >
                                        <DeleteIcon fontSize='inherit'/>
                                    </IconButton>
                                </>),
                            style: {textAlign: 'right'}
                        }

                    ]
                }
                data={tickets}
                onAdd={openModal}
            />
        </>
    );
}

export default TicketTable;