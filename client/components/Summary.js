import React, { Component } from 'react';
import PreviousDaySummary from './PreviousDaySummary';

export default class Summary extends Component {

  render () {
    return (
      <div>
        <p> Today I ate: </p>
        <p> Exercises </p>
        <p> Diet </p>
        <p> Net Weight </p>
        <PreviousDaySummary />
      </div>
    )
  }
}