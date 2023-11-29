import { Box, Center, Container, Flex, IconButton, Spacer, Spinner, useDisclosure, useToast, List, useColorModeValue, Text } from '@chakra-ui/react'
import Nav from '../components/navbar'
import { AddIcon, ChevronLeftIcon } from '@chakra-ui/icons'
import { useCallback, useContext, useEffect, useState } from 'react'
import heroImage from '../assets/images/todo-empty-state.png'
import { useNavigate, useParams } from 'react-router-dom'
import TodoListItem from '../components/todoListItem'
import ModalDelete from '../components/modalDelete'
import { schedule } from '../api'
import { AuthContext } from '../context/auth/authContext'
import { daysOfWeek } from '../utils/daysOfWeek'
import ButtonPrimary from '../components/buttonPrimary'
import ModalAddSchedule from '../components/modalAddSchedule'

function Activity() {
    const [dataState, setDataState] = useState(null)
    const { onOpen, isOpen, onClose } = useDisclosure()
    const { onOpen: onOpenDelete, isOpen: isOpenDelete, onClose: onCloseDelete } = useDisclosure()
    const navigate = useNavigate()
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [loadingDelete,setLoadingDelete] = useState(false)
    const toast = useToast()
    const [selectedData, setSelectedData] = useState(null)
    
    const { email } = useContext(AuthContext)

    const fetchData = useCallback(async () => {
        try {
            const { data } = await schedule.get(`/schedule?email=${email}&day=${id}`)
            setDataState(data.data)
        } catch (error) {
            toast({
                title: 'Gagal memuat data',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right'
            })
            throw new Error(error)
        } finally {
            setIsLoading(false)
        }
    }, [email, id, toast])


    const handleChangeData = useCallback(async () => {
        fetchData()
    }, [fetchData])

    const handleDeleteClick = (id) => {
        setSelectedData(id)
        onOpenDelete()
    }

    const handleDelete = useCallback(async (id) => {
        setLoadingDelete(true)
        try {
            await schedule.delete(`/schedule?email=${email}&id=${id}`)
            toast({
                title: 'Berhasil menghapus jadwal',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right'
            })
            fetchData()

        } catch (error) {
            toast({
                title: 'Gagal menghapus jadwal',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right'
            })
            throw new Error(error)
        } finally {
            setLoadingDelete(false)
            onCloseDelete()
        }

    }, [email, toast, fetchData, onCloseDelete])

    useEffect(() => {
        if (!dataState && isLoading && email) {
            fetchData()
        }
    }, [dataState, isLoading, fetchData, email])

    return (
        <>
            <Nav />
            <Box minH='100vh' as={'main'} bg={useColorModeValue('#F4F4F4', '#1a202c')}>
                <Container maxW={'6xl'} py={10}>
                    {
                        isLoading ? (
                            <Center>
                                <Spinner />
                            </Center>
                        ) : (
                            <>
                                <Flex>
                                    <Flex data-cy='btn-back' alignItems={'center'} cursor='pointer' onClick={() => navigate(-1)}>
                                        <IconButton data-cy="todo-back-button" variant='unstyled' aria-label='back-button' icon={<ChevronLeftIcon fontSize={24} fontWeight={'bold'} />} />
                                        <Text data-cy='detail-title' fontWeight={'bold'} fontSize={'36px'} textTransform={'capitalize'}>{daysOfWeek[id]}</Text>
                                    </Flex>
                                    <Spacer />
                                    <ButtonPrimary borderRadius={20} dataCy={'btn-create-schedule'} title={'+ Tambah Mata Kuliah'} onClick={() => onOpen()} />
                                </Flex>
                                {/* List */}

                                {
                                    dataState.length == 0 ? (
                                        <Center>
                                            <Box maxH={600} maxW={400} my={20} data-cy="todo-empty-state">
                                                <img alt='hero-image' src={heroImage} width={'100%'} />
                                            </Box>
                                        </Center>
                                    ) : (
                                        <List spacing={4} mt={8}>
                                            {
                                                dataState.map((val) => (
                                                    <TodoListItem onEdit={handleChangeData} onDeleteTodo={() => handleDeleteClick(val.id)} key={val.id} data={val} />
                                                ))
                                            }
                                        </List>
                                    )
                                }
                            </>
                        )
                    }
                    <ModalDelete isLoading={loadingDelete} onClose={onCloseDelete} isOpen={isOpenDelete} onDelete={() => handleDelete(selectedData)} />
                    <ModalAddSchedule day={id} hideSelectDay={true} isOpen={isOpen} onClose={onClose} onAddedData={handleChangeData} />
                </Container>
            </Box>
        </>
    )
}

export default Activity
