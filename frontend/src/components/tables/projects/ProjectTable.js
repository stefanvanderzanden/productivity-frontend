import React, {useContext} from 'react';
import ReactTable from '../ReactTable';
import {ModalContext} from '../../../providers/ModalProvider';
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDeleteProjectMutation, useLazyFetchProjectQuery} from "../../../redux/projectSlice";

const ProjectTable = ({projects}) => {
    const {showModal} = useContext(ModalContext);
    const [deleteProject, {isLoading: isDeleting}] = useDeleteProjectMutation();
    const [trigger, result, lastPromiseInfo] = useLazyFetchProjectQuery()


    const openModal = (id) => {
        if (id) {
            trigger(id).then((result) => {
                showModal(
                    'project',
                    {
                        header: id ? `Project bewerken` : 'Nieuw project toevoegen',
                        disableBackdropClick: true,
                        extraProps: {
                            project: result.data,
                        }
                    }
                )

            });
        } else {
            showModal(
                'project',
                {
                    header: id ? `Project bewerken` : 'Nieuw project toevoegen',
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
                            Header: 'Project',
                            accessor: 'name',
                        },
                        {
                            Header: 'Code',
                            accessor: 'code',
                            id: 'code'
                        },
                        {
                            Header: 'Description',
                            accessor: 'description',
                        },
                        {
                            Header: 'Acties',
                            accessor: 'code', // Need the id for the value
                            id: 'action',
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
                                        onClick={() => deleteProject(value)}
                                    >
                                        <DeleteIcon fontSize='inherit'/>
                                    </IconButton>
                                </>),
                            style: {textAlign: 'right'}
                        }

                    ]
                }
                data={projects}
                onAdd={openModal}
            />
        </>
    );
}

export default ProjectTable;
