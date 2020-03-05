import React from "react";
import styled from "styled-components";

import Table from './components/Table'

import "./bootstrap.min.css"
import "./index.css";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 768px;
  padding: 1rem;
  text-align: center;
`
const App = () => {

  return (
    <Wrapper>

      <h1 style={{fontSize: '1.5rem'}}>Pokédex</h1>

      <Table></Table>

    </Wrapper>
  );
};

export default App;

