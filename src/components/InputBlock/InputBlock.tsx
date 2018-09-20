import * as React from "react";

// import styled from "../../theme/styled-components";

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
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default InputBlock;
