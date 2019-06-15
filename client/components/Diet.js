import React, { Component } from "react";
import PastDayFoods from './PastDayFoods';
export default class Diet extends Component {
  render() {
    return (
      <div>
        <form>
          <label>Food Name</label>
          <input type="text" />
          <label>Calories </label>
          <input type="text" />
        </form>
        <button> Submit </button>
        <h1> Today </h1>
        <p> New Food </p>
        <p> Calories </p>
        <p> Name of Food </p>
        <PastDayFoods />
      </div>
    );
  }
}
