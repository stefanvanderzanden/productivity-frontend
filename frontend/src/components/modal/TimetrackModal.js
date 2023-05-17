import React, {useContext, useState} from 'react';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import TimetrackForm from '../timetracks/TimetrackForm';
import ModalButtonComponent from './ModalButtonComponent';
import {ModalContext} from '../../providers/ModalProvider';
import {useAddTimeRegistrationMutation, useUpdateTimeRegistrationMutation} from "../../redux/timeRegistrationSlice";


const TimetrackModal = ({extraProps: {timeTrack}}) => {
    const { hideModal } = useContext(ModalContext);
    const [ addTimeRegistration ] = useAddTimeRegistrationMutation()
    const [ updateTimeRegistration ] = useUpdateTimeRegistrationMutation()

    const [formData, setFormData] = useState({
        date: timeTrack ? dayjs(timeTrack.start).format('DD-MM-YYYY') : dayjs().format('DD-MM-YYYY'),
        start: timeTrack ? dayjs(timeTrack.start).format('HH:mm') : dayjs().format('HH:mm'),
        end: timeTrack ? dayjs(timeTrack.end).format('HH:mm') : '',
        project_id: timeTrack ? timeTrack.project.code : '',
        description: timeTrack ? timeTrack.description : '',
        external_reference: timeTrack ? timeTrack.external_reference : '',
    })
    const handleFormChange = ({name, value}) => {
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
            description: formData.description,
            external_reference: formData.external_reference,
        }
        if (timeTrack) {
            updateTimeRegistration({id: timeTrack.id, data: finalData}).then(() => {
                hideModal('timetrack');
            })
        } else {
            addTimeRegistration(finalData).then(() => {
                hideModal('timetrack');
            })

        }

    }

    return (
        <Box>
            <TimetrackForm
                formData={formData}
                handleFormChange={handleFormChange}
            />
            <ModalButtonComponent
                onSubmit={handleSubmit}
                onCancel={() => hideModal('timetrack')}
            />
        </Box>)
}

export default TimetrackModal;