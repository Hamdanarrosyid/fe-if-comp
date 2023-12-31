import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons"
import { EditableInput, ButtonGroup, Editable, EditablePreview, Flex, IconButton, Input, useEditableControls } from "@chakra-ui/react"
import PropTypes from 'prop-types';

const CustomEditableInput = ({ defaultValue, onChange, onSubmit, dataCy }) => {
    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls()

        return isEditing ? (
            <ButtonGroup justifyContent='center' size='sm'>
                <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
                <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
            </ButtonGroup>
        ) : (
            <Flex justifyContent='center'>
                <EditablePreview data-cy={dataCy.title} {...getEditButtonProps()}/>
                <IconButton data-cy={dataCy.editButton} variant='ghost' size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
            </Flex>
        )
    }

    return (
        <Editable
            textAlign='center'
            defaultValue={defaultValue}
            onChange={onChange}
            onSubmit={onSubmit}
            fontSize='2xl'
            isPreviewFocusable={false}
            display='flex'
            justifyContent='center'
            alignItems='center'
        >
            <Input as={EditableInput} />
            {/* <Bo?x ml={2}> */}
            <EditableControls />
            {/* </Box> */}

        </Editable>
    )
}

CustomEditableInput.propTypes = {
    defaultValue: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    dataCy: PropTypes.shape({
        title: PropTypes.string,
        editButton: PropTypes.string
    })
}

export default CustomEditableInput