import React, { Component } from "react";
import Profile from "./Profile";
import Exercise from "./Exercise";
import Diet from "./Diet";
import Summary from "./Summary";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Visualization from "./visualization";
export default class App extends Component {
  render() {
    return (
<Router>
<div>
  <ul>
    <li>
      <Link to="/">Profile</Link>
    </li>
    <li>
      <Link to="/exercise">Exercise</Link>
    </li>
    <li>
      <Link to="/diet">Diet</Link>
    </li>
    <li>
      <Link to="/visualization">Data</Link>
    </li>
  </ul>

  <hr />

  <Route exact path="/" component={Profile} />
  <Route path="/exercise" component={Exercise} />
  <Route path="/diet" component={Diet} />
  <Route path="/visualization" component={Visualization} />
</div>
</Router>

    );
  }
}
