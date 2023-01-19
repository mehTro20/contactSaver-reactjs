import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Axios from "axios";

function Form() {
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
    e.preventDefault();
    setContactInfo([...contactInfo, form]);

    Axios.post(`http://localhost:7000/contacts`, { form }).then(
      (res) => {
        console.log(res);
        console.log(res.data);
        return res.data;
      }
    );
  };

  return (
    <div>
      <h3>Add Contact</h3>
      <div className="form">
        <form onSubmit={submitHandle}>
          <label>
            Name: <input type="text" name="name" onChange={formHandler} />
          </label>
          <label>
            Contact Number:{" "}
            <input type="number" name="number" onChange={formHandler} />
          </label>
          <label>
            Email: <input type="text" name="email" onChange={formHandler} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
