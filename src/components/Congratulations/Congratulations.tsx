import * as React from "react";
import styled from "../../theme/styled-components";

const StyledCongratulations = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.4rem;
  margin: auto;
  p {
    color: white;
  }
  i {
    color: #f0f0f0;
  }
`;
interface IProps {
  hintsTaken: number;
  filter?: string;
}

class Congratulations extends React.Component<IProps> {
  public render() {
    return (
      <StyledCongratulations>
        <p>Congratulations!</p>
        <p>
          You have completed <i>'{this.props.filter}'</i> category and used{" "}
          {this.props.hintsTaken} hints
        </p>
      </StyledCongratulations>
    );
  }
}

export default Congratulations;
