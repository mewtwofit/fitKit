import React, { Component } from "react";

export default class PastDayFood extends Component {
  render() {
    return (
      <div>
        <h3>Date: {this.props.date}</h3>
        <p> Food: {this.props.foodName}</p>
        <p> Calories: {this.props.calories}</p>
      </div>
    );
  }
}
