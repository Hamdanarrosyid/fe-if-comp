import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import PropTypes from 'prop-types';

export const ModalDelete = ({ isOpen, onClose, onDelete }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent mx={{ base: 5, md: 0 }} data-cy="modal-delete">
                <ModalHeader data-cy="modal-add-title">Apakah anda yakin menghapus?</ModalHeader>
                <ModalBody>

                </ModalBody>
                <ModalFooter>
                    <Button data-cy="modal-delete-cancel-button" colorScheme='gray' rounded='full' mr={3} onClick={onClose}>
                        Batal
                    </Button>
                    <Button data-cy="modal-delete-confirm-button" colorScheme='red' rounded='full' mr={3} onClick={onDelete}>
                        Hapus
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

ModalDelete.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    activity_group_id: PropTypes.number,
    onDelete: PropTypes.func
}

export default ModalDelete