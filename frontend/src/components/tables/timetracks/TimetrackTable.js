import React, {useContext} from 'react';
import dayjs from 'dayjs';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useDeleteTimeRegistrationMutation, useLazyFetchTimeRegistrationQuery} from '../../../redux/timeRegistrationSlice';
import ReactTable from '../ReactTable';
import {ModalContext} from '../../../providers/ModalProvider';

const TimetrackTable = ({timeRegistrations}) => {
    const {showModal} = useContext(ModalContext);
    const [deleteTimeRegistration, {isLoading: isDeleting}] = useDeleteTimeRegistrationMutation();
    const [trigger, result, lastPromiseInfo] = useLazyFetchTimeRegistrationQuery()
    const openModal = (id) => {
        if (id) {
            trigger(id).then((result) => {
                showModal(
                    'timetrack',
                    {
                        header: id ? `Tijdregistratie bewerken` : 'Nieuwe tijdregistratie toevoegen',
                        disableBackdropClick: true,
                        extraProps: {
                            timeTrack: result.data,
                        }
                    }
                )

            });
        } else {
            showModal(
                'timetrack',
                {
                    header: id ? `Tijdregistratie bewerken` : 'Nieuwe tijdregistratie toevoegen',
                    disableBackdropClick: true,
                }
            )
        }
    }

    if (!timeRegistrations) {
        return <div>LOADING</div>
    }

    return (
        <>
            <ReactTable
                columns={
                    [
                        {
                            Header: 'Datum',
                            id: 'date',  // Need the ID because we can't use the accessor as id, as it would cause a duplicate
                            accessor: 'start',
                            Cell: ({value}) => (dayjs(value).format('DD-MM-YYYY'))
                        },
                        {
                            Header: 'Starttijd',
                            accessor: 'start',
                            Cell: ({value}) => (dayjs(value).format('HH:mm'))
                        },
                        {
                            Header: 'Eindtijd',
                            accessor: 'end',
                            Cell: ({value}) => (dayjs(value).format('HH:mm'))
                        },
                        {
                            Header: 'Duur',
                            accessor: 'duration',
                        },
                        {
                            Header: 'Hoofdproject',
                            Cell: ({row}) => {
                                let mainProjectValue;
                                if (row.original.ticket) {
                                     mainProjectValue = row.original.ticket.sub_project ? row.original.ticket.sub_project.project.name : 'MISSING TICKET';
                                } else {
                                    mainProjectValue = row.original.sub_project ? row.original.sub_project.project.name : 'MISSING SUBPROJECT';
                                }
                                return (<div>{mainProjectValue}</div>)
                            },                        },
                        {
                            Header: 'Project',
                            Cell: ({row}) => {
                                let projectValue;
                                if (row.original.ticket) {
                                     projectValue = row.original.ticket.sub_project ? row.original.ticket.sub_project.name : 'MISSING TICKET';
                                } else {
                                    projectValue = row.original.sub_project ? row.original.sub_project.name : 'MISSING SUBPROJECT';
                                }
                                return (<div>{projectValue}</div>)
                            },
                        },
                        {
                            Header: 'Omschrijving',
                            accessor: 'description',
                        },
                        {
                            Header: 'Acties',
                            accessor: 'id', // Need the id for the value
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
                                        onClick={() => deleteTimeRegistration(value)}
                                    >
                                        <DeleteIcon fontSize='inherit'/>
                                    </IconButton>
                                </>),
                            style: {textAlign: 'right'}
                        }

                    ]
                }
                data={timeRegistrations}
                onAdd={openModal}
            />
        </>
    );
}

export default TimetrackTable;