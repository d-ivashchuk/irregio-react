import * as React from "react";
import styled from "../../theme/styled-components";

interface IProgressProps {
  fractionCompleted: number;
}

const StyledProgressBar = styled.div<IProgressProps>`
  width: ${props => `${props.fractionCompleted}%`};
  height: 3px;
  border-radius: 4px;
  background-color: #76ff03;
  margin: auto;
  transition: all 0.3s;
  z-index: 999;
`;
const ProgressContainer = styled.div`
  margin: 10px auto 10px auto;
  width: 80%;
  height: 3px;
  border-radius: 4px;
  background-color: white;
`;

interface IProps {
  fractionCompleted: number;
}

class ProgressBar extends React.Component<IProps, {}> {
  public render() {
    return (
      <ProgressContainer>
        <StyledProgressBar fractionCompleted={this.props.fractionCompleted} />
      </ProgressContainer>
    );
  }
}
export default ProgressBar;
