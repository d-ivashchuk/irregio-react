import * as React from "react";

// import styled from "../../theme/styled-components";

class InputBlock extends React.Component<{}> {
  public refTest: HTMLInputElement;

  public render() {
    // const {
    //   currentPastForm,
    //   currentPerfectForm,
    //   pastFormHint,
    //   perfectFormHint,
    //   handlePastForm,
    //   handlePerfectForm,
    //   refTest,
    //   refTwo
    // } = this.props;

    return (
      <input
        type="text"
        ref={refTest => (this.refTest = refTest as HTMLInputElement)}
      />
    );
  }
}

export default InputBlock;
