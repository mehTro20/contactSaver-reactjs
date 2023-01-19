import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
// import ModalEdit from "./pages/modal";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "/home/thecodingground/workspace/contactSaver-reactjs/Frontend/phonebook/node_modules/bootstrap/dist/css/bootstrap.min.css"
import axios from "axios";

function PhoneBookList() {
  const [phoneBook, setPhoneBook] = useState([]);
  const [showModal, invokeModal] = useState(false);
  const [editedInfo, setEditedInfo] = useState([]);

  const initModal = () => {
    return invokeModal(!false);
  };
  const hideModal = () => {
    return invokeModal(false);
  };

  let someValue = editedInfo.contact_email;
  let anotherValue = editedInfo.contact_name;
  let otherValue = editedInfo.contact_number;
  // const mutation = (e) =>{
  // }
  const getContacts = (e) => {
    e.preventDefault();

    axios
      .get(`http://localhost:7000/contacts`)
      .then((res) => {
        setPhoneBook(res.data);
        console.log(phoneBook);
        return res.data;
      })
      .catch((err) => {
        console.log(err.res.data.err);
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:7000/contacts`).then((res) => {
      setPhoneBook(res.data);
      console.log(phoneBook);
    });
  }, []);

  const [newForm, setNewForm] = useState({
    contact_name: anotherValue,
    contact_number: otherValue,
    contact_email: someValue,
  });

  const newFormHandler = (e) => {
    setNewForm({ ...newForm, [e.target.name]: e.target.value });
    setEditedInfo({ ...editedInfo, [e.target.name]: e.target.value })
  };

  return (
    <div className="App">
      <button onClick={getContacts}>Get</button>
      {phoneBook.map((item, i) => {
        return (
          <div key={i}>
            <h3>{item.contact_name}</h3>
            <p>{item.contact_number}</p>
            <p>{item.contact_email}</p>
            <button
              id={item._id}
              onClick={(e) => {
                // e.preventDefault();

                axios
                  .delete(`http://localhost:7000/contacts/${item._id}`)
                  .then((res) => {
                    console.log(res);
                    console.log(res.data);
                  });
              }}
            >
              X
            </button>

            <div key={i} className="container mt-3">
              <Button
                variant="success"
                onClick={() => {
                  setEditedInfo(item);
                  // setNewForm({...editedInfo})
                  console.log(editedInfo);
                  return invokeModal(!false);
                }}
              >
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
                      <Form.Control
                        type="name"
                        name="contact_name"
                        placeholder="name?"
                        defaultValue={editedInfo.contact_name}
                        // value={editedInfo.contact_name}
                        onChange={newFormHandler}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Number</Form.Label>
                      <Form.Control
                        type="number"
                        name="contact_number"
                        placeholder="number?"
                        defaultValue={editedInfo.contact_number}
                        onChange={newFormHandler}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formGroupEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="contact_email"
                        placeholder="Enter email"
                        // value={someValue}
                        defaultValue={editedInfo.contact_email}
                        onChange={newFormHandler}
                      />
                      on my credit report
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="danger" onClick={hideModal}>
                    Cancel
                  </Button>
                  <Button
                    variant="dark"
                    onClick={async (e) => {
                      e.preventDefault();
                      axios
                        .put(
                          `http://localhost:7000/contacts/${editedInfo._id}`,
                          newForm
                        )
                        .then((res) => {
                          console.log(res);
                          console.log(res.data);
                        });
                    }}
                  >
                    Save
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        );
      })}
      <button>Add Contact</button>
    </div>
  );
}

export default PhoneBookList;
