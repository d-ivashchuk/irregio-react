import * as React from "react";
import { NavLink } from "react-router-dom";
import styled from "../../theme/styled-components";

import Icon from "../icon/icon";

const StyledNavi = styled.div`
  display: flex;
  align-items: center;
  background: white;
  justify-content: flex-start;
  a {
    text-decoration: none;
    margin: 5px;
    color: #ccc;
    font-weight: 700;
    font-size: 1.2em;
    transition: all 0.3s, opacity 0.3s;
    &:hover {
      color: #343637;
      opacity: 0.8;
      transition: all 0.3s, opacity 0.3s;
    }
  }
  .active {
    color: #343637;
    opacity: 0.8;
    transition: all 0.3s, opacity 0.3s;
  }
`;

const Navi: React.StatelessComponent = props => (
  <StyledNavi>
    <NavLink to="/home">
      <Icon height="65px" width="65px" />
    </NavLink>
    <div>
      <NavLink to="/learn">Learn</NavLink>
      <NavLink to="/practice">Practice</NavLink>
    </div>
  </StyledNavi>
);

export default Navi;
