import { useEffect, useState } from "react";
import priorityListItem from "../utils/priorityTodoList";
import { GoDotFill } from 'react-icons/go'
import PropTypes from 'prop-types';
import { Icon } from "@chakra-ui/react";

const PriorityIcon = ({ priority }) => {
    const [color, setColor] = useState(null)
    useEffect(() => {
        switch (priority) {
            case priorityListItem.VERY_HIGH:
                setColor('red.500')
                break
            case priorityListItem.HIGH:
                setColor('orange.500')
                break
            case priorityListItem.MEDIUM:
                setColor('green.500')
                break;
            case priorityListItem.LOW:
                setColor('blue.500')
                break
            case priorityListItem.VERY_LOW:
                setColor(('purple.500'))
                break
            default:
                setColor(('black'))
                break;
        }
    }, [color, priority])

    return <Icon as={GoDotFill} fontSize='xl' color={color} />
}

PriorityIcon.propTypes = {
    priority : PropTypes.oneOf(Object.values(priorityListItem))
}

export default PriorityIcon

