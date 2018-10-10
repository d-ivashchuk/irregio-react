import * as React from "react";
import Button from "../../../ui/button/button";
import styled from "../../../theme/styled-components";

import { withRouter } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { NavLink } from "react-router-dom";

import germanPhrasalVerbs from "../../data/phrasalVerbsGe";

const StyledPhrasalVerbs = styled.div`
  display: flex;
  margin: auto;
  color: white;
  font-size: 1.6rem;
  flex-direction: column;
  text-align: center;
  button {
    margin-right: 5px;
  }
  > div {
    margin-top: 5px;
  }
`;

const PhrasalVerb = styled.div`
  font-size: 2rem;
  font-weight: 400;
`;
const LinkContainer = styled.div`
  width: 300px;
  margin: 20px auto 0 auto;
  text-align: center;
  a {
    text-decoration: none;
    opacity: 0.5;
    color: white;
    font-size: 1.4rem;
    margin-right: 5px;
    transition: all 0.3s;
    &:hover {
      opacity: 1;
      transition: all 0.3s;
    }
  }
  .active {
    color: white;
    opacity: 1;
    transition: all 0.3s, opacity 0.3s;
  }
`;

const Preposition = styled.span`
  color: #ff937f;
`;

const Kasus = styled.span`
  color: #ffd97f;
`;

const StyledTranslation = styled.div`
  color: #f0f0f0;
  opacity: 0.7;
`;

interface IState {
  pVerbs: any;
  progress: number;
  fractionCompleted: number;
}

type IProps = RouteComponentProps;

class PhrasalVerbsGe extends React.Component<IProps, IState> {
  public state: IState = {
    pVerbs: germanPhrasalVerbs,
    progress: 0,
    fractionCompleted: 0
  };

  public handleButton = (type: string) => {
    if (
      type === "incr" &&
      this.state.progress !== this.state.pVerbs.data.length - 1
    ) {
      this.setState({
        ...this.state,
        progress: this.state.progress + 1
      });
    } else if (type === "decr" && this.state.progress !== 0) {
      if (this.state.progress === 1) {
        this.setState({
          ...this.state,
          progress: 0
        });
      }
      this.setState({
        ...this.state,
        progress: this.state.progress - 1
      });
    }
  };
  public handleShuffle = () => {
    const currentPVerbs = this.state.pVerbs.data;
    const shuffledPVerbs = currentPVerbs
      .map((a: any) => [Math.random(), a])
      .sort((a: any, b: any): any => a[0] - b[0])
      .map((a: any) => a[1]);
    this.setState({
      pVerbs: { data: shuffledPVerbs }
    });
  };

  public render() {
    const { pVerbs, progress } = this.state;

    const learn = (
      <React.Fragment>
        <PhrasalVerb>
          <span>{pVerbs.data[progress].pVerb}</span>{" "}
          <Preposition>{pVerbs.data[progress].prae}</Preposition>{" "}
          <Kasus>{pVerbs.data[progress].kasus}</Kasus>
        </PhrasalVerb>
        <StyledTranslation>
          {pVerbs.data[progress].translationGe}
        </StyledTranslation>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px"
          }}
        >
          <Button label="previous" clicked={() => this.handleButton("decr")} />
          <Button label="shuffle" clicked={() => this.handleShuffle()} />
          <Button label="next" clicked={() => this.handleButton("incr")} />
        </div>
      </React.Fragment>
    );
    return (
      <React.Fragment>
        <LinkContainer>
          <NavLink to="/phrasals/ge/learn">Learn</NavLink>
          <NavLink to="/phrasals/ge/practice">Practice</NavLink>
        </LinkContainer>
        <StyledPhrasalVerbs>
          {this.props.location.pathname === "/phrasals/ge/learn" ? learn : null}
        </StyledPhrasalVerbs>
      </React.Fragment>
    );
  }
}

export default withRouter(PhrasalVerbsGe);
