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
  handleLanguageChange: (lang: string) => void;
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
      handleLanguageChange,
      toggleTranslation,
      location
    } = this.props;

    return (
      <React.Fragment>
        {location.pathname === "/learn" ? (
          <StyledControlGroup>
            <Button clicked={() => handleButton("decr")} label="previous" />
            <Button clicked={() => handleButton("incr")} label="next" />
          </StyledControlGroup>
        ) : null}

        <StyledControlGroup>
          <Button
            clicked={() => handleFilter("easy", "frequent")}
            label="easy"
          />
          <Button
            clicked={() => handleFilter("hard", "infrequent")}
            label="hard"
          />
          <Button clicked={() => handleFilter("all")} label="all" />
        </StyledControlGroup>
        <StyledControlGroup>
          <Button clicked={handleShuffle()} label="shuffle" />
          {location.pathname === "/practice" ? (
            <Button clicked={handleHelp()} label="help" />
          ) : null}
          <Button clicked={toggleTranslation()} label="show translation" />
        </StyledControlGroup>
        <StyledControlGroup>
          <Button clicked={() => handleLanguageChange("en")} label="en" />
          <Button clicked={() => handleLanguageChange("de")} label="de" />
        </StyledControlGroup>
      </React.Fragment>
    );
  }
}

export default withRouter(Controls);
