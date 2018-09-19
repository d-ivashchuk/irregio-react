import * as React from "react";
// import styled from "../../theme/styled-components";

interface IProps {
  progress: number;
  infinitive: string;
  pastTense: string;
  presentPerfect: string;
  translationRus?: string;
  translationEn?: string;
  frequency: string;
  showTranslation: boolean;
  isCompleted: boolean;
}

class Learn extends React.Component<IProps> {
  public render() {
    const {
      progress,
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
      <React.Fragment>
        <div>Progress: {progress}</div>
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
        <div>{isCompleted ? <h2>CONGRATS</h2> : null}</div>
      </React.Fragment>
    );
  }
}

export default Learn;
