import * as React from "react";
import styled from "../../theme/styled-components";

const StyledTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 3rem;
  color: white;
  span {
    display: inline-block;
    transform: scale(-1, 1);
  }
`;

class Title extends React.Component<{}> {
  public render() {
    return (
      <StyledTitle>
        i<span>r</span>
        reg.io
      </StyledTitle>
    );
  }
}

export default Title;
