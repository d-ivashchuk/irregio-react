import * as React from "react";
import styled from "../../theme/styled-components";

interface IProps {
  progress?: number;
  infinitive: string;
  pastTense: string;
  presentPerfect: string;
  translationRus?: string;
  translationEn?: string;
  frequency?: string;
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
    color: white;
  }
`;

const StyledInfinitive = styled.div`
  font-size: 3rem;
`;

const StyledFormContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  div {
    margin-right: 10px;
  }
`;
const StyledForm = styled.div`
  position: relative;
  top: -15px;
  font-size: 2.5rem;
  justify-content: center;
  align-items: center;
  color: #f0f0f0;
  opacity: 0.7;
`;

const StyledTranslation = styled.div`
  position: relative;
  top: -25px;
  font-size: 2rem;
  justify-content: center;
  align-items: center;
  color: #f0f0f0;
  opacity: 0.4;
`;
class Learn extends React.Component<IProps> {
  public render() {
    const {
      infinitive,
      pastTense,
      presentPerfect,
      translationRus,
      translationEn,
      showTranslation,
      isCompleted
    } = this.props;
    return (
      <StyledLearn>
        <StyledInfinitive>{infinitive}</StyledInfinitive>
        <StyledFormContainer>
          <StyledForm>{pastTense}</StyledForm>
          <StyledForm>{presentPerfect}</StyledForm>
        </StyledFormContainer>

        {showTranslation ? (
          <StyledTranslation>
            {translationEn}/{translationRus}
          </StyledTranslation>
        ) : null}
        {isCompleted ? <h2>CONGRATS</h2> : null}
        {this.props.children}
      </StyledLearn>
    );
  }
}

export default Learn;
