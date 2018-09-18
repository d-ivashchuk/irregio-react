import * as React from "react";
import styled from "../../theme/styled-components";
import de from "../data/data";

import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Button from "../../ui/button/button";

interface IState {
  verbs?: object;
  filter?: string;
  filteredVerbs?: object;
  progress: number;
  fractionCompleted: number;
  isCompleted: boolean;
  hintsTaken: number;
  currentPerfectForm?: string;
  currentPastForm?: string;
  pastFormHint?: string;
  perfectFormHint?: string;
  showTranslation?: boolean;
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
    currentPerfectForm: "",
    pastFormHint: "",
    perfectFormHint: "",
    isCompleted: false,
    showTranslation: true
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
        this.state.filteredVerbs[this.state.progress].presentPerfect &&
      this.state.progress !== this.state.filteredVerbs.length - 1
    ) {
      this.refOne.focus();
      this.setState({
        currentPastForm: "",
        currentPerfectForm: "",
        progress: this.state.progress + 1,
        fractionCompleted:
          this.state.fractionCompleted + 100 / this.state.filteredVerbs.length,
        pastFormHint: "",
        perfectFormHint: ""
      });
    } else if (
      this.state.currentPerfectForm ===
        this.state.filteredVerbs[this.state.progress].presentPerfect &&
      this.state.progress === this.state.filteredVerbs.length - 1
    ) {
      this.setState({
        currentPastForm: "",
        currentPerfectForm: "",
        fractionCompleted: 100,
        isCompleted: true
      });
    }
  }
  public handlePastForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ currentPastForm: event.target.value });
  };
  public handlePerfectForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ currentPerfectForm: event.target.value });
  };

  public handleButton = (type: string) => {
    if (
      type === "incr" &&
      this.state.progress === this.state.filteredVerbs.length - 1
    ) {
      this.setState({
        ...this.state,
        progress: this.state.filteredVerbs.length - 1,
        fractionCompleted: 100
      });
    } else if (
      type === "incr" &&
      this.state.progress !== this.state.filteredVerbs.length - 1
    ) {
      this.setState({
        ...this.state,
        progress: this.state.progress + 1,
        fractionCompleted:
          this.state.fractionCompleted + 100 / this.state.filteredVerbs.length
      });
    }
    if (type === "decr" && this.state.progress === 1) {
      this.setState({
        ...this.state,
        progress: 0,
        fractionCompleted: 0
      });
    } else if (type === "decr" && this.state.progress !== 0) {
      this.setState({
        ...this.state,
        progress: this.state.progress - 1,
        fractionCompleted:
          this.state.fractionCompleted - 100 / this.state.filteredVerbs.length
      });
    }
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
  public handleShuffle = () => {
    const currentVerbs = this.state.filteredVerbs;
    const shuffledVerbs = currentVerbs
      .map(a => [Math.random(), a])
      .sort((a: any, b: any): any => a[0] - b[0])
      .map(a => a[1]);

    this.setState({
      filteredVerbs: shuffledVerbs,
      progress: 0,
      fractionCompleted: 0
    });
  };
  public handleHelp = () => {
    if (
      this.state.pastFormHint !==
      this.state.filteredVerbs[this.state.progress].pastTense
    ) {
      this.refOne.focus();
      this.setState({
        ...this.state,
        currentPastForm: "",
        hintsTaken: this.state.hintsTaken + 1,
        pastFormHint: this.state.filteredVerbs[this.state.progress].pastTense
      });
    } else if (
      this.state.currentPerfectForm !==
      this.state.filteredVerbs[this.state.progress].presentPerfect
    ) {
      this.state.currentPastForm ? this.refTwo.focus() : this.refOne.focus();
      this.setState({
        ...this.state,
        currentPerfectForm: "",
        hintsTaken: this.state.hintsTaken + 1,
        perfectFormHint: this.state.filteredVerbs[this.state.progress]
          .presentPerfect
      });
    }
  };
  public toggleShowTranslation = () => {
    this.setState({
      ...this.state,
      showTranslation: !this.state.showTranslation
    });
  };

  public render() {
    const {
      filteredVerbs,
      progress,
      currentPastForm,
      currentPerfectForm,
      pastFormHint,
      perfectFormHint,
      isCompleted,
      fractionCompleted,
      showTranslation
    } = this.state;
    return (
      <React.Fragment>
        <Title color={"#7FDBFF"}>Irreg.io</Title>
        <div>Progress: {progress}</div>
        <div>Infinitive: {filteredVerbs[progress].infinitive}</div>
        <div>Past form: {filteredVerbs[progress].pastTense}</div>
        <div>Perfect form: {filteredVerbs[progress].presentPerfect}</div>
        {showTranslation ? (
          <div>
            <div>
              Russian translation: {filteredVerbs[progress].translationRus}
            </div>
            <div>
              English translation: {filteredVerbs[progress].translationEn}
            </div>
          </div>
        ) : null}
        <div>Frequency: {filteredVerbs[progress].frequency}</div>
        <div>Fraction completed: {fractionCompleted}</div>
        <div>{isCompleted ? <h2>CONGRATS</h2> : null}</div>
        <ProgressBar fractionCompleted={this.state.fractionCompleted} />
        <input
          ref={refOne => (this.refOne = refOne as HTMLInputElement)}
          onChange={this.handlePastForm}
          type="text"
          value={currentPastForm}
          placeholder={pastFormHint ? pastFormHint : " "}
        />
        <input
          ref={refTwo => (this.refTwo = refTwo as HTMLInputElement)}
          onChange={this.handlePerfectForm}
          type="text"
          value={currentPerfectForm}
          placeholder={perfectFormHint ? perfectFormHint : " "}
        />
        <Button label="Next" clicked={() => this.handleButton("incr")} />
        <Button label="Previous" clicked={() => this.handleButton("decr")} />
        <Button
          label="Hard"
          clicked={() => this.handleFilter("hard", "infrequent")}
        />
        <Button
          label="Easy"
          clicked={() => this.handleFilter("easy", "frequent")}
        />
        <Button label="All" clicked={() => this.handleFilter("all")} />
        <Button label="Shuffle" clicked={() => this.handleShuffle()} />
        <Button label="Help" clicked={() => this.handleHelp()} />
        <Button
          label="Show translation"
          clicked={() => this.toggleShowTranslation()}
        />
      </React.Fragment>
    );
  }
}

export default App;
