import { Card, CardHeader, CardBody, Heading, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import { daysOfWeek } from '../utils/daysOfWeek';

const ActivityCard = ({ id, title, count }) => {
    const navigate = useNavigate()
    return (
        <Card data-cy="card-day">
            <div data-cy="activity-item" onClick={() => navigate(`/schedule/${id}`)}></div>
            <CardHeader cursor='pointer' onClick={() => navigate(`/schedule/${id}`)}>
                <Heading as='h4' data-cy={`card-title-${daysOfWeek[title]}`} size='md'> {daysOfWeek[title]}</Heading>
            </CardHeader>
            <CardBody cursor='pointer' onClick={() => navigate(`/schedule/${id}`)}>
                <Text data-cy={`card-desc-${daysOfWeek[title]}`} color={count > 0 ? '#D9019C' : '#BBBBBB'}>{count > 0 ? count : 'Belum ada'} mata kuliah</Text>
            </CardBody>
        </Card>
    )
}

ActivityCard.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    created_at: PropTypes.string,
    count: PropTypes.number,
    onDeleteActivity: PropTypes.func
}

export default ActivityCard