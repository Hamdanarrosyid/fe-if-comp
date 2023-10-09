import { Box, Button, Center, Container, Flex, IconButton, Spacer, Spinner, useDisclosure, useToast, List, useColorModeValue, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
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
import { BiSortAlt2, BiSortDown, BiSortUp, BiSortAZ, BiSortZA, BiCheck } from 'react-icons/bi'
import { aToZ, noTComplete, zToA } from '../utils/sort'
import ModalDelete from '../components/modalDelete'

function Activity() {
    const [dataState, setDataState] = useState(null)
    const [dataTitle, setDataTitle] = useState(null)
    const { onOpen, isOpen, onClose } = useDisclosure()
    const { onOpen : onOpenDelete, isOpen : isOpenDelete, onClose : onCloseDelete } = useDisclosure()
    const navigate = useNavigate()
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const toast = useToast()
    const [selectedSord, setSelectedSort] = useState('terbaru')
    const [selectedData, setSelectedData] = useState(null)

    const fetchData = useCallback(async (refresh, reverse) => {
        try {
            const data = await axios.get(`${BASE_URL}/activity-groups/${id}`)
            setDataState(() => {
                if (selectedSord == 'terlama' && !refresh || reverse) {
                    return data?.data?.todo_items.reverse()
                } else if (selectedSord == 'a-z' && !refresh) {
                    return aToZ(data?.data?.todo_items)
                } else if (selectedSord == 'z-a' && !refresh) {
                    return zToA(data?.data?.todo_items)
                } else if (selectedSord == 'belum-selesai' && !refresh) {
                    return noTComplete(data?.data?.todo_items)
                } else {
                    return data?.data?.todo_items
                }
            })
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
    }, [toast, id, selectedSord])

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

    const handleDeleteClick = (id) => {
        setSelectedData(id)
        onOpenDelete()
      }

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
        } finally {
            onCloseDelete()
        }

    }, [toast, fetchData, onCloseDelete])

    useEffect(() => {
        if (!dataState && isLoading) {
            fetchData()
        }
    }, [dataState, isLoading, fetchData, selectedSord])

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
                                        <CustomEditableInput dataCy={{ title: 'todo-title', editButton: 'todo-title-edit-button' }} defaultValue={dataTitle} onChange={(v) => setDataTitle(v)} onsubmit={handleSubmitTitle} />
                                    </Flex>
                                    <Spacer />
                                    <Menu>
                                        <MenuButton
                                            data-cy='todo-sort-button'
                                            as={IconButton}
                                            aria-label='Sort'
                                            icon={<BiSortAlt2 />}
                                            variant='outline'
                                            rounded='full'
                                            mr={4}
                                        />
                                        <MenuList>
                                            <MenuItem data-cy="sort-selection" icon={<BiSortDown />} onClick={() => {
                                                fetchData(true)
                                                setSelectedSort('terbaru')
                                            }} command={selectedSord == 'terbaru' && <BiCheck />}>
                                                Terbaru
                                            </MenuItem>
                                            <MenuItem data-cy="sort-selection" icon={<BiSortUp />} onClick={() => {
                                                fetchData(true, true)
                                                setSelectedSort('terlama')
                                            }} command={selectedSord == 'terlama' && <BiCheck />}>
                                                Terlama
                                            </MenuItem>
                                            <MenuItem data-cy="sort-selection" icon={<BiSortAZ />} onClick={() => {
                                                setDataState((prev) => aToZ(prev))
                                                setSelectedSort('a-z')
                                            }} command={selectedSord == 'a-z' && <BiCheck />}>
                                                A-Z
                                            </MenuItem>
                                            <MenuItem data-cy="sort-selection" icon={<BiSortZA />} onClick={() => {
                                                setDataState((prev) => zToA(prev))
                                                setSelectedSort('z-a')
                                            }} command={selectedSord == 'z-a' && <BiCheck />}>
                                                Z-A
                                            </MenuItem>
                                            <MenuItem data-cy="sort-selection" icon={<BiSortAlt2 />} onClick={() => {
                                                setDataState((prev) => noTComplete(prev))
                                                setSelectedSort('belum-selesai')
                                            }} command={selectedSord == 'belum-selesai' && <BiCheck />}>
                                                Belum Selesai
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                    <Button data-cy="todo-add-button" leftIcon={<PlusSquareIcon />} onClick={onOpen} colorScheme='blue' variant='solid'>
                                        Tambah
                                    </Button>
                                    <ModalAdd onAddedData={handleAddedData} isOpen={isOpen} onClose={onClose} activity_group_id={parseInt(id)} />
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
                                                    <TodoListItem onDeleteTodo={() => handleDeleteClick(val.id)} onToggleTodo={() => handleToggleTodo(val.id, val.is_active)} key={val.id} data={val} />
                                                ))
                                            }
                                        </List>
                                    )
                                }
                            </>
                        )
                    }
                    <ModalDelete onClose={onCloseDelete} isOpen={isOpenDelete} onDelete={() => handleDelete(selectedData)} />
                </Container>
            </Box>
        </>
    )
}

export default Activity
