import * as React from "react";

import styled from "../../theme/styled-components";

interface IProps {
  currentPastValue: string;
  currentPerfectValue: string;
  pastFormHint: string;
  perfectFormHint: string;
  refOne: React.Ref<HTMLInputElement>;
  refTwo: React.Ref<HTMLInputElement>;
  handlePastForm: React.ChangeEventHandler<HTMLInputElement>;
  handlePerfectForm: React.ChangeEventHandler<HTMLInputElement>;
  isCompleted?: boolean;
}

const StyledInputBlock = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px;
  input {
    margin: 5.5px;
    padding: 5px;
    border-radius: 25px;
    border: 0.1px solid #ccc;
    text-align: center;
    font-size: 2vh;
    color: rgba(94, 94, 94, 0.8);
  }
`;

class InputBlock extends React.Component<IProps> {
  public refTest: HTMLInputElement;

  public render() {
    const {
      currentPastValue,
      currentPerfectValue,
      pastFormHint,
      perfectFormHint,
      handlePastForm,
      handlePerfectForm,
      refOne,
      refTwo,
      isCompleted
    } = this.props;

    return (
      <StyledInputBlock>
        {!isCompleted ? (
          <React.Fragment>
            <input
              ref={refOne}
              value={currentPastValue}
              onChange={handlePastForm}
              type="text"
              placeholder={pastFormHint ? pastFormHint : ""}
              autoComplete="off"
              autoCapitalize="off"
            />
            <input
              ref={refTwo}
              value={currentPerfectValue}
              onChange={handlePerfectForm}
              type="text"
              placeholder={perfectFormHint ? perfectFormHint : ""}
              autoComplete="off"
              autoCapitalize="off"
            />
          </React.Fragment>
        ) : null}
      </StyledInputBlock>
    );
  }
}

export default InputBlock;
