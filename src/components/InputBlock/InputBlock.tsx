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
}

const StyledInputBlock = styled.div`
  display: flex;
  justify-content: center;
  input {
    margin: 5.5px;
    padding: 5px;
    border-radius: 15px;
    border: 1px solid #ccc;
    text-align: center;
    font-size: 2vh;
    color: #555;
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
      refTwo
    } = this.props;

    return (
      <StyledInputBlock>
        <input
          ref={refOne}
          value={currentPastValue}
          onChange={handlePastForm}
          type="text"
          placeholder={pastFormHint ? pastFormHint : ""}
        />
        <input
          ref={refTwo}
          value={currentPerfectValue}
          onChange={handlePerfectForm}
          type="text"
          placeholder={perfectFormHint ? perfectFormHint : ""}
        />
      </StyledInputBlock>
    );
  }
}

export default InputBlock;
