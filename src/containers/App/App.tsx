import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navigation from "../../ui/navi/navigation";
import Layout from "../../ui/layout/layout";

import PhrasalVerbsEn from "../../containers/PhrasalVerbs/PhrasalVerbsEn/PhrasalVerbsEn";
import Languages from "../../components/Languages/Languages";
import Home from "../../components/Home/Home";

import IrregularVerbs from "../../containers/IrregularVerbs/IrregularVerbs";

import { injectGlobal } from "../../theme/styled-components";
import CourseList from "../../components/CoursesList/CoursesList";

injectGlobal`*{ 
  margin:0;
  padding:0;
}
  body{
  font-family: "brandon-grotesque", "Brandon Grotesque", "Source Sans Pro", "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;
  text-rendering: optimizeLegibility;
  background: #56ccf2; 
  background: -webkit-linear-gradient(to right, #56ccf2, #2f80ed); 
  background: linear-gradient(to right, #56ccf2, #2f80ed); 
  
} `;

class App extends React.Component<{}, {}> {
  public render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <React.Fragment>
          <Navigation language={"en"} />
          <Route
            path="/phrasals"
            render={() => {
              return (
                <Layout>
                  <PhrasalVerbsEn />
                </Layout>
              );
            }}
          />
          <Route
            path="/verbs"
            render={() => {
              return (
                <Layout>
                  <IrregularVerbs />
                </Layout>
              );
            }}
          />
          <Route
            path="/supported-languages"
            render={() => {
              return (
                <Layout>
                  <Languages />
                </Layout>
              );
            }}
          />
          <Route
            path="/"
            exact={true}
            render={() => {
              return (
                <Layout>
                  <Home />
                </Layout>
              );
            }}
          />
          <Route
            path="/courses"
            exact={true}
            render={() => {
              return <CourseList />;
            }}
          />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
