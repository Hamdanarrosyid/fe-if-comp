import { Box, Checkbox, Flex, IconButton, ListItem, Spacer, useColorModeValue, useToast } from "@chakra-ui/react"
import PropTypes from 'prop-types';
import PriorityIcon from "./priorityIcon";
import CustomEditableInput from "./customEditableInput";
import { GoTrash } from "react-icons/go";
import { useCallback, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const TodoListItem = ({ data, onToggleTodo, onDeleteTodo }) => {
    const [titleTodo, setTitleTodo] = useState(data.title)
    const toast = useToast()

    const handleUpdateTitle = useCallback(async () => {
        try {
            await axios.patch(`${BASE_URL}/todo-items/${data.id}`, {
                title : titleTodo
            })
            
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
        }
    }, [toast, titleTodo, data.id])

    return (
        <ListItem data-cy="todo-item" bg={useColorModeValue('white','gray.600')} rounded='lg' p={5} justifyContent='space-between' display='flex' alignItems='center'>
            <Flex alignItems='center'>
                <Box mr={4}>
                    <Checkbox data-cy="todo-item-checkbox" size='lg' isChecked={data.is_active == 1 ? false : true} onChange={onToggleTodo} />
                </Box>
                <PriorityIcon data-cy="todo-item-priorit-indicator" priority={data.priority == 'normal' ? 'MEDIUM' : data.priority.replace('-', '_').toUpperCase()} />
                <Spacer w={1} />
                <Box textDecoration={data.is_active == 1 ? 'none' : 'line-through'}>
                    <CustomEditableInput dataCy={{title: 'todo-item-title', editButton: 'todo-item-edit-button'}} defaultValue={titleTodo} onChange={(v) => setTitleTodo(v)} onSubmit={handleUpdateTitle} />
                </Box>
            </Flex>
            <IconButton data-cy="todo-item-delete-button" onClick={onDeleteTodo} variant='ghost' icon={<GoTrash />} />
        </ListItem>

    )
}

TodoListItem.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        is_active: PropTypes.number,
        priority: PropTypes.string,
    }),
    onToggleTodo: PropTypes.func,
    onDeleteTodo: PropTypes.func
}

export default TodoListItem