import { Alert, AlertIcon, Box, Button, Center, Container, Flex, SimpleGrid, Spacer, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import Nav from '../components/navbar'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { useCallback, useEffect, useState } from 'react'
import activityImage from '../assets/images/hero.png'
import ActivityCard from '../components/activityCard'
import axios from 'axios'
import { BASE_URL } from '../utils/config'
import ActivitySkeleton from '../components/activitySkeleton'
import ModalDelete from '../components/modalDelete'
// import ActivitySkeleton from '../components/activitySkeleton'

function App() {
  const [dataState, setDataState] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()
  const { onOpen, isOpen, onClose } = useDisclosure()
  const [alertProperties, setAlertProperties] = useState(null)
  const [selectedData, setSelectedData] = useState(null)

  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/activity-groups?email=hamdan@gmail.com`)
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
  }, [toast])

  const handleAddData = useCallback(async () => {
    try {
      await axios.post(`${BASE_URL}/activity-groups`, {
        title: 'New Activity',
        email: 'hamdan@gmail.com'
      })
      fetchData()

    } catch (error) {
      toast({
        title: 'Gagal menambahkan data',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right'
      })
    }
  }, [toast, fetchData])

  const handleDeleteActivity = useCallback(async (activity_id) => {
    try {
      await axios.delete(`${BASE_URL}/activity-groups/${activity_id}`)
      setAlertProperties({
        status: 'success',
        message: 'berhasil menghapus data'
      })
      onClose()
      fetchData()

    } catch (error) {
      toast({
        title: 'Gagal menghapus activity',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right'
      })
      throw new Error(error)
    }

  }, [toast, fetchData, onClose])

  const handleDeleteClick = (id) => {
    setSelectedData(id)
    onOpen()
  }

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
          <Flex>
            <Text fontSize={'xl'} fontWeight={'bold'} data-cy="activity-title">Activity</Text>
            <Spacer />
            <Button data-cy="activity-add-button" leftIcon={<PlusSquareIcon />} onClick={handleAddData} colorScheme='blue' variant='solid'>
              Tambah
            </Button>
          </Flex>

          {/* Main Activity */}
          {
            isLoading ? (
              <ActivitySkeleton />
            ) : !dataState ? (
              <Center>
                <Box maxH={600} maxW={400} my={20} data-cy="activity-empty-state">
                  <img alt='hero-image' src={activityImage} width={'100%'} />
                </Box>
              </Center>
            ) : (
              <SimpleGrid gap={5} spacing={4} my={5} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                {
                  dataState.map((value) => (
                    <>
                      <ActivityCard key={value.id} onDeleteActivity={()=> handleDeleteClick(value.id)} title={value.title} created_at={new Date(value.created_at).toLocaleDateString()} id={value.id} />
                    </>
                  ))
                }
              </SimpleGrid>
            )

          }
          {
            alertProperties && (
              <Alert data-cy={'modal-information'} status={alertProperties.status}>
                <AlertIcon />
                {alertProperties.message}
              </Alert>
            )
          }
          <ModalDelete onClose={onClose} isOpen={isOpen} onDelete={() => handleDeleteActivity(selectedData)} />

        </Container>
      </Box>
    </>
  )
}

export default App
