import { Alert, AlertIcon, Box, Center, Container, Flex, SimpleGrid, Spacer, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import Nav from '../components/navbar'
import { AddIcon } from '@chakra-ui/icons'
import { useCallback, useContext, useEffect, useState } from 'react'
import activityImage from '../assets/images/hero.png'
import ActivityCard from '../components/activityCard'
import { BASE_URL } from '../utils/config'
import ActivitySkeleton from '../components/activitySkeleton'
import { schedule } from '../api'
import { AuthContext } from '../context/auth/authContext'
import ButtonPrimary from '../components/buttonPrimary'
import ModalAddSchedule from '../components/modalAddSchedule'

function App() {
  const [dataState, setDataState] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()
  const { isOpen, onClose, onOpen } = useDisclosure()
  const [alertProperties] = useState(null)

  const { email } = useContext(AuthContext)

  const fetchData = useCallback(async () => {
    try {
      const { data } = await schedule.get(`${BASE_URL}/schedule?email=${email}`)
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
  }, [email, toast])

  const handleOnAddedData = () => {
    fetchData()
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
            <ButtonPrimary borderRadius={20} leftIcon={<AddIcon />} dataCy={'btn-create-schedule'} title={'Buat Jadwal Kuliah'} onClick={()=> onOpen()} />
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
                  Object.keys(dataState).map((value, i) => (
                    <ActivityCard key={i} title={value} id={value} count={dataState[value]} />
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
          <ModalAddSchedule isOpen={isOpen} onClose={onClose} onAddedData={handleOnAddedData}/>

        </Container>
      </Box>
    </>
  )
}

export default App
