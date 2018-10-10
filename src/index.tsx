import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./containers/App/App";
import { BrowserRouter } from "react-router-dom";

import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
