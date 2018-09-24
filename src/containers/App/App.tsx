import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import de from "../data/data";

import { injectGlobal } from "../../theme/styled-components";

import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Navigation from "../../ui/navi/navigation";

import Controls from "../../components/Controls/Controls";
import InputBlock from "../../components/InputBlock/InputBlock";
import Learn from "../../components/Learn/Learn";
import Practice from "../../components/Practice/Practice";
import Title from "../../components/Title/Title";

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

injectGlobal`*{ 
  margin:0;
  padding:0;
}
  body{
  font-family: "brandon-grotesque", "Brandon Grotesque", "Source Sans Pro", "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;
  text-rendering: optimizeLegibility;
  
} `;

class App extends React.Component<{}, IState> {
  public refOne: null | HTMLInputElement;
  public refTwo: null | HTMLInputElement;

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

  // public componentDidMount() {
  //   document.addEventListener("keypress", this.handleRightArrow);
  //   document.addEventListener("keypress", this.handleLeftArrow);
  // }
  public componentDidUpdate() {
    if (
      this.state.currentPastForm ===
      this.state.filteredVerbs[this.state.progress].pastTense
    ) {
      if (this.refTwo) {
        this.refTwo.focus();
      }
    }
    if (
      this.state.currentPerfectForm ===
        this.state.filteredVerbs[this.state.progress].presentPerfect &&
      this.state.progress !== this.state.filteredVerbs.length - 1
    ) {
      if (this.refOne) {
        this.refOne.focus();
      }
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

  // public handleRightArrow = (event: any) => {
  //   if (
  //     event.keyCode === 39 &&
  //     this.state.progress === this.state.filteredVerbs.length - 1
  //   ) {
  //     this.setState({
  //       ...this.state,
  //       progress: this.state.filteredVerbs.length - 1,
  //       fractionCompleted: 100
  //     });
  //   } else if (
  //     event.keyCode === 39 &&
  //     this.state.progress !== this.state.filteredVerbs.length - 1
  //   ) {
  //     this.setState({
  //       ...this.state,
  //       progress: this.state.progress + 1,
  //       fractionCompleted:
  //         this.state.fractionCompleted + 100 / this.state.filteredVerbs.length
  //     });
  //   }
  // };
  // public handleLeftArrow = (event: any) => {
  //   if (event.keyCode === 37 && this.state.progress === 1) {
  //     this.setState({
  //       ...this.state,
  //       progress: 0,
  //       fractionCompleted: 0
  //     });
  //   } else if (event.keyCode === 37 && this.state.progress !== 0) {
  //     this.setState({
  //       ...this.state,
  //       progress: this.state.progress - 1,
  //       fractionCompleted:
  //         this.state.fractionCompleted - 100 / this.state.filteredVerbs.length
  //     });
  //   }
  // };
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
    if (this.state.isCompleted) {
      this.setState({
        ...this.state,
        isCompleted: false,
        progress: 0,
        fractionCompleted: 0
      });
    }
  };
  public handleHelp = () => {
    if (
      this.state.pastFormHint !==
      this.state.filteredVerbs[this.state.progress].pastTense
    ) {
      if (this.refOne) {
        this.refOne.focus();
      }
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
      if (this.refOne && this.refTwo) {
        this.state.currentPastForm ? this.refTwo.focus() : this.refOne.focus();
      }
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

    const currentVerb = filteredVerbs[progress];

    return (
      <BrowserRouter>
        <React.Fragment>
          <Title>Irreg.io</Title>
          <Navigation />
          <Route
            path="/learn"
            render={() => {
              return (
                <React.Fragment>
                  <Learn
                    isCompleted={isCompleted}
                    showTranslation={showTranslation}
                    frequency={currentVerb.frequency}
                    infinitive={currentVerb.infinitive}
                    pastTense={currentVerb.pastTense}
                    presentPerfect={currentVerb.presentPerfect}
                    translationEn={currentVerb.translationEn}
                    translationRus={currentVerb.translationRus}
                  />
                  <Controls
                    handleButton={(type: string) => this.handleButton(type)}
                    handleShuffle={() => this.handleShuffle}
                    handleFilter={(difficulty: string, frequency?: string) =>
                      this.handleFilter(difficulty, frequency)
                    }
                    handleHelp={() => this.handleHelp}
                    toggleTranslation={() => this.toggleShowTranslation}
                  />
                </React.Fragment>
              );
            }}
          />

          <Route
            path="/practice"
            render={() => {
              return (
                <React.Fragment>
                  <Practice
                    isCompleted={isCompleted}
                    showTranslation={showTranslation}
                    frequency={currentVerb.frequency}
                    infinitive={currentVerb.infinitive}
                    pastTense={currentVerb.pastTense}
                    presentPerfect={currentVerb.presentPerfect}
                    translationEn={currentVerb.translationEn}
                    translationRus={currentVerb.translationRus}
                  />
                  <InputBlock
                    refOne={refOne => (this.refOne = refOne)}
                    refTwo={refTwo => (this.refTwo = refTwo)}
                    pastFormHint={pastFormHint}
                    perfectFormHint={perfectFormHint}
                    currentPastValue={currentPastForm}
                    currentPerfectValue={currentPerfectForm}
                    handlePastForm={this.handlePastForm}
                    handlePerfectForm={this.handlePerfectForm}
                    isCompleted={isCompleted}
                  />
                  <ProgressBar fractionCompleted={fractionCompleted} />
                  <Controls
                    handleButton={(type: string) => this.handleButton(type)}
                    handleShuffle={() => this.handleShuffle}
                    handleFilter={(difficulty: string, frequency?: string) =>
                      this.handleFilter(difficulty, frequency)
                    }
                    handleHelp={() => this.handleHelp}
                    toggleTranslation={() => this.toggleShowTranslation}
                  />
                </React.Fragment>
              );
            }}
          />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
