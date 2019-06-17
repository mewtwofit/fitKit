import React, { Component } from "react";
import { render } from "react-dom";

export default class PastDayExercises extends Component {
  
  render() {
    
    if(this.props.reps !== 0){
      // console.log('testing pastday time', this.props.time)
      return (
        <div>
          <h3>Day: {this.props.day}</h3>
          <p><span>Exercise: </span>{this.props.exercise}</p>
          <p><span>Reps: </span>{this.props.reps}</p>
          <p><span>Calories: </span>{this.props.calories}</p>
        </div>
      );
    } else {
      // console.log('testing pastday reps', this.props.time)
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
