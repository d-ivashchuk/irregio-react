import * as React from "react";
import { NavLink } from "react-router-dom";
import styled from "../../theme/styled-components";

const StyledNavi = styled.div`
  display: flex;
  justify-content: center;
  a {
    text-decoration: none;
    margin: 5px;
    color: white;
    font-weight: 700;
    font-size: 1.5em;
    transition: all 0.3s, opacity 0.3s;
    &:hover {
      color: #444;
      opacity: 0.8;
      transition: all 0.3s, opacity 0.3s;
    }
  }
  .active {
    color: #444;
    opacity: 0.8;
    transition: all 0.3s, opacity 0.3s;
  }
`;

const Navi: React.StatelessComponent = props => (
  <StyledNavi>
    <NavLink to="/learn">Learn</NavLink>
    <NavLink to="/practice">Practice</NavLink>
  </StyledNavi>
);

export default Navi;
