import React, {useContext} from 'react';
import ReactTable from '../ReactTable';
import {ModalContext} from '../../../providers/ModalProvider';

const SnippetTable = ({snippets, onRowSelect}) => {
    const {showModal} = useContext(ModalContext);

    const openModal = () => {
        showModal(
            'snippet',
            {
                header: `Nieuwe snippet toevoegen`,
                disableBackdropClick: true,
            }
        )
    }

    return (
        <>
            <ReactTable
                columns={
                    [
                        {
                            Header: 'Snippet',
                            accessor: 'name',
                        },
                        {
                            Header: 'Dialect',
                            accessor: 'language',
                        },
                        {
                            Header: 'Omschrijving',
                            accessor: 'description',
                        },
                    ]
                }
                data={snippets}
                onAdd={openModal}
                onRowSelect={onRowSelect}
            />
        </>
    );
}

export default SnippetTable;