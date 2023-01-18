import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [phoneBook, setPhoneBook] = useState([]);

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

  return (
    <div className="App">
      <button onClick={getContacts}>Get</button>
      {phoneBook.map((item, i) => {
        return (
          <div key={i}>
            <h3>{item.contact_name}</h3>
          </div>
        );
      })}
    </div>
  );
}

export default App;
