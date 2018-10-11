import * as React from "react";
import Title from "../Title/Title";
import styled from "../../theme/styled-components";
import { NavLink } from "react-router-dom";

import Icon from "../../ui/icon/icon";

const StyledHome = styled.div`
  display: flex;
  margin: auto;
  padding-top: 100px;
  flex-direction: column;
  align-self: center;
`;
const StyledInfo = styled.p`
  max-width: 500px;
  padding: 15px;
  font-size: 1.4rem;
  text-align: center;
  color: #f0f0f0;
`;
const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  a {
    margin-right: 15px;
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
      transition: all 0.3s;
    }
  }
`;

class Home extends React.Component<{}> {
  public render() {
    return (
      <StyledHome>
        <Icon />
        <Title />
        <StyledInfo>
          Irreg.io is designed to help you with learning irregularities of
          foreign languages and mastering them with the help of powerful yet
          simple tool
        </StyledInfo>
        <LinkContainer>
          <NavLink to="/courses">Get started</NavLink>
        </LinkContainer>
      </StyledHome>
    );
  }
}

export default Home;
