import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import de from "../data/data";
import en from "../data/en";

import { injectGlobal } from "../../theme/styled-components";

import PhrasalVerbs from "../PhrasalVerbs/PhrasalVerbs";

import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Navigation from "../../ui/navi/navigation";

import Controls from "../../components/Controls/Controls";
import Home from "../../components/Home/Home";
import InputBlock from "../../components/InputBlock/InputBlock";
import Languages from "../../components/Languages/Languages";
import Layout from "../../ui/layout/layout";
import Learn from "../../components/Learn/Learn";
import Practice from "../../components/Practice/Practice";

interface IState {
  currentPastForm: string;
  currentPerfectForm: string;
  filter: string;
  filteredVerbs: object;
  fractionCompleted: number;
  hintsTaken: number;
  isCompleted: boolean;
  language?: string;
  pastFormHint: string;
  perfectFormHint: string;
  progress: number;
  showTranslation: boolean;
  verbs?: object;
}

injectGlobal`*{ 
  margin:0;
  padding:0;
}
  body{
  font-family: "brandon-grotesque", "Brandon Grotesque", "Source Sans Pro", "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;
  text-rendering: optimizeLegibility;
  background: #56ccf2; 
  background: -webkit-linear-gradient(to right, #56ccf2, #2f80ed); 
  background: linear-gradient(to right, #56ccf2, #2f80ed); 
  
} `;

class App extends React.Component<{}, IState> {
  public refOne: null | HTMLInputElement;
  public refTwo: null | HTMLInputElement;

  public state = {
    currentPastForm: "",
    currentPerfectForm: "",
    filter: "all verbs",
    filteredVerbs: de.data,
    fractionCompleted: 0,
    hintsTaken: 0,
    isCompleted: false,
    language: "de",
    pastFormHint: "",
    perfectFormHint: "",
    progress: 0,
    showTranslation: true,
    verbs: de
  };

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
  public handleFilter = (f: string, frequency?: string) => {
    this.setState({
      ...this.state,
      filter: f,
      filteredVerbs:
        f === "all"
          ? this.state.verbs.data
          : this.state.verbs.data.filter(
              entry => entry.frequency === `${frequency}`
            ),
      progress: 0,
      fractionCompleted: 0,
      hintsTaken: 0,
      pastFormHint: "",
      perfectFormHint: ""
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
      fractionCompleted: 0,
      hintsTaken: 0,
      pastFormHint: "",
      perfectFormHint: ""
    });
    if (this.state.isCompleted) {
      this.setState({
        ...this.state,
        isCompleted: false,
        progress: 0,
        fractionCompleted: 0,
        hintsTaken: 0,
        pastFormHint: "",
        perfectFormHint: ""
      });
    }
  };
  public handleHelp = () => {
    if (
      this.state.currentPastForm !==
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

  public toggleLanguage = () => {
    if (this.state.language === "de") {
      this.setState({
        ...this.state,
        filteredVerbs: en.data,
        language: "en",
        verbs: en,
        progress: 0,
        fractionCompleted: 0,
        hintsTaken: 0,
        isCompleted: false,
        pastFormHint: "",
        perfectFormHint: ""
      });
    } else if (this.state.language === "en") {
      this.setState({
        ...this.state,
        filteredVerbs: de.data,
        language: "de",
        verbs: de,
        progress: 0,
        fractionCompleted: 0,
        hintsTaken: 0,
        isCompleted: false,
        pastFormHint: "",
        perfectFormHint: ""
      });
    }
  };
  public resetProgress = () => {
    this.setState({
      ...this.state,
      progress: 0,
      fractionCompleted: 0,
      hintsTaken: 0,
      isCompleted: false,
      pastFormHint: "",
      perfectFormHint: ""
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
      showTranslation,
      hintsTaken,
      filter,
      language
    } = this.state;

    const currentVerb = filteredVerbs[progress];

    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <React.Fragment>
          <Navigation
            language={language}
            toggleLanguage={this.toggleLanguage}
          />
          <Route
            path="/supported-languages"
            render={() => {
              return (
                <Layout>
                  <Languages />
                </Layout>
              );
            }}
          />
          <Route
            exact={true}
            path="/"
            render={() => {
              return (
                <Layout>
                  <Home />
                </Layout>
              );
            }}
          />
          <Route
            path="/learn"
            render={() => {
              return (
                <Layout>
                  <Learn
                    isCompleted={isCompleted}
                    showTranslation={showTranslation}
                    frequency={currentVerb.frequency}
                    infinitive={currentVerb.infinitive}
                    pastTense={currentVerb.pastTense}
                    presentPerfect={currentVerb.presentPerfect}
                    translationEn={currentVerb.translationEn}
                    translationRus={currentVerb.translationRus}
                  >
                    <Controls
                      handleButton={(type: string) => this.handleButton(type)}
                      handleShuffle={() => this.handleShuffle}
                      handleFilter={(difficulty: string, frequency?: string) =>
                        this.handleFilter(difficulty, frequency)
                      }
                      handleHelp={() => this.handleHelp}
                      toggleTranslation={() => this.toggleShowTranslation}
                    />
                  </Learn>
                </Layout>
              );
            }}
          />

          <Route
            path="/practice"
            render={() => {
              return (
                <Layout>
                  <Practice
                    isCompleted={isCompleted}
                    showTranslation={showTranslation}
                    frequency={currentVerb.frequency}
                    infinitive={currentVerb.infinitive}
                    pastTense={currentVerb.pastTense}
                    presentPerfect={currentVerb.presentPerfect}
                    translationEn={currentVerb.translationEn}
                    translationRus={currentVerb.translationRus}
                    hintsTaken={hintsTaken}
                    filter={filter}
                    reset={this.resetProgress}
                  >
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
                  </Practice>
                </Layout>
              );
            }}
          />
          <Route
            path="/phrasals"
            render={() => {
              return (
                <Layout>
                  <PhrasalVerbs />
                </Layout>
              );
            }}
          />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
