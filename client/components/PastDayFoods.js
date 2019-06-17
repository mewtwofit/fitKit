import React, { Component } from "react";

export default class PastDayFood extends Component {
  render() {
    return (
      <div>
        <h2>Date: {this.props.date}</h2>
        <p> FoodName: {this.props.foodName}</p>
        <p> Calories: {this.props.calories}</p>
      </div>
    );
  }
}
