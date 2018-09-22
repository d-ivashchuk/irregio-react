import * as React from "react";
import { Link } from "react-router-dom";
import styled from "../../theme/styled-components";

const StyledNavi = styled.div`
  display: flex;
  justify-content: center;
  a {
    text-decoration: none;
    margin: 5px;
    font-weight: bold;
    font-size: 1.5rem;
    color: #333;
    &:hover {
      color: #777;
    }
  }
`;

const Navi: React.StatelessComponent = props => (
  <StyledNavi>
    <Link to="/learn">Learn</Link>
    <Link to="/practice">Practice</Link>
  </StyledNavi>
);

export default Navi;
