import * as React from "react";
import styled from "../../theme/styled-components";

import Congratulations from "../Congratulations/Congratulations";

import DifficultyLabel from "../DifficultyLabel/DifficultyLabel";

interface IProps {
  progress?: number;
  infinitive: string;
  pastTense?: string;
  presentPerfect?: string;
  translationRus?: string;
  translationEn?: string;
  frequency?: string;
  showTranslation: boolean;
  isCompleted: boolean;
  reset?: () => void;
  hintsTaken: number;
  filter?: string;
}

const StyledPractice = styled.div`
  display: flex;
  max-width: 400px;
  margin: auto;
  flex-direction: column;
  text-align: center;
  > div {
    padding: 2px;
    color: white;
  }
`;
const StyledInfinitive = styled.div`
  display: flex;
  align-items: center;
  font-size: 3rem;
  justify-content: center;
`;

const StyledTranslation = styled.div`
  position: relative;
  color: #f0f0f0;
  opacity: 0.4;
  font-size: 2rem;
  top: -13px;
`;
const StyledRedo = styled.button`
  margin: 20px auto 0 auto;
  width: 100px;
  text-align: center;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  padding: 10px;
  color: white;
  border: 1.5px solid #f0f0f0;
  border-radius: 20px;
  background: none;
  &:hover {
    background: white;
    color: #56ccf2;
    cursor: pointer;
  }
`;

class Learn extends React.Component<IProps> {
  public componentDidMount() {
    if (this.props.reset) {
      this.props.reset();
    }
  }

  public render() {
    const {
      infinitive,
      translationRus,
      translationEn,
      showTranslation,
      isCompleted,
      hintsTaken,
      filter,
      reset,
      frequency
    } = this.props;
    return (
      <StyledPractice>
        {isCompleted ? (
          <React.Fragment>
            <Congratulations hintsTaken={hintsTaken} filter={filter} />
            <StyledRedo onClick={reset}>redo</StyledRedo>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <StyledInfinitive>
              {infinitive}
              <DifficultyLabel frequency={frequency} />
            </StyledInfinitive>
            {showTranslation ? (
              <StyledTranslation>
                {translationEn}/{translationRus}
              </StyledTranslation>
            ) : null}

            {this.props.children}
          </React.Fragment>
        )}
      </StyledPractice>
    );
  }
}

export default Learn;
