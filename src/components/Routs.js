import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Error from "./Error";
import Sign from "./Sign/Sign";
import Github from "./Github/Github";
import Comp404 from './404';
import LkCont from "./LK/LkCont";
import Materials from "./Materials/Materials";
import Projects from "./Materials/Projects";
import Otzyv from "./Materials/Otzyv";
import { withRouter } from "react-router";

class Routs extends Component {
  render() {
    return (
        <Switch>
            <Route exact path="/error" component={Error} />
            <Route exact path="/sign" component={Sign} />
            <Route exact path="/lk" component={LkCont} />
            <Route exact path="/github" component={Github} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/materials" component={Materials} />
            <Route exact path="/otzyv" component={Otzyv} />
            <Route path="/404" component={Comp404} />
            <Redirect exact from="/" to="/sign" />
            <Redirect from="*" to="/404" />
        </Switch>
    );
  }
}

const RoutsWithRouter = withRouter(Routs);
export default RoutsWithRouter;

