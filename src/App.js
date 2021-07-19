import React from "react";
import { createBrowserHistory } from "history";
import "./App.css";
import "primereact/resources/themes/saga-green/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import Main from "./Main";
import { BrowserRouter } from "react-router-dom";

class App extends React.Component {
  history = createBrowserHistory({ forceRefresh: true });

  componentDidCatch(error, info) {
    console.log(error.message, info);
    this.history.push("/error");
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Main history={this.history} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
