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
      toggleTranslation
    } = this.props;

    return (
      <React.Fragment>
        <Button clicked={() => handleButton("incr")} label="increment" />
        <Button clicked={() => handleButton("decr")} label="decrement" />
        <Button clicked={() => handleFilter("easy", "frequent")} label="Easy" />
        <Button
          clicked={() => handleFilter("hard", "infrequent")}
          label="Hard"
        />
        <Button clicked={() => handleFilter("all")} label="All" />
        <Button clicked={handleShuffle()} label="shuffle" />
        <Button clicked={handleHelp()} label="help" />
        <Button clicked={toggleTranslation()} label="Show translation" />
      </React.Fragment>
    );
  }
}

export default withRouter(Controls);
