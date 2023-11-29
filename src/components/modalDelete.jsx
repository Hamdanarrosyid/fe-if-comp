import { Button, Flex, Img, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react"
import PropTypes from 'prop-types';
import trash from '../assets/images/trash.png'

export const ModalDelete = ({ isOpen, onClose, onDelete, isLoading, title }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered >
            <ModalOverlay />
            <ModalContent mx={{ base: 5, md: 0 }} data-cy="form-delete">
                <ModalHeader data-cy="modal-add-title">
                    <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
                        <Img src={trash} width={20} height={20} />
                        <Text>Hapus Mata Kuliah</Text>
                    </Flex>
                </ModalHeader>
                <ModalBody>
                    <Text textAlign={'center'}>Apakah anda yakin menghapus mata kuliah {title}?</Text>
                </ModalBody>
                <ModalFooter>
                    <Button data-cy="btn-close" colorScheme='gray' rounded='full' mr={3} onClick={onClose}>
                        Batal
                    </Button>
                    <Button isLoading={isLoading} data-cy="btn-submit" colorScheme='red' rounded='full' mr={3} onClick={onDelete}>
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
    onDelete: PropTypes.func,
    isLoading: PropTypes.bool,
    title: PropTypes.string
}

export default ModalDelete