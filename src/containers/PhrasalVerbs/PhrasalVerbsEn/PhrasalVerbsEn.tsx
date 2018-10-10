import * as React from "react";
import styled from "../../../theme/styled-components";
import { keyframes } from "../../../theme/styled-components";
import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";

import ProgressBar from "../../../components/ProgressBar/ProgressBar";

import Button from "../../../ui/button/button";
import phrasalVerbs from "../../data/phrasalVerbsEn";

interface IOption {
  test?: boolean;
}

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
  font-size: 2.6rem;
`;
const shake = keyframes`
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  `;
const StyledOption = styled.div<IOption>`
  color: #f1f1f1;
  padding: 6px;
  font-size: 1.7rem;
  text-align: center;
  opacity: 0.6;
  transition: all 0.3s;
  &:hover {
    cursor: pointer;
    color: white;
    opacity: 1;
    transition: all 0.3s;
  }

  animation: ${props =>
    props.test
      ? `${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both`
      : null} 
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
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

const CurrentPVerbMeaning = styled.div`
  text-align: center;
  color: #f0f0f0;
  opacity: 0.4;
  font-size: 1.7rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

interface IState {
  pVerbs: any;
  progress: number;
  answerOptions: any[];
  fractionCompleted: number;
  mistakesCount: number;
  isCompleted: boolean;
  mistakeOne: boolean;
  mistakeTwo: boolean;
  mistakeThree: boolean;
}

type IProps = RouteComponentProps;

class PhrasalVerbs extends React.Component<IProps, IState> {
  public state: IState = {
    pVerbs: phrasalVerbs,
    progress: 0,
    answerOptions: [],
    fractionCompleted: 0,
    mistakesCount: 0,
    isCompleted: false,
    mistakeOne: false,
    mistakeTwo: false,
    mistakeThree: false
  };

  public refOne: HTMLDivElement;

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
      if (option === 0) {
        this.setState({
          mistakesCount: this.state.mistakesCount + 1,
          mistakeOne: true
        });
        setTimeout(() => {
          this.setState({ mistakeOne: false });
        }, 2000);
      } else if (option === 1) {
        this.setState({
          mistakesCount: this.state.mistakesCount + 1,
          mistakeTwo: true
        });
        setTimeout(() => {
          this.setState({ mistakeTwo: false });
        }, 2000);
      } else if (option === 2) {
        this.setState({
          mistakesCount: this.state.mistakesCount + 1,
          mistakeThree: true
        });
        setTimeout(() => {
          this.setState({ mistakeThree: false });
        }, 2000);
      }
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
      answerOptions: result,
      progress: 0,
      fractionCompleted: 0
    });
  };
  public handleShuffle = () => {
    const currentPVerbs = this.state.pVerbs.data;
    const shuffledPVerbs = currentPVerbs
      .map((a: any) => [Math.random(), a])
      .sort((a: any, b: any): any => a[0] - b[0])
      .map((a: any) => a[1]);
    this.setState(
      {
        pVerbs: { data: shuffledPVerbs }
      },
      () => {
        this.prepareAnswerOptions();
      }
    );
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
        <StyledOption
          test={this.state.mistakeOne}
          onClick={() => this.checkAnswer(0)}
        >
          {this.state.answerOptions.length
            ? this.state.answerOptions[progress][0].meaning
            : null}
        </StyledOption>
        <StyledOption
          test={this.state.mistakeTwo}
          onClick={() => this.checkAnswer(1)}
        >
          {this.state.answerOptions.length
            ? this.state.answerOptions[progress][1].meaning
            : null}
        </StyledOption>
        <StyledOption
          test={this.state.mistakeThree}
          onClick={() => this.checkAnswer(2)}
        >
          {this.state.answerOptions.length
            ? this.state.answerOptions[progress][2].meaning
            : null}
        </StyledOption>
        <ButtonContainer>
          <Button label="shuffle" clicked={() => this.handleShuffle()} />
        </ButtonContainer>
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
          <Button label="shuffle" clicked={() => this.handleShuffle()} />
          <Button label="next" clicked={() => this.handleButton("incr")} />
        </div>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <LinkContainer>
          <NavLink to="/phrasals/learn">Learn</NavLink>
          <NavLink to="/phrasals/practice" onClick={this.prepareAnswerOptions}>
            Practice
          </NavLink>
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
