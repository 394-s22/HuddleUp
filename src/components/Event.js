import { Card, Button } from 'react-bootstrap';

const Event = ({ event }) => (
    <Card style={{ textAlign: 'left' }}>
    <Card.Body>
      <Card.Title>{ event.title }</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">Host: { event.host } </Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">Location: { event.location } </Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">Minimum Players: { event.min_players } </Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">
        Players Signed Up: { event.current_players }/{ event.max_players } 
        </Card.Subtitle>
      <Card.Subtitle className="mb-2 text-muted">
        Date: { event.date }: { event.start_time } - { event.end_time } 
        </Card.Subtitle>
      <Card.Text>
        {event.description}
      </Card.Text>
      <Button variant="primary">Join</Button>
    </Card.Body>
    </Card>
  );

export default Event;