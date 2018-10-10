import * as React from "react";
import styled from "../../theme/styled-components";

import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";

import de from "../data/ge";
import en from "../data/en";

// import deIcon from "../../assets/de.svg";
// import enIcon from "../../assets/uk.svg";

import ProgressBar from "../../components/ProgressBar/ProgressBar";

import Controls from "../../components/Controls/Controls";
import InputBlock from "../../components/InputBlock/InputBlock";
import Learn from "../../components/Learn/Learn";
import Practice from "../../components/Practice/Practice";

const LinkContainer = styled.div`
  width: 300px;
  margin: 20px auto 0 auto;
  text-align: center;
  a {
    text-decoration: none;
    opacity: 0.5;
    color: white;
    font-size: 1.4rem;
    margin-right: 5px;
    transition: all 0.3s;
    &:hover {
      opacity: 1;
      transition: all 0.3s;
    }
  }
  .active {
    color: white;
    opacity: 1;
    transition: all 0.3s, opacity 0.3s;
  }
`;
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
type IProps = RouteComponentProps;

class IrregularVerbs extends React.Component<IProps, IState> {
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

  public componentDidMount() {
    if (
      this.props.location.pathname === "/verbs/en/learn" ||
      this.props.location.pathname === "/verbs/en/practice"
    ) {
      this.setState({
        filteredVerbs: en.data,
        language: "en",
        verbs: en
      });
    }
  }
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

    const learn = (
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
        >
          <Controls
            handleButton={(type: string) => this.handleButton(type)}
            handleShuffle={() => this.handleShuffle}
            handleFilter={(difficulty: string, frequency?: string) =>
              this.handleFilter(difficulty, frequency)
            }
            handleHelp={() => this.handleHelp}
            toggleTranslation={() => this.toggleShowTranslation}
            language={language}
          />
        </Learn>
      </React.Fragment>
    );
    const practice = (
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
            language={language}
          />
        </Practice>
      </React.Fragment>
    );
    return (
      <React.Fragment>
        <LinkContainer>
          <NavLink to={`/verbs/${language}/learn`}>Learn</NavLink>
          <NavLink to={`/verbs/${language}/practice`}>Practice</NavLink>
        </LinkContainer>

        {this.props.location.pathname === `/verbs/${language}/learn`
          ? learn
          : null}
        {this.props.location.pathname === `/verbs/${language}/practice`
          ? practice
          : null}
      </React.Fragment>
    );
  }
}

export default withRouter(IrregularVerbs);
