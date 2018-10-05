import * as React from "react";
import styled from "../../theme/styled-components";

import Button from "../../ui/button/button";

const StyledPhrasalVerbs = styled.div`
  display: flex;
  margin: auto;
  color: white;
  font-size: 1.6rem;
  flex-direction: column;
  text-align: center;
  div {
    margin: 5px;
  }
  button {
    margin-right: 5px;
  }
`;
const StyledOption = styled.div`
  color: #bada55;
  margin: 5px;
  padding: 5px;
  border: 1px solid palevioletred;
  text-align: center;
`;

import phrasalVerbs from "../data/phrasalVerbs";

interface IState {
  pVerbs: any;
  progress: number;
  answerOptions: any[];
}

class PhrasalVerbs extends React.Component<{}, IState> {
  public state: IState = {
    pVerbs: phrasalVerbs,
    progress: 0,
    answerOptions: []
  };

  public componentDidMount() {
    this.prepareAnswerOptions();
  }

  public handleButton = (type: string) => {
    if (type === "incr") {
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
    const { pVerbs, progress } = this.state;
    return (
      <StyledPhrasalVerbs>
        <div>
          {pVerbs.data[progress].pVerb}-{pVerbs.data[progress].meaning}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button label="previous" clicked={() => this.handleButton("decr")} />
          <Button label="next" clicked={() => this.handleButton("incr")} />
        </div>
        <div>{pVerbs.data[progress].pVerb}</div>
        <StyledOption>
          {this.state.answerOptions.length
            ? this.state.answerOptions[progress][0].meaning
            : null}
        </StyledOption>
        <StyledOption>
          {this.state.answerOptions.length
            ? this.state.answerOptions[progress][1].meaning
            : null}
        </StyledOption>
        <StyledOption>
          {this.state.answerOptions.length
            ? this.state.answerOptions[progress][2].meaning
            : null}
        </StyledOption>
      </StyledPhrasalVerbs>
    );
  }
}

export default PhrasalVerbs;
