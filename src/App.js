// import React, { useState } from 'react';
import './App.css';
import {Container} from 'react-bootstrap'
import Customer from './component/Customer'
import Information from './component/Information'

function App() {
  return (
    <div className="App">
      <>
        <h1>고객</h1>
        <Container className="menu">
          <Customer className="customer"></Customer>
          <Information className="information"></Information>
        </Container>
      </>
    </div>
  );
}

export default App;
