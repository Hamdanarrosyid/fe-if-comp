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

export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode()
    const navigate = useNavigate()
    return (
        <Box bg={useColorModeValue('#16ABF8', 'gray.900')} px={4}>
            <Container maxW={'6xl'}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Box cursor='pointer' onClick={()=>navigate('/')}>
                        <Text fontWeight={'bold'} fontSize={24} data-cy="header-title">TO DO LIST APP</Text>
                    </Box>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
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