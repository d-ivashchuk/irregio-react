import * as React from "react";
import styled from "../../theme/styled-components";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";

import ProgressBar from "../../components/ProgressBar/ProgressBar";

import Button from "../../ui/button/button";

const StyledPhrasalVerbs = styled.div`
  display: flex;
  margin: auto;
  color: white;
  font-size: 1.6rem;
  flex-direction: column;
  text-align: center;

  button {
    margin-right: 5px;
  }
  > div {
    margin-top: 5px;
  }
`;

const CurrentPVerb = styled.div`
  font-size: 3rem;
`;
const StyledOption = styled.div`
  color: #f1f1f1;
  padding: 6px;
  font-size: 1.7rem;
  text-align: center;

  &:hover {
    cursor: pointer;
    color: white;
  }
`;
const ProgressContainer = styled.div`
  margin: 10px auto 10px auto;
  width: 350px;
`;

const Congratulations = styled.div`
  max-width: 300px;
  margin: auto;
  font-size: 1.3rem;
  span {
    color: white;
  }
`;

const LinkContainer = styled.div`
  width: 300px;
  margin: 0 auto 0 auto;
  text-align: center;
  a {
    text-decoration: none;
    color: white;
    font-size: 1.4rem;
    margin-right: 5px;
    transition: all 0.3s, opacity 0.3s;
    &:hover {
      color: #ccc;
      transition: all 0.3s, opacity 0.3s;
    }
  }
  .active {
    color: #ccc;
    opacity: 0.8;
    transition: all 0.3s, opacity 0.3s;
  }
`;

const CurrentPVerbMeaning = styled.div`
  text-align: center;
  color: #e0e0e0;
  font-size: 1.7rem;
`;

import phrasalVerbs from "../data/phrasalVerbs";

interface IState {
  pVerbs: any;
  progress: number;
  answerOptions: any[];
  fractionCompleted: number;
  mistakesCount: number;
  isCompleted: boolean;
}

type IProps = RouteComponentProps;

class PhrasalVerbs extends React.Component<IProps, IState> {
  public state: IState = {
    pVerbs: phrasalVerbs,
    progress: 0,
    answerOptions: [],
    fractionCompleted: 0,
    mistakesCount: 0,
    isCompleted: false
  };

  public componentDidMount() {
    this.prepareAnswerOptions();
  }

  public checkAnswer = (option: number) => {
    if (
      this.state.answerOptions[this.state.progress][option].meaning ===
        this.state.pVerbs.data[this.state.progress].meaning &&
      this.state.progress !== this.state.pVerbs.data.length - 1
    ) {
      this.setState({
        ...this.state,
        progress: this.state.progress + 1,
        fractionCompleted:
          this.state.fractionCompleted + 100 / this.state.pVerbs.data.length
      });
    } else if (this.state.progress === this.state.pVerbs.data.length - 1) {
      this.setState({
        ...this.state,
        progress: this.state.pVerbs.data.length - 1,
        fractionCompleted: 100,
        isCompleted: true
      });
    } else {
      this.setState({
        ...this.state,
        mistakesCount: this.state.mistakesCount + 1
      });
    }
  };

  public handleButton = (type: string) => {
    if (
      type === "incr" &&
      this.state.progress !== this.state.pVerbs.data.length - 1
    ) {
      this.setState({
        ...this.state,
        progress: this.state.progress + 1
      });
    } else if (type === "decr" && this.state.progress !== 0) {
      if (this.state.progress === 1) {
        this.setState({
          ...this.state,
          progress: 0
        });
      }
      this.setState({
        ...this.state,
        progress: this.state.progress - 1
      });
    }
  };

  public prepareAnswerOptions = () => {
    const partialShuffle = (values: any[], count: number) => {
      for (let i = 0; i < count; i++) {
        const j = Math.floor(Math.random() * (values.length - i)) + i;
        [values[i], values[j]] = [values[j], values[i]];
      }
    };

    const randomTripleIncluding = (values: any, value: any) => {
      partialShuffle(values, 3);
      const triple = values.slice(0, 3);

      if (!triple.includes(value)) {
        triple[Math.floor(Math.random() * 3)] = value;
      }

      return triple;
    };
    const input = this.state.pVerbs.data;
    const scratchInput = input.slice();

    const result = input.map((n: any) =>
      randomTripleIncluding(scratchInput, n)
    );
    this.setState({
      answerOptions: result
    });
  };

  public render() {
    const {
      pVerbs,
      progress,
      fractionCompleted,
      isCompleted,
      mistakesCount
    } = this.state;
    const options = (
      <React.Fragment>
        <CurrentPVerb>{pVerbs.data[progress].pVerb}</CurrentPVerb>
        <ProgressContainer>
          <ProgressBar fractionCompleted={fractionCompleted} />
        </ProgressContainer>
        <StyledOption onClick={() => this.checkAnswer(0)}>
          {this.state.answerOptions.length
            ? this.state.answerOptions[progress][0].meaning
            : null}
        </StyledOption>
        <StyledOption onClick={() => this.checkAnswer(1)}>
          {this.state.answerOptions.length
            ? this.state.answerOptions[progress][1].meaning
            : null}
        </StyledOption>
        <StyledOption onClick={() => this.checkAnswer(2)}>
          {this.state.answerOptions.length
            ? this.state.answerOptions[progress][2].meaning
            : null}
        </StyledOption>
      </React.Fragment>
    );
    const practiceBlock = !isCompleted ? (
      options
    ) : (
      <Congratulations>
        Congratulations you have finished English phrasal verbs with{" "}
        <span>{mistakesCount}</span> mistakes
      </Congratulations>
    );
    const learnBlock = (
      <React.Fragment>
        {" "}
        <CurrentPVerb>{pVerbs.data[progress].pVerb}</CurrentPVerb>
        <CurrentPVerbMeaning>
          {pVerbs.data[progress].meaning}
        </CurrentPVerbMeaning>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px"
          }}
        >
          <Button label="previous" clicked={() => this.handleButton("decr")} />
          <Button label="next" clicked={() => this.handleButton("incr")} />
        </div>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <LinkContainer>
          <NavLink to="/phrasals/learn">Learn</NavLink>
          <NavLink to="/phrasals/practice">Practice</NavLink>
        </LinkContainer>
        <StyledPhrasalVerbs>
          {this.props.location.pathname === "/phrasals/practice"
            ? practiceBlock
            : null}
          {this.props.location.pathname === "/phrasals/learn"
            ? learnBlock
            : null}
        </StyledPhrasalVerbs>
      </React.Fragment>
    );
  }
}

export default withRouter(PhrasalVerbs);
