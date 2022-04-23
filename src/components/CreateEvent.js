import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { createEvent } from '../utilities/events.js';

const PostButton = () => {
  const [show, setShow] = useState(false);
  // title, description, sport, host, location, min_players, max_players, current_players, date, start_time, end_time
  // current_players, date, start_time, end_time
  const [title, setTitle] = useState('');
  const [host, setHost] = useState('');
  const [location, setLocation] = useState('');
  const [minPlayers, setMinPlayers] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onNumberInput = e => {
    // replace non-digits with blank
    let value = e.target.value.replace(/[^\d]/, '');
    value = value.replaceAll('-', '');

    // type check
    if (isNaN(parseInt(value)) && value !== '') return;

    // set field
    if (e.target.id === "postEvent.minPlayers") {
      setMinPlayers(value);
    } else {
      setMaxPlayers(value);
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Post Event
      </Button>

      <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Post an event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="postEvent.eventTitle">
              <Form.Label>Event Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postEvent.hostName">
              <Form.Label>Host</Form.Label>
              <Form.Control
                type="text"
                placeholder="Host Name"
                value={host}
                onChange={(e) => setHost(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postEvent.location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="(e.g, Deering Meadow)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postEvent.minPlayers">
              <Form.Label>Minimum Player Count</Form.Label>
              <Form.Control
                type="text"
                value={minPlayers}
                min={2}
                max={maxPlayers}
                onChange={(e) => onNumberInput(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postEvent.maxPlayers">
              <Form.Label>Maximum Player Count</Form.Label>
              <Form.Control
                type="text"
                min={minPlayers}
                value={maxPlayers}
                onChange={(e) => onNumberInput(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postEvent.dateTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postEvent.dateTime">
              <Form.Label>End Time</Form.Label>
              <Form.Control type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postEvent.description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Post event
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PostButton;