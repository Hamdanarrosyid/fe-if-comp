import {
    Box,
    Flex,
    Button,
    useColorModeValue,
    Stack,
    useColorMode,
    Container,
    Text
} from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import ButtonPrimary from './buttonPrimary'
import { AuthContext } from '../context/auth/authContext'

export default function Nav() {
    const {email, onLogout} = useContext(AuthContext)
    const { colorMode, toggleColorMode } = useColorMode()
    const navigate = useNavigate()

    const handleLogout = () => {
        const res = onLogout()
        if(res == 1) {
            navigate('/checkin')
        }
    }

    return (
        <Box bg={useColorModeValue('#3A0B48', 'gray.900')} px={4}>
            <Container maxW={'6xl'}>
                <Flex h={16} alignItems={'center'}>
                    <Box flexGrow={1}>
                        <Text color={'white'} fontWeight={'bold'} textAlign={'center'} fontSize={24} data-cy="header-title">Get Jadwal</Text>
                    </Box>

                    <Flex alignItems={'center'} flexGrow={email ? 1 : 0} justifyContent={'end'}>
                        <Stack direction={'row'} spacing={7}>
                            {
                                email &&
                                <ButtonPrimary dataCy='btn-logout' title={`Check out | ${email}`} onClick={handleLogout}/>

                            }
                            <Button onClick={toggleColorMode}>
                                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                            </Button>
                        </Stack>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    )
}