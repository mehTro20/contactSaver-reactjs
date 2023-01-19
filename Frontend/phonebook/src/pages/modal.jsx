import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function ModalEdit() {
  const [showModal, invokeModal] = useState(false);
  const initModal = () => {
    return invokeModal(!false);
  };
  const hideModal = () => {
    return invokeModal(false);
  };

  return (
    <>
      <Button variant="success" onClick={initModal}>
        Edit
      </Button>
      <Modal show={showModal}>
        <Modal.Header closeButton onClick={hideModal}>
          <Modal.Title>You want to make changes?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="name" name="name" placeholder="name?" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Number</Form.Label>
              <Form.Control type="number" name="number" placeholder="number?" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={initModal}>
            Cancel
          </Button>
          <Button variant="dark" onClick={initModal}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalEdit;
