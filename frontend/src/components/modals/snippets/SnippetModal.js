import React, {useContext, useState} from 'react';

import Box from '@mui/material/Box';
import ModalButtonComponent from '../common/ModalButtonComponent';
import {ModalContext} from '../../../providers/ModalProvider';
import {useAddSnippetMutation} from "../../../redux/snippetSlice";
import SnippetForm from "../../forms/snippets/SnippetForm";


const SnippetModal = () => {
    const {hideModal} = useContext(ModalContext);
    const [addSnippet] = useAddSnippetMutation()

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        language: 'python',
        snippet: '',
    })

    const handleFormChange = ({name, value}) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = () => {
        addSnippet(formData).then(() => {
            hideModal('snippet');
        })
    }

    return (
        <Box>
            <SnippetForm
                formData={formData}
                handleFormChange={handleFormChange}
            />
            <ModalButtonComponent
                onSubmit={handleSubmit}
                onCancel={() => hideModal('snippet')}
            />
        </Box>)
}

export default SnippetModal;