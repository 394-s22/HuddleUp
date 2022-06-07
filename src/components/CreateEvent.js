import { useState } from "react";
import { Modal, Form, Button, FloatingLabel, Row, Col } from "react-bootstrap";
import { createEvent } from '../utilities/events.js';
import { useUserState } from "../utilities/firebase.js";

const PostButton = () => {
  const [show, setShow] = useState(false);
  // title, description, sport, host, location, min_players, max_players, current_players, date, start_time, end_time
  // current_players, date, start_time, end_time
  const [title, setTitle] = useState('');
  const [host, setHost] = useState('');
  const [sport, setSport] = useState('');
  const [location, setLocation] = useState('');
  const [minPlayers, setMinPlayers] = useState('');
  const [maxPlayers, setMaxPlayers] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setTitle('');
    setHost('');
    setLocation('');
    setMinPlayers('');
    setMaxPlayers('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setDescription('');
  }

  const [user] = useUserState();

  const handleSubmit = (e) => {
    createEvent(title, description, sport, host, location, minPlayers, maxPlayers,
      0, date, startTime, endTime, user);
    
    handleClose();
  }

  const onNumberInput = e => {
    // replace non-digits with blank
    const value = e.target.value.replace(/[^\d]/, '');

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
      <Button variant="primary" style={{backgroundColor: '#0a58ca'}} onClick={handleShow}>
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
          <Form onSubmit={handleSubmit}>
            <FloatingLabel controlId="postEvent.eventTitle" label="Event Title" className="mb-3">
              <Form.Control
                required  
                type="text"
                placeholder="..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="postEvent.hostName" label="Host">
              <Form.Control
                required  
                type="text"
                placeholder="..."
                value={host}
                onChange={(e) => setHost(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="postEvent.sport" label="Sport">
              <Form.Control
                required  
                type="text"
                placeholder="..."
                value={sport}
                onChange={(e) => setSport(e.target.value)} />
            </FloatingLabel>
            <FloatingLabel className="mb-3" controlId="postEvent.location" label="Location">
              <Form.Control
                required  
                type="text"
                placeholder="..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </FloatingLabel>
            <Row className="mb-3">
              <Col>
                <FloatingLabel controlId="postEvent.minPlayers" label="Minimum Players">
                  <Form.Control
                    required  
                    type="text"
                    placeholder="..."
                    value={minPlayers}
                    min={2}
                    max={maxPlayers}
                    onChange={(e) => onNumberInput(e)} />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="postEvent.maxPlayers" label="Maximum Players">
                  <Form.Control
                    required  
                    type="text"
                    placeholder="..."
                    min={minPlayers}
                    value={maxPlayers}
                    onChange={(e) => onNumberInput(e)} />
                </FloatingLabel>
              </Col>
            </Row>
            <FloatingLabel className="mb-3" controlId="postEvent.date" label="Date">
              <Form.Control
                required  
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)} />
            </FloatingLabel>
            <Row className="mb-3">
              <Col>
                <FloatingLabel controlId="postEvent.startTime" label="Start">
                  <Form.Control 
                    required
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)} />
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="postEvent.endTime" label="End">
                  <Form.Control 
                    required
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)} />
                </FloatingLabel>
              </Col>
            </Row>
            <FloatingLabel className="mb-3" controlId="postEvent.description" label="Description">
              <Form.Control
                required  
                as="textarea"
                placeholder="..."
                value={description}
                onChange={(e) => setDescription(e.target.value)} />
            </FloatingLabel>
            <Row className="align-items-right">
              <Col style={{ textAlign: 'right' }}>
                <Button className="mx-2" onClick={handleClose} variant="secondary">Close</Button>
                <Button type="submit" variant="primary">Post event</Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PostButton;