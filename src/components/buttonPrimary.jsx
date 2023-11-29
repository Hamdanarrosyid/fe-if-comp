import { Button, useColorModeValue } from "@chakra-ui/react"

// eslint-disable-next-line react/prop-types
const ButtonPrimary = ({ onClick, dataCy, title, type, borderRadius, leftIcon, isDisabled, isLoading }) => {
    const bgColor = useColorModeValue('#D9019C', 'blue.500')
    const bgHoverColor = useColorModeValue('#D9017F', 'blue.600')
    return (
        <Button
            leftIcon={leftIcon}
            isDisabled={isDisabled}
            borderRadius={borderRadius}
            type={type ?? 'button'}
            onClick={onClick}
            data-cy={dataCy}
            isLoading={isLoading}
            bg={bgColor}
            color={'white'}
            _hover={{
                bg: bgHoverColor,
            }}>
            {title}
        </Button>
    )
}

export default ButtonPrimary