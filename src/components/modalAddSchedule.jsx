/* eslint-disable react/prop-types */
import { Divider, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useToast } from "@chakra-ui/react"
import { useCallback, useContext, useEffect, useState } from "react"
import PropTypes from 'prop-types';
import { schedule } from "../api";
import { AuthContext } from "../context/auth/authContext";
import ButtonPrimary from "./buttonPrimary";
import Select, { components } from 'react-select'

const options = [
    { value: 'monday', label: 'Senin' },
    { value: 'tuesday', label: 'Selasa' },
    { value: 'wednesday', label: 'Rabu' },
    { value: 'thursday', label: 'Kamis' },
    { value: 'friday', label: 'Jumat' }
]

const ModalAddSchedule = ({ isOpen, onClose, onAddedData, hideSelectDay, isEdit, initialValue, day }) => {
    const [inputTitle, setInputTitle] = useState('')
    const [inputDay, setInputDay] = useState(null)
    const [loadingInput, setLoadingInput] = useState(false)
    const toast = useToast()

    const { email } = useContext(AuthContext)

    const handleSubmit = useCallback(async () => {
        setLoadingInput(true)
        try {
            if (isEdit) {
                await schedule.patch(`/schedule?email=${email}&id=${initialValue?.id}`, {
                    title: inputTitle,
                    day: inputDay
                })
            } else {
                await schedule.post(`/schedule?email=${email}`, {
                    title: inputTitle,
                    day: inputDay
                })
            }
            onAddedData()
            toast({
                title: `Berhasil ${isEdit ? 'mengubah' : 'menambahkan'} jadwal`,
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right'
            })

        } catch (error) {
            toast({
                title: `Gagal ${isEdit ? 'mengubah' : 'menambahkan'} jadwal`,
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right'
            })
            throw new Error(error)
        } finally {
            onClose()
            setInputTitle('')
            setInputDay(day ?? null)
            setLoadingInput(false)
        }
    }, [isEdit, onAddedData, toast, email, initialValue?.id, inputTitle, inputDay, onClose, day])

    useEffect(() => {
        if (isEdit && initialValue) {
            setInputTitle(initialValue.title)
        }
        if (day) {
            setInputDay(day)
        }
        if(!isOpen) {
            setInputTitle('')
            setInputDay(day ?? null)
        }
    }, [day, initialValue, isEdit, isOpen])

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent mx={{ base: 5, md: 0 }} data-cy={day ? 'detail-form' : 'form-add'}>
                <ModalHeader data-cy="modal-add-title">Buat Jadwal Kuliah</ModalHeader>
                <ModalCloseButton data-cy="close-modal" />
                <Divider />
                <ModalBody>
                    <Stack gap={3}>
                        <>
                            <Text textTransform={'uppercase'} fontWeight='bold' fontSize={'sm'}>Mata Kuliah</Text>
                            <Input data-cy="form-matkul" _placeholder={{ color: '#A4A4A4' }} value={inputTitle} onChange={(e) => setInputTitle(e.target.value)} placeholder="Masukan mata kuliah" />
                        </>
                        <>
                            {!hideSelectDay && (
                                <>
                                    <Text textTransform={'uppercase'} fontWeight='bold' fontSize={'sm'}>Pilih Hari</Text>
                                    <Select components={{
                                        Control: ({ children, ...rest }) => (
                                            <components.Control {...rest}>
                                                <Flex data-cy={'form-day'}>
                                                    {children}
                                                </Flex>
                                            </components.Control>
                                        )
                                    }} options={options} onChange={(e) => setInputDay(e.value)} />
                                </>
                            )}
                        </>
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <ButtonPrimary isLoading={loadingInput} title={'Simpan'} isDisabled={inputTitle == '' || !inputDay} borderRadius={20} dataCy={'btn-submit'} onClick={handleSubmit} />
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

ModalAddSchedule.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    onAddedData: PropTypes.func,
    hideSelectDay: PropTypes.bool,
    isEdit: PropTypes.bool,
    day: PropTypes.string,
    initialValue: PropTypes.shape({
        title: PropTypes.string,
        day: PropTypes.string,
        id: PropTypes.number
    })
}

export default ModalAddSchedule