import * as React from "react";

import styled from "../../theme/styled-components";

const StyledLayout = styled.div`
  position: absolute;
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
`;

const Layout: React.StatelessComponent = props => (
  <StyledLayout>{props.children}</StyledLayout>
);

export default Layout;
