import * as React from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";

import Button from "../../ui/button/button";

type IProps = RouteComponentProps & {
  handleButton: (type: string) => void;
  handleShuffle: any;
  handleFilter: any;
  handleHelp: any;
  toggleTranslation: any;
};

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
        <Button clicked={() => handleButton("incr")} label="next" />
        <Button clicked={() => handleButton("decr")} label="previous" />
        <Button clicked={() => handleFilter("easy", "frequent")} label="Easy" />
        <Button
          clicked={() => handleFilter("hard", "infrequent")}
          label="Hard"
        />
        <Button clicked={() => handleFilter("all")} label="All" />
        <Button clicked={handleShuffle()} label="shuffle" />
        {location.pathname === "/practice" ? (
          <Button clicked={handleHelp()} label="help" />
        ) : null}
        <Button clicked={toggleTranslation()} label="Show translation" />
      </React.Fragment>
    );
  }
}

export default withRouter(Controls);
