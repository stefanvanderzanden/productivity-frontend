import React, {useContext, useState} from 'react';

import Box from '@mui/material/Box';
import ModalButtonComponent from '../common/ModalButtonComponent';
import {ModalContext} from '../../../providers/ModalProvider';
import {useAddTicketMutation, useUpdateTicketMutation} from "../../../redux/ticketSlice";
import TicketForm from "../../forms/tickets/TicketForm";


const TicketModal = ({extraProps: {ticket}}) => {
    const { hideModal } = useContext(ModalContext);
    const [ addTicket ] = useAddTicketMutation();
    const [ updateTicket ] = useUpdateTicketMutation();
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        title: ticket ? ticket.title : '',
        description: ticket ? ticket.description : '',
        ticket_type_id: ticket && ticket.ticket_type ? ticket.ticket_type.code : '',
        sub_project_id: ticket && ticket.sub_project ? ticket.sub_project.code: '',
        story_points: ticket ? ticket.story_points : '',
        external_id: ticket ? ticket.external_id : '',
    })

    const handleFormChange = ({name, value}) => {
        setErrors({})
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = () => {
        // First we need to format the date and start/end time into one value
        if (ticket) {
            updateTicket({id: ticket.id, data: formData}).then(() => {
                hideModal('ticket');
            })
        } else {
            addTicket(formData).unwrap().then((payload) => {
                hideModal('ticket');
            }).catch((error) => {
                if (error && error.data) {
                    setErrors({...error.data})
                }
            })
        }
    }

    return (
        <Box>
            <TicketForm
                formData={formData}
                errors={errors}
                handleFormChange={handleFormChange}
            />
            <ModalButtonComponent
                onSubmit={handleSubmit}
                onCancel={() => hideModal('ticket')}
            />
        </Box>)
}

export default TicketModal;