import * as React from 'react';
import styled from './theme/styled-components';

const Title = styled.h1`
  color: ${props => props.color};
`;

class App extends React.Component {
  public render() {
    return <Title color={'#7FDBFF'}>Typescript with styled-components</Title>;
  }
}

export default App;
