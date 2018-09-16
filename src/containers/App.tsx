import * as React from "react";
import styled from "../theme/styled-components";
import de from "./data";

import ProgressBar from "../components/ProgressBar/ProgressBar";
import Button from "../ui/button/button";

interface IState {
  data?: object;
  progress: number;
  fractionCompleted: number;
  hintsTaken: number;
  currentPerfectForm?: string;
  currentPastForm?: string;
}

const Title = styled.h1`
  color: ${props => props.color};
`;

class App extends React.Component<{}, IState> {
  public refOne: HTMLInputElement;
  public refTwo: HTMLInputElement;

  public state = {
    data: de,
    progress: 0,
    fractionCompleted: 0,
    hintsTaken: 0,
    currentPastForm: "",
    currentPerfectForm: ""
  };

  public componentDidMount() {
    document.addEventListener("keypress", this.handleRightArrow);
    document.addEventListener("keypress", this.handleLeftArrow);
  }
  public componentDidUpdate() {
    if (
      this.state.currentPastForm ===
      this.state.data.data[this.state.progress].pastTense
    ) {
      this.refTwo.focus();
    }
    if (
      this.state.currentPerfectForm ===
      this.state.data.data[this.state.progress].presentPerfect
    ) {
      this.refOne.focus();
      this.setState({
        currentPastForm: "",
        currentPerfectForm: "",
        progress: this.state.progress + 1
      });
    }
  }

  public handleButton = (type: string) => {
    if (
      type === "incr" &&
      this.state.progress !== this.state.data.data.length - 1
    ) {
      this.setState({
        ...this.state,
        progress: this.state.progress + 1,
        fractionCompleted:
          this.state.fractionCompleted + 100 / this.state.data.data.length
      });
    } else if (type === "decr" && this.state.progress === 1) {
      this.setState({
        ...this.state,
        progress: 0,
        fractionCompleted: 0
      });
    } else if (type === "decr" && this.state.progress !== 0) {
      {
        this.setState({
          ...this.state,
          progress: this.state.progress - 1,
          fractionCompleted:
            this.state.fractionCompleted - 100 / this.state.data.data.length
        });
      }
    }
  };

  public handlePastForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ currentPastForm: event.target.value });
  };
  public handlePerfectForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ currentPerfectForm: event.target.value });
  };

  public handleRightArrow = (event: any) => {
    if (event.keyCode === 39) {
      this.setState({
        ...this.state,
        progress: this.state.progress + 1,
        fractionCompleted:
          this.state.fractionCompleted + 100 / this.state.data.data.length
      });
    }
  };
  public handleLeftArrow = (event: any) => {
    if (event.keyCode === 37 && this.state.progress !== 0) {
      this.setState({
        ...this.state,
        progress: this.state.progress - 1,
        fractionCompleted:
          this.state.fractionCompleted - 100 / this.state.data.data.length
      });
    }
  };

  public render() {
    console.log(this.state.progress);
    const { data } = this.state.data;
    return (
      <React.Fragment>
        <Title color={"#7FDBFF"}>Irreg.io</Title>
        <div>Progress: {this.state.progress}</div>
        <div>Infinitive: {data[this.state.progress].infinitive}</div>
        <div>Past form: {data[this.state.progress].pastTense}</div>
        <div>Perfect form: {data[this.state.progress].presentPerfect}</div>
        <div>
          Russian translation: {data[this.state.progress].translationRus}
        </div>
        <div>
          English translation: {data[this.state.progress].translationEn}
        </div>
        <div>Frequency: {data[this.state.progress].frequency}</div>
        <div>Fraction completed: {this.state.fractionCompleted}</div>
        <Button label="Next" clicked={() => this.handleButton("incr")} />
        <Button label="Previous" clicked={() => this.handleButton("decr")} />
        <input
          ref={refOne => (this.refOne = refOne as HTMLInputElement)}
          onChange={this.handlePastForm}
          type="text"
          value={this.state.currentPastForm}
          placeholder="past tense"
        />
        <input
          ref={refTwo => (this.refTwo = refTwo as HTMLInputElement)}
          onChange={this.handlePerfectForm}
          type="text"
          value={this.state.currentPerfectForm}
          placeholder="perfect tense"
        />
        <ProgressBar fractionCompleted={this.state.fractionCompleted} />
      </React.Fragment>
    );
  }
}

export default App;
