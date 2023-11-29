import { Flex, IconButton, ListItem, Spacer, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import PropTypes from 'prop-types';
import { GoTrash } from "react-icons/go";
import { EditIcon } from "@chakra-ui/icons";
import ModalAddSchedule from "./modalAddSchedule";

const TodoListItem = ({ data, onEdit, onDeleteTodo }) => {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <ListItem data-cy="card-item-title" bg={useColorModeValue('white', 'gray.600')} rounded='lg' p={5} justifyContent='space-between' display='flex' alignItems='center'>
            <Flex alignItems='center'>
                <Text textTransform={'capitalize'} fontWeight={'400'} fontSize={'20px'}>{data.title}</Text>
            </Flex>
            <Flex>
                <IconButton data-cy="card-item-edit" onClick={() => onOpen()} variant='ghost' icon={<EditIcon />} />
                <Spacer />
                <IconButton data-cy="card-item-delete" onClick={onDeleteTodo} variant='ghost' icon={<GoTrash />} />
            </Flex>
            <ModalAddSchedule onAddedData={onEdit} initialValue={data} isEdit={true} day={data.day} hideSelectDay={true} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </ListItem>

    )
}

TodoListItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        day: PropTypes.string
    }),
    onEdit: PropTypes.func,
    onDeleteTodo: PropTypes.func
}

export default TodoListItem