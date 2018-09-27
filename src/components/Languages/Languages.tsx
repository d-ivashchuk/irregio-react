import * as React from "react";
import styled from "../../theme/styled-components";

import de from "../../assets/de.svg";
import uk from "../../assets/uk.svg";

const StyledLanguages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  h1 {
    color: white;
    text-align: center;
  }
  h3 {
    color: white;
    max-width: 400px;
    text-align: center;
    margin-top: 40px;
    color: #f0f0f0;
  }
  a {
    margin-top: 15px;
    width: 100px;
    text-align: center;
    text-decoration: none;
    font-weight: bold;
    padding: 10px;
    color: white;
    border: 1.5px solid #f0f0f0;
    border-radius: 20px;
    &:hover {
      background: white;
      color: #56ccf2;
    }
  }
`;
const IconContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 500px;
  margin-top: 20px;

  img {
    padding: 10px;
    width: 100px;
    height: 100px;
  }
`;

class Home extends React.Component<{}> {
  public render() {
    return (
      <StyledLanguages>
        <h1>Supported languages</h1>
        <IconContainer>
          <img src={de} />
          <img src={uk} />
        </IconContainer>
        <h3>Feel free to contact us if you want to request a new language</h3>
        <a href="mailto:dimitri.ivashchuk@m">Contact</a>
      </StyledLanguages>
    );
  }
}

export default Home;
