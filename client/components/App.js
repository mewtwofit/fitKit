import React, { Component } from "react";
import Profile from "./Profile";
import Exercise from "./Exercise";
import PastDayExercises from "./PastDayExercises";
import PastDayFoods from "./PastDayFoods";
import Diet from "./Diet";
export default class App extends Component {
  render() {
    return (
      <div>
        <Profile />
        <Exercise />
        <PastDayExercises />
        <PastDayFoods />
        <Diet /> 
      </div>
    );
  }
}
