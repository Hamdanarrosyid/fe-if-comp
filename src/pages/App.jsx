import { Box, Button, Center, Container, Flex, SimpleGrid, Spacer, Text, useColorModeValue, useToast } from '@chakra-ui/react'
import Nav from '../components/navbar'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { useCallback, useEffect, useState } from 'react'
import activityImage from '../assets/images/hero.png'
import ActivityCard from '../components/activityCard'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../utils/config'
// import ActivitySkeleton from '../components/activitySkeleton'

function App() {
  const [dataState, setDataState] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const toast = useToast()

  const handleAddData = useCallback(async () => {
    try {
      const addedData = await axios.post(`${BASE_URL}/activity-groups`, {
        title: 'New Activity',
        email: 'hamdan@gmail.com'
      })
      navigate(`activity/${addedData.data.id}`)

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
  }, [navigate, toast])

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

  const handleDeleteActivity = useCallback(async (activity_id) => {
    try {
      await axios.delete(`${BASE_URL}/activity-groups/${activity_id}`)
      toast({
        title: 'Berhasil menghapus activity',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'bottom-right'
      })
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
          <Flex>
            <Text fontSize={'xl'} fontWeight={'bold'} data-cy="activity-title">Activity</Text>
            <Spacer />
            <Button data-cy="activity-add-button" leftIcon={<PlusSquareIcon />} onClick={handleAddData} colorScheme='blue' variant='solid'>
              Tambah
            </Button>
          </Flex>

          {/* Main Activity */}
          {
            !dataState ? (
              <Center>
                <Box maxH={600} maxW={400} my={20} data-cy="activity-empty-state">
                  <img alt='hero-image' src={activityImage} width={'100%'} />
                </Box>
              </Center>
            ) : (
              <SimpleGrid gap={5} spacing={4} my={5} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                {
                  dataState.map((value) => (
                    <ActivityCard key={value.id} onDeleteActivity={() => handleDeleteActivity(value.id)} title={value.title} created_at={new Date(value.created_at).toLocaleDateString()} id={value.id} />
                  ))
                }
              </SimpleGrid>
            )
          }
        </Container>
      </Box>
    </>
  )
}

export default App
