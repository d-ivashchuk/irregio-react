import App from "../containers/App/App";

import * as React from "react";
import * as ReactDOM from "react-dom";

import Title from "../components/Title/Title";
// import Controls from "../components/Controls/Controls";

import { shallow } from "enzyme";

it("App renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
