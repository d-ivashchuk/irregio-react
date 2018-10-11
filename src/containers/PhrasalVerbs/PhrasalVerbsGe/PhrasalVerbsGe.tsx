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
  input {
    color: #ff937f;
    padding: 1px;
    border-radius: 5px;
    position: relative;
    width: 200px;
    border: none;
    height: 2rem;
    text-align: center;
    font-size: 30px;
  }
`;
const PrepositionOptionsContainer = styled.div`
  display: flex;
  button {
    padding: 5px;
    border: none;
    box-shadow: none;
  }
`;
const KasusOptionContainer = styled.div`
  display: flex;
  margin: 10px;
  button {
    padding: 5px;
    border: none;
    box-shadow: none;
  }
`;

const Kasus = styled.span`
  color: #ffd97f;
  input {
    font-size: 30px;
    color: #ffd97f;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    border: none;
    text-align: center;
  }
`;

const StyledTranslation = styled.div`
  color: #f0f0f0;
  opacity: 0.7;
`;

interface IState {
  pVerbs: any;
  progress: number;
  fractionCompleted: number;
  currentPreposition: string;
  currentKasus: string;
}

type IProps = RouteComponentProps;

class PhrasalVerbsGe extends React.Component<IProps, IState> {
  public state: IState = {
    pVerbs: germanPhrasalVerbs,
    progress: 0,
    fractionCompleted: 0,
    currentPreposition: "",
    currentKasus: ""
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
  public handlePreposition = (preposition: string) => {
    this.setState({ currentPreposition: preposition });
  };
  public handleKasus = (kasus: string) => {
    this.setState({ currentKasus: kasus });
  };
  public handleInputChange = (event: any, target: string) => {
    if (target === "preposition") {
      this.setState({ currentPreposition: event.target.value });
    } else if (target === "kasus") {
      this.setState({ currentKasus: event.target.value });
    }
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
    const practice = (
      <React.Fragment>
        <PhrasalVerb>
          <span>{pVerbs.data[progress].pVerb}</span>{" "}
          <Preposition>
            <input
              onChange={event => this.handleInputChange(event, "preposition")}
              type="text"
              value={this.state.currentPreposition}
            />
          </Preposition>{" "}
          <Kasus>
            <input
              onChange={event => this.handleInputChange(event, "kasus")}
              type="text"
              value={this.state.currentKasus}
            />
          </Kasus>
          <PrepositionOptionsContainer>
            <button onClick={() => this.handlePreposition("von")}>von</button>
            <button onClick={() => this.handlePreposition("über")}>über</button>
            <button onClick={() => this.handlePreposition("auf")}>auf</button>
            <button onClick={() => this.handlePreposition("aus")}>aus</button>
            <button onClick={() => this.handlePreposition("mit")}>mit</button>
            <button onClick={() => this.handlePreposition("an")}>an</button>
            <button onClick={() => this.handlePreposition("vor")}>vor</button>
            <button onClick={() => this.handlePreposition("bei")}>bei</button>
            <button onClick={() => this.handlePreposition("zu")}>zu</button>
            <button onClick={() => this.handlePreposition("gegen")}>
              gegen
            </button>
          </PrepositionOptionsContainer>
          <KasusOptionContainer>
            <button onClick={() => this.handleKasus("A")}>A</button>
            <button onClick={() => this.handleKasus("D")}>D</button>
            <button onClick={() => this.handleKasus("G")}>G</button>
          </KasusOptionContainer>
        </PhrasalVerb>
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
          {this.props.location.pathname === "/phrasals/ge/practice"
            ? practice
            : null}
        </StyledPhrasalVerbs>
      </React.Fragment>
    );
  }
}

export default withRouter(PhrasalVerbsGe);
