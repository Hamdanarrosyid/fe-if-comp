import { Box, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, useColorModeValue } from "@chakra-ui/react"
import Nav from "../components/navbar"
import { useContext, useState } from "react"
import ButtonPrimary from "../components/buttonPrimary"
import { AuthContext } from "../context/auth/authContext"
import { useNavigate } from "react-router-dom"

const Checkin = () => {
    const { onCheckin } = useContext(AuthContext)
    const navigate = useNavigate()
    const [inputEmail, setInputEmail] = useState('')
    const [inputError, setInputError] = useState(false)
    const handleChange = (e) => {
        setInputEmail(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await onCheckin(inputEmail)
        if(res == 1) {
            navigate('/')
        }
    }

    const handleOnBlur = (e) => {
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const result = pattern.test(e.target.value)
        setInputError(!result)
    }

    return (
        <>
            <Nav />
            <Box as='main'>
                <Flex
                    align={'center'}
                    justify={'center'}
                    bg={useColorModeValue('gray.50', 'gray.800')}>
                    <Stack
                        spacing={4}
                        w={'full'}
                        maxW={'md'}
                        bg={useColorModeValue('white', 'gray.700')}
                        rounded={'xl'}
                        boxShadow={'lg'}
                        p={6}
                        onSubmit={handleSubmit}
                        as={'form'}
                        my={12}>
                        <Heading data-cy='text-login' textAlign='center' lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                            Check In
                        </Heading>
                        <FormControl id="email" isInvalid={inputError} isRequired >
                            <FormLabel>Email</FormLabel>
                            <Input
                                data-cy='input-email'
                                value={inputEmail}
                                onChange={handleChange}
                                onBlur={handleOnBlur}
                                placeholder="Masukan email anda"
                                _placeholder={{ color: 'gray.500' }}
                                type="email"
                            />
                            {inputError && (
                                <FormErrorMessage data-cy='error-email'>Format email tidak sesuai</FormErrorMessage>
                            )
                            }

                        </FormControl>
                        <Stack spacing={6}>
                            <ButtonPrimary title={'Mulai Sesi'} type='submit' dataCy={'btn-login'} />
                        </Stack>
                    </Stack>
                </Flex>
            </Box >
        </>
    )
}

export default Checkin