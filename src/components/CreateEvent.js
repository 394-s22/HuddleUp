import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const PostButton = () => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="postEvent.hostName">
                <Form.Label>Host</Form.Label>
                <Form.Control type="text"  placeholder="Host Name"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="postEvent.location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="(e.g, Deering Meadow)"    
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="postEvent.minPlayers">
                <Form.Label>Minimum Player Count</Form.Label>
                <Form.Control type="number"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="postEvent.dateTime">
                <Form.Label>Datetime</Form.Label>
                <Form.Control type="datetime-local"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="postEvent.description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea"/>
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