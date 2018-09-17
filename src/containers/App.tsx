import * as React from "react";
import styled from "../theme/styled-components";
import de from "./data";

import ProgressBar from "../components/ProgressBar/ProgressBar";
import Button from "../ui/button/button";

interface IState {
  verbs?: object;
  filter?: string;
  filteredVerbs?: object;
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
    verbs: de,
    filter: "",
    filteredVerbs: de.data,
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
      this.state.filteredVerbs[this.state.progress].pastTense
    ) {
      this.refTwo.focus();
    }
    if (
      this.state.currentPerfectForm ===
      this.state.filteredVerbs[this.state.progress].presentPerfect
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
      this.state.progress !== this.state.filteredVerbs.length - 2 &&
      this.state.fractionCompleted !== 100
    ) {
      this.setState({
        ...this.state,
        progress: this.state.progress + 1,
        fractionCompleted:
          this.state.fractionCompleted + 100 / this.state.filteredVerbs.length
      });
    } else if (
      type === "incr" &&
      this.state.progress === this.state.filteredVerbs.length - 2
    ) {
      this.setState({
        ...this.state,
        progress: this.state.progress + 1,
        fractionCompleted:
          this.state.fractionCompleted +
          (100 / this.state.filteredVerbs.length) * 2
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
            this.state.fractionCompleted - 100 / this.state.filteredVerbs.length
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
    if (
      event.keyCode === 39 &&
      this.state.progress === this.state.filteredVerbs.length - 1
    ) {
      this.setState({
        ...this.state,
        progress: this.state.filteredVerbs.length - 1,
        fractionCompleted: 100
      });
    } else if (
      event.keyCode === 39 &&
      this.state.progress !== this.state.filteredVerbs.length - 1
    ) {
      this.setState({
        ...this.state,
        progress: this.state.progress + 1,
        fractionCompleted:
          this.state.fractionCompleted + 100 / this.state.filteredVerbs.length
      });
    }
  };
  public handleLeftArrow = (event: any) => {
    if (event.keyCode === 37 && this.state.progress === 1) {
      this.setState({
        ...this.state,
        progress: 0,
        fractionCompleted: 0
      });
    } else if (event.keyCode === 37 && this.state.progress !== 0) {
      this.setState({
        ...this.state,
        progress: this.state.progress - 1,
        fractionCompleted:
          this.state.fractionCompleted - 100 / this.state.filteredVerbs.length
      });
    }
  };
  public handleFilter = (f: string, frequency?: string) => {
    this.setState({
      ...this.state,
      filter: f,
      filteredVerbs:
        f === "all"
          ? de.data
          : de.data.filter(entry => entry.frequency === `${frequency}`),
      progress: 0,
      fractionCompleted: 0
    });
  };

  public render() {
    const { filteredVerbs } = this.state;
    return (
      <React.Fragment>
        <Title color={"#7FDBFF"}>Irreg.io</Title>
        <div>Progress: {this.state.progress}</div>
        <div>Infinitive: {filteredVerbs[this.state.progress].infinitive}</div>
        <div>Past form: {filteredVerbs[this.state.progress].pastTense}</div>
        <div>
          Perfect form: {filteredVerbs[this.state.progress].presentPerfect}
        </div>
        <div>
          Russian translation:{" "}
          {filteredVerbs[this.state.progress].translationRus}
        </div>
        <div>
          English translation:{" "}
          {filteredVerbs[this.state.progress].translationEn}
        </div>
        <div>Frequency: {filteredVerbs[this.state.progress].frequency}</div>
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
        <Button
          label="Hard"
          clicked={() => this.handleFilter("hard", "infrequent")}
        />
        <Button
          label="Easy"
          clicked={() => this.handleFilter("easy", "frequent")}
        />
        <Button label="All" clicked={() => this.handleFilter("all")} />
      </React.Fragment>
    );
  }
}

export default App;
