import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const ModalButtonComponent = ({onSubmit, onSubmitLabel, onCancel, onCancelLabel}) => {
    return (
        <Box
            sx={{mt: 5, ml: 5, mb: 3, float: 'right'}}
        >
                <Button
                    sx={{mr: 1}}
                    variant='contained'
                    color='secondary'
                    onClick={onCancel}
                >
                {onCancelLabel ? onCancelLabel : 'Annuleren'}
            </Button>
            <Button
                    variant='contained'
                    color='primary'
                    onClick={onSubmit}
                >
                {onSubmitLabel ? onSubmitLabel : 'Opslaan'}
                </Button>
        </Box>
    )
}

ModalButtonComponent.propTypes = {
    onSubmit: PropTypes.func,
    onSubmitLabel: PropTypes.string,
    onCancel: PropTypes.func,
    onCancelLabel: PropTypes.string,
}

export default ModalButtonComponent;
