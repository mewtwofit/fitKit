import React, { Component } from "react";
import { render } from "react-dom";

export default class PastDay extends Component {
  render() {
    return (
      <div>
        <h1> Yesterday </h1>
        <p> Bench Press </p>
        <p> 4 x 10 reps </p>
        <p> 215 lbs </p>
        <p> Calories Burnt: </p>
      </div>
    );
  }
}
