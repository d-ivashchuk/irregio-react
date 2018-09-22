import * as React from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";

import styled from "../../theme/styled-components";

import Button from "../../ui/button/button";

type IProps = RouteComponentProps & {
  handleButton: (type: string) => void;
  handleShuffle: () => void;
  handleFilter: (f: string, type?: string) => void;
  handleHelp: () => void;
  toggleTranslation: () => void;
};

const StyledControlGroup = styled.div`
  display: flex;
  justify-content: center;
  button {
    margin: 5px;
  }
`;

class Controls extends React.Component<IProps, {}> {
  public render() {
    const {
      handleButton,
      handleShuffle,
      handleFilter,
      handleHelp,
      toggleTranslation,
      location
    } = this.props;

    return (
      <React.Fragment>
        <StyledControlGroup>
          <Button clicked={() => handleButton("decr")} label="previous" />
          <Button clicked={() => handleButton("incr")} label="next" />
        </StyledControlGroup>
        <StyledControlGroup>
          <Button
            clicked={() => handleFilter("easy", "frequent")}
            label="Easy"
          />
          <Button
            clicked={() => handleFilter("hard", "infrequent")}
            label="Hard"
          />
          <Button clicked={() => handleFilter("all")} label="All" />
        </StyledControlGroup>
        <StyledControlGroup>
          <Button clicked={handleShuffle()} label="shuffle" />
          {location.pathname === "/practice" ? (
            <Button clicked={handleHelp()} label="help" />
          ) : null}
          <Button clicked={toggleTranslation()} label="Show translation" />
        </StyledControlGroup>
      </React.Fragment>
    );
  }
}

export default withRouter(Controls);
