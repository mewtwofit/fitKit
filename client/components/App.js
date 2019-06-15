import React, { Component } from "react";
import Profile from "./Profile";
import Exercise from "./Exercise";
import Diet from "./Diet";
import Summary from "./Summary";

export default class App extends Component {
  render() {
    return (
      <div>
        <Profile />
      </div>
    );
  }
}
