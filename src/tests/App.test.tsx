import App from "../containers/App/App";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { shallow } from "enzyme";

import Practice from "../components/Practice/Practice";

import Navigation from "../ui/navi/navigation";

it("App renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Practice component", () => {
  const obj = {
    infinitive: "gehen",
    translationRus: "идти",
    translationEn: "go",
    showTranslation: true,
    frequency: "frequent",
    isCompleted: false
  };
  const wrapper = shallow(
    <Practice
      infinitive={obj.infinitive}
      frequency={obj.frequency}
      translationEn={obj.translationEn}
      showTranslation={obj.showTranslation}
      isCompleted={obj.isCompleted}
    />
  );
  it("renders correct number of children", () => {
    expect(wrapper).toHaveLength(1);
    expect(wrapper.dive().children()).toHaveLength(3);
  });
  it("renders correct text", () => {
    expect(wrapper.childAt(0).text()).toBe(`Infinitive: ${obj.infinitive}`);
    expect(wrapper.childAt(2).text()).toBe(`Frequency: ${obj.frequency}`);
    expect(
      wrapper
        .childAt(1)
        .childAt(1)
        .text()
    ).toBe(`English translation: ${obj.translationEn}`);
  });
});
describe("Navigation component", () => {
  it("Has length of 2", () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper.children()).toHaveLength(2);
  });
});
