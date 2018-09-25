import * as React from "react";
import styled from "../../theme/styled-components";

interface IButtonProps {
  color?: string;
  disabled?: boolean;
  type?: string;
  label: string;
  clicked?: any;
}

const StyledButton = styled.button`
  color: #777 !important;
  text-transform: uppercase;
  background: ${props => (props.color ? props.color : "white")};
  padding: 15px;
  border-radius: 5px;
  display: block;
  border: none;
  margin-top: 5px;
  cursor: pointer;
  transition: all 0.1s ease-in 0s;
  &:hover {
    color: white !important;
    background: #434343;
    letter-spacing: 1px;
    box-shadow: 5px 40px -10px rgba(0, 0, 0, 0.57);
    transition: all 0.1s ease-in 0s;
  }
  &:disabled {
    background-color: #ccc;
    color: #777;
    cursor: not-allowed;
  }
`;

const Button: React.StatelessComponent<IButtonProps> = props => (
  <StyledButton
    onClick={props.clicked}
    color={props.color}
    disabled={props.disabled}
    type={props.type}
  >
    {props.label}
  </StyledButton>
);

export default Button;
