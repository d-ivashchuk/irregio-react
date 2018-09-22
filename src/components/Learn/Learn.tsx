import * as React from "react";
import styled from "../../theme/styled-components";

interface IProps {
  progress?: number;
  infinitive: string;
  pastTense: string;
  presentPerfect: string;
  translationRus?: string;
  translationEn?: string;
  frequency: string;
  showTranslation: boolean;
  isCompleted: boolean;
}

const StyledLearn = styled.div`
  display: flex;
  max-width: 400px;
  margin: auto;
  flex-direction: column;
  text-align: center;
  > div {
    margin: 5px;
    padding: 2px;
    border: 1px solid #ccc;
    color: #333;
  }
`;

class Learn extends React.Component<IProps> {
  public render() {
    const {
      infinitive,
      pastTense,
      presentPerfect,
      translationRus,
      translationEn,
      frequency,
      showTranslation,
      isCompleted
    } = this.props;
    return (
      <StyledLearn>
        <div>Infinitive: {infinitive}</div>
        <div>Past form: {pastTense}</div>
        <div>Perfect form: {presentPerfect}</div>
        {showTranslation ? (
          <div>
            <div>Russian translation: {translationRus}</div>
            <div>English translation: {translationEn}</div>
          </div>
        ) : null}
        <div>Frequency: {frequency}</div>
        {isCompleted ? <h2>CONGRATS</h2> : null}
      </StyledLearn>
    );
  }
}

export default Learn;
