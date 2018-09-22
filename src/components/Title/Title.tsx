import * as React from "react";
import styled from "../../theme/styled-components";

const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 3rem;
  margin: auto;
  color: #10aded;
`;

class Title extends React.Component<{}> {
  public render() {
    return <StyledTitle>IRREG.IO</StyledTitle>;
  }
}

export default Title;
