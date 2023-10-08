import { Button, Divider, Input, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useToast } from "@chakra-ui/react"
import { useCallback, useState } from "react"
import priorityListItem from "../utils/priorityTodoList";
import PropTypes from 'prop-types';
import { ChevronDownIcon } from "@chakra-ui/icons";
import PriorityIcon from "./priorityIcon";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import priorityTodoList from "../utils/priorityTodoList";

const ModalAdd = ({ isOpen, onClose, activity_group_id, onAddedData }) => {
    const [inputName, setInputName] = useState('')
    const [inputPriority, setInputPriority] = useState(null)
    const toast = useToast()

    const handleSubmit = useCallback(async () => {
        try {
            await axios.post(`${BASE_URL}/todo-items`, {
                title: inputName,
                activity_group_id: activity_group_id,
                priority: inputPriority == priorityTodoList.MEDIUM ? 'normal' : inputPriority.replace('_','-').toLowerCase()
            })
            onAddedData()
            toast({
                title: 'Berhasil menambahkan todo',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right'
            })
 
        } catch (error) {
            toast({
                title: 'Gagal menambahkan todo',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right'
            })
            throw new Error(error)
        } finally {
            onClose()
            setInputName('')
            setInputPriority(null)
        }
    }, [toast, activity_group_id, inputName, inputPriority, onClose, onAddedData])

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent mx={{ base: 5, md: 0 }} data-cy="modal-add">
                <ModalHeader data-cy="modal-add-title">Tambah List Item</ModalHeader>
                <ModalCloseButton />
                <Divider />
                <ModalBody>
                    <Stack gap={3}>
                        <>
                            <Text data-cy="modal-add-name-title" textTransform={'uppercase'} fontWeight='bold' fontSize={'sm'}>Nama List Item</Text>
                            <Input data-cy="modal-add-name-input" value={inputName} onChange={(e) => setInputName(e.target.value)} placeholder="Tambahkan nama list item" />
                        </>
                        <>
                            <Text data-cy="modal-add-priority-title" textTransform={'uppercase'} fontWeight='bold' fontSize={'sm'}>Priority</Text>
                            <Menu>
                                <MenuButton data-cy="modal-add-priority-dropdown" bgColor='transparent' borderWidth='1px' textTransform='capitalize' textAlign='left' as={Button} rightIcon={<ChevronDownIcon />} leftIcon={inputPriority ? <PriorityIcon priority={inputPriority}/> : null}>
                                    {inputPriority?.toLowerCase().replace('_', ' ') ?? "Pilih Priority"}
                                </MenuButton>
                                <MenuList>
                                    {
                                        Object.keys(priorityListItem).map(key => (
                                            <MenuItem data-cy={`modal-add-priority-${priorityListItem[key].toLowerCase().replace('_', '-')}`} textTransform='capitalize' icon={<PriorityIcon priority={key} />} value={priorityListItem[key]} key={key} onClick={(e) => setInputPriority(e.target.value)}>
                                                {priorityListItem[key].toLowerCase().replace('_', ' ')}
                                            </MenuItem>
                                        ))
                                    }
                                </MenuList>
                            </Menu>
                        </>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Button data-cy="modal-add-save-button" isDisabled={inputName=='' || !inputPriority} colorScheme='blue' rounded='full' mr={3} onClick={handleSubmit}>
                        Simpan
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

ModalAdd.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    activity_group_id: PropTypes.number,
    onAddedData: PropTypes.func
}

export default ModalAdd