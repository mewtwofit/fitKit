import React, { Component } from 'react';

export default class PreviousDaySummary extends Component {

  render () {
    return (
      <div>
        <p><span>Day: </span>{this.props.day}</p>
        <p><span>Age: </span>{this.props.age}</p>
        <p><span>Gender: </span>{this.props.gender}</p>
        <p><span>Weight: </span>{this.props.weight}</p>
        <p><span>BMI: </span>{this.props.bmi}</p>
        <p><span>BMR: </span>{this.props.bmr}</p>
        <p><span>Height: </span>{this.props.height}in</p>
      </div>
    );
  }
}