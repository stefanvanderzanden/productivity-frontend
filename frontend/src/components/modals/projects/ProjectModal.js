import React, {useContext, useState} from 'react';
import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import TimetrackForm from '../../forms/timetracks/TimetrackForm';
import ModalButtonComponent from '../common/ModalButtonComponent';
import {ModalContext} from '../../../providers/ModalProvider';
import {useAddProjectMutation, useUpdateProjectMutation} from "../../../redux/projectSlice";
import ProjectForm from "../../forms/projects/ProjectForm";


const TimetrackModal = ({extraProps: {project}}) => {
    const { hideModal } = useContext(ModalContext);
    const [ addProject ] = useAddProjectMutation();
    const [ updateProject ] = useUpdateProjectMutation();

    const [errors, setErrors] = useState({})

    const [formData, setFormData] = useState({

        name: project ? project.name : '',
        code: project ? project.code : '',
        description: project ? project.description : '',
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
        if (project) {
            updateProject({id: project.code, data: formData}).then(() => {
                hideModal('project');
            })
        } else {
            addProject(formData).unwrap().then((payload) => {
                hideModal('project');
            }).catch((error) => {
                if (error && error.data) {
                    setErrors({...error.data})
                }
            })
        }
    }

    return (
        <Box>
            <ProjectForm
                formData={formData}
                errors={errors}
                handleFormChange={handleFormChange}
            />
            <ModalButtonComponent
                onSubmit={handleSubmit}
                onCancel={() => hideModal('project')}
            />
        </Box>)
}

export default TimetrackModal;