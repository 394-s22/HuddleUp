import { Stack } from 'react-bootstrap';
import Event from './Event';

const EventsList = ({ events, setEventsList }) => (
    <Stack direction="vertical" gap={3}>
    { Object.values(events).map(event => <Event key={ event.id } event={ event } setEventsList={setEventsList} />) }
    </Stack>
  );

export default EventsList;