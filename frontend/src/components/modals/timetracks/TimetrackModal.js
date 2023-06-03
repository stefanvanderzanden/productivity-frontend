import React, {useContext, useState} from 'react';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import TimetrackForm from '../../forms/timetracks/TimetrackForm';
import ModalButtonComponent from '../common/ModalButtonComponent';
import {ModalContext} from '../../../providers/ModalProvider';
import {useAddTimeRegistrationMutation, useUpdateTimeRegistrationMutation} from "../../../redux/timeRegistrationSlice";


const TimetrackModal = ({extraProps: {timeTrack}}) => {
    const { hideModal } = useContext(ModalContext);
    const [ addTimeRegistration ] = useAddTimeRegistrationMutation();
    const [ updateTimeRegistration ] = useUpdateTimeRegistrationMutation();

    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({
        date: timeTrack ? dayjs(timeTrack.start).format('DD-MM-YYYY') : dayjs().format('DD-MM-YYYY'),
        start: timeTrack ? dayjs(timeTrack.start).format('HH:mm') : dayjs().format('HH:mm'),
        end: timeTrack ? dayjs(timeTrack.end).format('HH:mm') : '',
        sub_project_id: timeTrack && timeTrack.sub_project ? timeTrack.sub_project.code : '',
        ticket_id: timeTrack && timeTrack.ticket ? timeTrack.ticket.id : '',
        description: timeTrack ? timeTrack.description : '',
        external_reference: timeTrack ? timeTrack.external_reference : '',
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
        const startDateTime = `${formData.date} ${formData.start}`;
        let endDateTime = null;
        if (formData.end) {
            endDateTime = `${formData.date} ${formData.end}`;
        }

        const finalData = {
            start: startDateTime,
            end: endDateTime,
            project_id: formData.project_id,
            sub_project_id: formData.sub_project_id,
            description: formData.description,
            external_reference: formData.external_reference,
        }
        if (timeTrack) {
            updateTimeRegistration({id: timeTrack.id, data: finalData}).then(() => {
                hideModal('timetrack');
            })
        } else {
            addTimeRegistration(finalData).unwrap().then((payload) => {
                hideModal('timetrack');
            }).catch((error) => {
                if (error && error.data) {
                    setErrors({...error.data})
                }
            })

        }

    }

    return (
        <Box>
            <TimetrackForm
                formData={formData}
                errors={errors}
                handleFormChange={handleFormChange}
            />
            <ModalButtonComponent
                onSubmit={handleSubmit}
                onCancel={() => hideModal('timetrack')}
            />
        </Box>)
}

export default TimetrackModal;