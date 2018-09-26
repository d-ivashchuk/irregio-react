import * as React from "react";
import icon from "../../assets/irregio.svg";

import styled from "../../theme/styled-components";

interface IProps {
  height?: string;
  width?: string;
}

const StyledIcon = styled.img`
  position: relative;
  height: ${props => (props.height ? props.height : null)};
  width: ${props => (props.width ? props.width : null)};
`;

const Icon: React.StatelessComponent<IProps> = props => (
  <StyledIcon src={icon} height={props.height} width={props.width} />
);

export default Icon;
