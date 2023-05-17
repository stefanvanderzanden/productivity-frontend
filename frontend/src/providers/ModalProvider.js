import React, {createContext, useState} from 'react';

import {MODAL_TYPES} from "../components/modal/ModalTypes";
import BaseModal from "../components/modal/BaseModal";

const ModalContext = createContext(null);


const ModalProvider = ({children}) => {
    const [modalState, setModalState] = useState({
        openModals: []
    });

    const showModal = (modalName, modalProps) => {
        const modalData = {
            name: modalName,
            component: MODAL_TYPES[modalName],
            header: modalProps.header,
            disableBackdropClick: modalProps.disableBackdropClick,
            extraProps: modalProps.extraProps
        }
        const activeModals = modalState.openModals;
        activeModals.push(modalData)
        setModalState({
            ...modalState,
            openModals: activeModals
        });
    }

    const hideModal = (modalName, reason) => {
        const activeModals = modalState.openModals;
        const closingModal = activeModals.find((modal) => modal.name === modalName)
        const closingDisabled = (reason === 'backdropClick' && closingModal.disableBackdropClick)
        if (!closingDisabled) {
            setModalState({
                ...modalState,
                openModals: activeModals.filter((modal) => modal.name !== modalName)
            });
        }
    }

    return (
        <ModalContext.Provider
            value={{
                showModal,
                hideModal
            }}
        >
            {modalState.openModals.map((modal) => (
                <BaseModal
                    open
                    key={modal.name}
                    header={modal.header}
                    closeModal={(event, reason) => hideModal(modal.name, reason)}
                    contentComponent={modal.component}
                    extraProps={modal.extraProps}
                />
            ))}
            {children}
        </ModalContext.Provider>)

}

export {ModalContext, ModalProvider}
