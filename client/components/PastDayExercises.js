import React, { Component } from "react";
import { render } from "react-dom";

export default class PastDayExercises extends Component {
  
  render() {
    // conditional rendering of component based on incoming props
    if(this.props.reps !== 0){
      return (
        <div>
          <h3>Day: {this.props.day}</h3>
          <p><span>Exercise: </span>{this.props.exercise}</p>
          <p><span>Reps: </span>{this.props.reps}</p>
          <p><span>Calories: </span>{this.props.calories}</p>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Day: {this.props.day}</h3>
          <p><span>Exercise: </span>{this.props.exercise}</p>
          <p><span>Time: </span>{this.props.time}</p>
          <p><span>Calories Burned: </span>{this.props.calories}</p>
        </div>
      );
    }
    
  }
}
