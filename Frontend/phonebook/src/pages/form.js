import React, { useState } from "react";
import { Form, Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import { Link, redirect } from "react-router-dom";

import Axios from "axios";

function AddContact() {
  const [form, setForm] = useState({
    number: "",
    name: "",
    email: "",
  });
  const [contactInfo, setContactInfo] = useState([]);

  const formHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandle = async (e) => {
    // e.preventDefault();
    // const navigate = useNavigate();
    setContactInfo([...contactInfo, form]);

    Axios.post(`http://localhost:7000/contacts`, { form }).then((res) => {
      console.log(res);
      console.log(res.data);
      redirect("https://localhost:3000");
      return res.data;
    });

    window.location.href = "https://localhost:3000";
  };

  return (
    <div>
      <h3>Add Contact</h3>
      {/* <div className="form"> */}
      <Form onSubmit={submitHandle}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Your name"
            onChange={formHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email </Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Your email"
            onChange={formHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            name="number"
            placeholder="Your phone number"
            onChange={formHandler}
          />
        </Form.Group>

        <ButtonToolbar>
          <ButtonGroup>
            <Button type="submit">Save Details</Button>
          </ButtonGroup>
        </ButtonToolbar>
        <ButtonToolbar>
          <ButtonGroup>
            <Link to="/">
              <Button type="cancel" variant="light">
                Cancel
              </Button>
            </Link>
          </ButtonGroup>
        </ButtonToolbar>
      </Form>
      {/* </div> */}
    </div>
  );
}

export default AddContact;
