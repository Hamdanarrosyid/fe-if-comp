import { Box, Button, Center, Container, Flex, IconButton, Spacer, Spinner, useDisclosure, useToast, List, useColorModeValue } from '@chakra-ui/react'
import Nav from '../components/navbar'
import { ChevronLeftIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { useCallback, useEffect, useState } from 'react'
import heroImage from '../assets/images/heroact.png'
import { useNavigate, useParams } from 'react-router-dom'
import ModalAdd from '../components/modalAdd'
import axios from 'axios'
import { BASE_URL } from '../utils/config'
import TodoListItem from '../components/todoListItem'
import CustomEditableInput from '../components/customEditableInput'

function Activity() {
    const [dataState, setDataState] = useState(null)
    const [dataTitle, setDataTitle] = useState(null)
    const { onOpen, isOpen, onClose } = useDisclosure()
    const navigate = useNavigate()
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const toast = useToast()

    const fetchData = useCallback(async () => {
        try {
            const data = await axios.get(`${BASE_URL}/activity-groups/${id}`)
            const tempObj = {}
            data?.data?.todo_items.map(val => {
                tempObj[val.id] = val
            })
            setDataState(tempObj)
            setDataTitle(data.data.title)
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
    }, [toast, id])

    const handleSubmitTitle = useCallback(async () => {
        try {
            await axios.patch(`${BASE_URL}/activity-groups/${id}`, {
                title: dataTitle
            })
            toast({
                title: 'Berhasil mengubah judul',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right'
            })

        } catch (error) {
            toast({
                title: 'Gagal mengubah judul',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right'
            })
            throw new Error(error)
        }
    }, [id, dataTitle, toast])

    const handleAddedData = useCallback(async () => {
        fetchData()
    }, [fetchData])

    const handleToggleTodo = useCallback(async (todo_id, is_active) => {
        try {
            await axios.patch(`${BASE_URL}/todo-items/${todo_id}`, {
                is_active: is_active == 1 ? 0 : 1
            })
            fetchData()

        } catch (error) {
            toast({
                title: 'Gagal mengubah status todo',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right'
            })
            throw new Error(error)
        }

    }, [toast, fetchData])

    const handleDelete = useCallback(async (todo_id) => {
        try {
            await axios.delete(`${BASE_URL}/todo-items/${todo_id}`)
            toast({
                title: 'Berhasil menghapus todo',
                status: 'success',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right'
            })
            fetchData()

        } catch (error) {
            toast({
                title: 'Gagal menghapus todo',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
                position: 'bottom-right'
            })
            throw new Error(error)
        }

    }, [toast, fetchData])

    useEffect(() => {
        if (!dataState && isLoading) {
            fetchData()
        }
    }, [dataState, isLoading, fetchData])

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
                                    <Flex alignItems={'center'}>
                                        <IconButton data-cy="todo-back-button" variant='ghost' onClick={() => navigate(-1)} aria-label='back-button' icon={<ChevronLeftIcon fontSize={24} fontWeight={'bold'} />} />
                                        <CustomEditableInput dataCy={{title: 'todo-title', editButton: 'todo-edit-button'}} defaultValue={dataTitle} onChange={(v) => setDataTitle(v)} onsubmit={handleSubmitTitle} />
                                    </Flex>
                                    <Spacer />
                                    <Button data-cy="todo-add-button" leftIcon={<PlusSquareIcon />} onClick={onOpen} colorScheme='blue' variant='solid'>
                                        Tambah
                                    </Button>
                                    <ModalAdd onAddedData={handleAddedData} isOpen={isOpen} onClose={onClose} activity_group_id={parseInt(id)} />
                                </Flex>
                                {/* List */}

                                {
                                    Object.keys(dataState)?.length == 0 ? (
                                        <Center>
                                            <Box maxH={600} maxW={400} my={20} data-cy="todo-empty-state">
                                                <img alt='hero-image' src={heroImage} width={'100%'} />
                                            </Box>
                                        </Center>
                                    ) : (
                                        <List spacing={4} mt={8}>
                                            {
                                                Object.keys(dataState).map((key) => (
                                                    <TodoListItem onDeleteTodo={()=>handleDelete(key)} onToggleTodo={() => handleToggleTodo(key, dataState[key].is_active)} key={key} data={dataState[key]} />
                                                ))
                                            }
                                        </List>
                                    )
                                }
                            </>
                        )
                    }
                </Container>
            </Box>
        </>
    )
}

export default Activity
