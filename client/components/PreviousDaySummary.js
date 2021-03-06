import React, { Component } from 'react';

const PreviousDaySummary = (props) => {
    return (
      <div>
        <h3>Day: {props.day}</h3>
        <p><span>Age: </span>{props.age}</p>
        <p><span>Gender: </span>{props.gender}</p>
        <p><span>Weight: </span>{props.weight}</p>
        <p><span>BMI: </span>{props.bmi}</p>
        <p><span>BMR: </span>{props.bmr}</p>
        <p><span>Height: </span>{props.height}in</p>
      </div>
    );
};

export default PreviousDaySummary;