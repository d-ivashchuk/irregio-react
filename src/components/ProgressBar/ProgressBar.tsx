import * as React from "react";
import styled from "../../theme/styled-components";

interface IProgressProps {
  fractionCompleted: number;
}

const StyledProgressBar = styled.div<IProgressProps>`
  width: ${props => `${props.fractionCompleted}%`};
  height: 100%;
  background-color: #bada55;
  margin: auto;
  transition: all 0.3s;
`;

interface IProps {
  fractionCompleted: number;
}

class ProgressBar extends React.Component<IProps, {}> {
  public render() {
    return (
      <StyledProgressBar fractionCompleted={this.props.fractionCompleted}>
        {this.props.fractionCompleted}
      </StyledProgressBar>
    );
  }
}
export default ProgressBar;
