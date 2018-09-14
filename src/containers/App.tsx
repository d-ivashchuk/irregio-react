import * as React from "react";
import styled from "../theme/styled-components";
import de from "./data";

import Button from "../ui/button/button";

console.log(de);

// interface Data {
//   frequency:string
//   infinitive:string
//   pastTense:string
//   presentPerfect:string
//   translationDe:string
//   translationRus:string
// }

interface IState {
  data?: object;
  progress: number;
  hintsTaken: number;
}

const Title = styled.h1`
  color: ${props => props.color};
`;

class App extends React.Component<{}, IState> {
  public state = {
    data: de,
    progress: 0,
    hintsTaken: 0
  };

  public render() {
    const { data } = this.state.data;
    return (
      <React.Fragment>
        <Title color={"#7FDBFF"}>Irreg.io</Title>
        <div>Progress: {this.state.progress}</div>
        <div>Infinitive: {data[0].infinitive}</div>
        <div>Russian translation: {data[0].translationRus}</div>
        <div>English translation: {data[0].translationEn}</div>
        <div>Frequency: {data[0].frequency}</div>
        <Button label="Next" />
        <Button label="Previous" />
      </React.Fragment>
    );
  }
}

export default App;
