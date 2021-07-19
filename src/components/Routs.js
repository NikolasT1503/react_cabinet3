import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Error from "./Error";
import Sign from "./Sign/Sign";
import Github from "./Github/Github";
import Comp404 from './404'; 
import { withRouter } from "react-router";

class Routs extends Component {
  render() {
    return (
        <Switch>
            <Route exact path="/error" component={Error} />
            <Route exact path="/sign" component={Sign} />
            <Route exact path="/github" component={Github} />
            <Route path="/404" component={Comp404} />
            <Redirect exact from="/" to="/sign" />
            <Redirect from="*" to="/404" />
        </Switch>
    );
  }
}

const RoutsWithRouter = withRouter(Routs);
export default RoutsWithRouter;

