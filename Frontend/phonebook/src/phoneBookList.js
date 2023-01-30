import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";

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
    setEditedInfo({ ...editedInfo, [e.target.name]: e.target.value });

    console.log("newform", newForm);
    console.log("editedInfo", editedInfo);
  };

  return (
    <div className="App">
      <button onClick={getContacts}>Get</button>
      <Table className="table" striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        {/* <tbody> */}
        {phoneBook.map((item, i) => {
          return (
            <tbody key={i}>
              <tr>
                <td>
                  <d className="circle">{item.contact_name[0]}</d>
                  {item.contact_name}
                </td>
                <td>{item.contact_email}</td>
                <td>{item.contact_number}</td>
                <Button
                  key={i}
                  // variant="success"
                  onClick={() => {
                    setEditedInfo(item);
                    // setNewForm({...editedInfo})
                    console.log(editedInfo);
                    return invokeModal(!false);
                  }}
                >
                  Edit
                </Button>{" "}
                <Button
                  id={item._id}
                  variant="danger"
                  onClick={() => {
                    // e.preventDefault();

                    axios
                      .delete(`http://localhost:7000/contacts/${item._id}`)
                      .then((res) => {
                        console.log(res);
                        console.log(res.data);
                      });
                  }}
                >
                  Delete
                </Button>{" "}
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
              </tr>
            </tbody>
          );
        })}
        {/* </tbody> */}
      </Table>
      <Link to="/form">
        <Button>Add Contact</Button>
      </Link>
    </div>
  );
}

export default PhoneBookList;
