import * as React from "react";
import styled from "../../theme/styled-components";

import Congratulations from "../Congratulations/Congratulations";

interface IProps {
  progress?: number;
  infinitive: string;
  pastTense?: string;
  presentPerfect?: string;
  translationRus?: string;
  translationEn?: string;
  frequency: string;
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
  font-size: 3rem;
`;

const StyledTranslation = styled.div`
  position: relative;
  color: #f0f0f0;
  opacity: 0.4;
  font-size: 2rem;
  top: -15px;
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
      filter
    } = this.props;
    return (
      <StyledPractice>
        <StyledInfinitive>{infinitive}</StyledInfinitive>
        {showTranslation ? (
          <StyledTranslation>
            {translationEn}/{translationRus}
          </StyledTranslation>
        ) : null}
        {isCompleted ? (
          <Congratulations hintsTaken={hintsTaken} filter={filter} />
        ) : null}
        {this.props.children}
      </StyledPractice>
    );
  }
}

export default Learn;
