import { useState } from "react";
import { Modal, Card, Button } from "react-bootstrap";

const PlayerList = ({playerList, isDisabled}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
    <>
        <Button style={{float: 'right'}} 
                variant="primary" 
                onClick={handleShow}
                disabled={isDisabled}>
            View Players
        </Button>
        <Modal 
            show={show}
            onHide={handleClose}
            scrollable={true}
            centered>
            <Modal.Header closeButton>
                <Modal.Title>List of Attending Players</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {playerList.length > 0 ?
                    playerList.map((displayName, key) => {
                    return (
                        <Card key={key} 
                              style={{border: 'none'}} 
                              className="mb-3">
                            <Card.Text>{displayName}</Card.Text>
                        </Card>
                    )}
                ) : <p style={{textAlign: 'center'}}>
                        No current players. Be the first to join!
                    </p>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    </>
    )   
}

export default PlayerList;