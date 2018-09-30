import * as React from "react";
import styled from "../../theme/styled-components";

interface IProps {
  frequency?: string;
}
interface IDifficultyLabelProps {
  frequency?: string;
}

const StyledDifficultyLabel = styled.div<IDifficultyLabelProps>`
  position: relative;
  top: 2px;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  padding: 8px;
  background: #fff;
  border: 1px solid #2f80ed;
  color: ${props => (props.frequency === "frequent" ? "#7CB342" : "#d32f2f")};
  text-align: center;
  font-size: 13px;
  font-weight: bold;
  margin-left: 5px;
`;

class DifficultyLabel extends React.Component<IProps, {}> {
  public render() {
    return (
      <StyledDifficultyLabel frequency={this.props.frequency}>
        {this.props.frequency === "frequent" ? "E" : "H"}
      </StyledDifficultyLabel>
    );
  }
}
export default DifficultyLabel;
