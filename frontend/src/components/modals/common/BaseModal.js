import {styled, useTheme} from "@mui/material/styles";
import {Modal} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    bgcolor: 'background.paper',
    boxShadow: 24,
};


const ModalHeader = styled("h2")(({theme}) => ({
    textAlign: 'center',
    color: 'white',
    width: '100%'
}));

const BaseModal = ({open, closeModal, header, contentComponent: ContentComponent, extraProps}) => {
    console.log('EXTRA PROPS BASE: ', extraProps)
    const theme = useTheme();
    return (
        <Modal
            open={open}
            onClose={closeModal}
        >
            <Box sx={{...style}}>
                <Box sx={{
                    display: 'flex',
                    backgroundColor: theme.palette.primary.main,
                }}>
                    <ModalHeader>{header}</ModalHeader>
                </Box>
                <Box sx={{mt: 5, mr: 5, ml: 5}}>
                    <ContentComponent
                        extraProps={{...extraProps}}
                    />
                </Box>
            </Box>
        </Modal>
    )
}

export default BaseModal;