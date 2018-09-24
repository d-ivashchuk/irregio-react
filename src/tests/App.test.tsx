import App from "../containers/App/App";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { shallow } from "enzyme";
import * as renderer from "react-test-renderer";

import Controls from "../components/Controls/Controls";

import Navigation from "../ui/navi/navigation";
import { MemoryRouter } from "react-router";

import Practice from "../components/Practice/Practice";
import ProgressBar from "../components/ProgressBar/ProgressBar";

import Title from "../components/Title/Title";

describe("App container", () => {
  const wrapper = shallow(<App />);
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("has correct starting state", () => {
    expect(wrapper.state("isCompleted")).toBe(false);
    expect(wrapper.state("progress")).toBe(0);
    expect(wrapper.state("fractionCompleted")).toBe(0);
  });
  it("has verbs to render", () => {
    expect(wrapper.state("filteredVerbs")).not.toHaveLength(0);
  });
  describe("methods", () => {
    const instance = wrapper.instance() as App;
    it("'next' method increases progress", () => {
      expect(wrapper.state("progress")).toBe(0);
      instance.handleButton("incr");
      expect(wrapper.state("progress")).toBe(1);
    });
    it("'previous' method decreases progress", () => {
      expect(wrapper.state("progress")).toBe(1);
      instance.handleButton("decr");
      expect(wrapper.state("progress")).toBe(0);
    });
    it("'toggleShowTranslation' method changes showTranslation state", () => {
      expect(wrapper.state("showTranslation")).toBe(true);
      instance.toggleShowTranslation();
      expect(wrapper.state("showTranslation")).toBe(false);
    });
    it("'handleShuffle' method returns new shuffled array instead of current", () => {
      const currentVerbs = wrapper.state("filteredVerbs");
      instance.handleShuffle();
      expect(wrapper.state("filteredVerbs")).not.toBe(currentVerbs);
    });
  });
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
  it("renders without crashing", () => {
    const wrapper = renderer
      .create(
        <MemoryRouter>
          <Navigation />
        </MemoryRouter>
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it("has length of 2", () => {
    const wrapper = shallow(<Navigation />);
    expect(wrapper.children()).toHaveLength(2);
  });
});

describe("Title component", () => {
  it("renders correct number of children", () => {
    const wrapper = shallow(<Title />);
    expect(wrapper.children()).toHaveLength(1);
  });
  it("matches snapshot", () => {
    const wrapper = renderer.create(<Title />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
describe("Controls component", () => {
  const app = shallow(<App />);
  const instance = app.instance() as App;
  it("matches snapshot", () => {
    const wrapper = renderer
      .create(
        <MemoryRouter>
          <Controls
            handleButton={(type: string) => instance.handleButton(type)}
            handleShuffle={() => instance.handleShuffle}
            handleFilter={(difficulty: string, frequency?: string) =>
              instance.handleFilter(difficulty, frequency)
            }
            handleHelp={() => instance.handleHelp}
            toggleTranslation={() => instance.toggleShowTranslation}
          />
        </MemoryRouter>
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
});
describe("Progress bar component", () => {
  const app = shallow(<App />);
  const instance = app.instance() as App;
  it("matches snapshot", () => {
    const wrapper = renderer
      .create(<ProgressBar fractionCompleted={0} />)
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });
  it("responds to increase of progress state", () => {
    const wrapper = shallow(
      <ProgressBar fractionCompleted={app.state("fractionCompleted")} />
    );
    expect(app.state("progress")).toBe(0);
    instance.handleButton("incr");
    expect(app.state("progress")).toBe(1);
    expect(app.state("fractionCompleted")).not.toBe(0);
    wrapper.setProps({ fractionCompleted: app.state("fractionCompleted") });
    expect(wrapper.props().fractionCompleted).not.toBe(0);
  });
  it("responds to decrease of progress state", () => {
    const wrapper = shallow(
      <ProgressBar fractionCompleted={app.state("fractionCompleted")} />
    );
    expect(app.state("progress")).toBe(1);
    instance.handleButton("decr");
    expect(app.state("progress")).toBe(0);
    expect(app.state("fractionCompleted")).toBe(0);
    wrapper.setProps({ fractionCompleted: app.state("fractionCompleted") });
    expect(wrapper.props().fractionCompleted).toBe(0);
  });
});
