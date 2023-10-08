import { DeleteIcon } from '@chakra-ui/icons'
import { Card, CardHeader, CardBody, CardFooter, Heading, Text, Flex, IconButton } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

const ActivityCard = ({ id, title, created_at, onDeleteActivity }) => {
    const navigate = useNavigate()
    return (
        <Card data-cy="activity-item">
            <CardHeader cursor='pointer' onClick={() => navigate(`/activity/${id ?? 'untitled'}`)}>
                <Heading data-cy="activity-item-title" size='md'> {title}</Heading>
            </CardHeader>
            <CardBody cursor='pointer' onClick={() => navigate(`/activity/${id ?? 'untitled'}`)}>
                {/* <Text>View a summary of all your customers over the last month.</Text> */}
            </CardBody>
            <CardFooter>
                <Flex width='full' alignItems={'center'} justifyContent='space-between'>
                    <Text data-cy="activity-item-date">{created_at}</Text>
                    <IconButton data-cy="activity-item-delete-button" onClick={onDeleteActivity} icon={<DeleteIcon />} variant='ghost' />
                </Flex>
            </CardFooter>
        </Card>
    )
}

ActivityCard.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    created_at: PropTypes.string,
    onDeleteActivity: PropTypes.func
}

export default ActivityCard