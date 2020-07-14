import React from 'react';
import styled, { css } from 'styled-components';
import LoginComponent from './Login';

const Background = styled.div`
  ${props => props.centered && css`
    display: flex; // make us of Flexbox
    align-items: center; // does vertically center the desired content
    justify-content: center; // horizontally centers single line items
  `}
`

function App() {
  return (
    <Background>
      <LoginComponent />
    </Background>
  );
}

export default App;
