import React, { Component } from "react";
import Profile from "./Profile";
import Exercise from "./Exercise";
import Diet from "./Diet";
import Summary from "./Summary";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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
  </ul>

  <hr />

  <Route exact path="/" component={Profile} />
  <Route path="/exercise" component={Exercise} />
  <Route path="/diet" component={Diet} />
</div>
</Router>
    );
  }
}




{/* <div>
<Profile /> 
<Profile />
</div> */}




{/* <Router>
<div>

      <Link to="/">Profile</Link>

      <Link to="/exercise">Exercise</Link>

      <Link to="/diet">Diet</Link>


  <hr />

  <Route exact path="/" component={Profile} />
  <Route path="/exercise" component={Exercise} />
  <Route path="/diet" component={Diet} />
</div>
</Router> */}
// );
// }
// }