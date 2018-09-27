import * as React from "react";
import { NavLink } from "react-router-dom";
import styled from "../../theme/styled-components";

import de from "../../assets/de.svg";
import en from "../../assets/uk.svg";

import Icon from "../icon/icon";

interface IProps {
  language: string;
  toggleLanguage?: () => void;
}

const StyledNavi = styled.div`
  display: flex;
  align-items: center;
  background: white;
  justify-content: space-between;
  img {
    width: 45px;
    height: 45px;
    margin-right: 10px;
    &:hover {
      opacity: 0.8;
      cursor: pointer;
    }
  }
  a {
    text-decoration: none;
    margin: 5px;
    color: #ccc;
    font-weight: 700;
    font-size: 1em;
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

const Navi: React.StatelessComponent<IProps> = props => (
  <StyledNavi>
    <NavLink to="/">
      <Icon height="65px" width="65px" />
    </NavLink>
    <div>
      <NavLink to="/learn">Learn</NavLink>
      <NavLink to="/practice">Practice</NavLink>
      <NavLink to="/supported-languages">Languages</NavLink>
    </div>
    <div>
      {props.language === "de" ? (
        <img src={de} onClick={props.toggleLanguage} />
      ) : (
        <img src={en} onClick={props.toggleLanguage} />
      )}
    </div>
  </StyledNavi>
);

export default Navi;
