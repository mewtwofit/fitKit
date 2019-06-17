import React, { Component } from "react";
import { connect } from "react-redux";

class Summary extends Component {
  constructor(){
    super();
    this.state = {
      calories: {}, //day as key: calories for value
      exercisesByDay: {}, //day as key: array of exercises for value
      weightByDay: {} //day as key: weight for value
    }
    this.getCalories.bind(this);
    this.getWeightProgression.bind(this);
    this.getExercises.bind(this);
  };

  // componentDidUpdate(){

  // }

  getCalories(){
    const calArray = [];

    let prevDate;

    for(let cal of this.props.calories){
      //If current object represents a new day
      if(cal.date !== prevDate){
        prevDate = cal.date;
        calArray.push(
          <div>
            <h3>Date: {cal.date}</h3>
            <p>Ate: {cal.food}  Calories: {cal.calories}</p>
          </div>
        )
      } else {
        calArray.push(
          <div>
            <p>Ate: {cal.food}  Calories: {cal.calories}</p>
          </div>
        )
      }
    }

    return calArray;
  };

  getWeightProgression(){
    const weightArray = [];

    for(let day of this.props.summaries){
      weightArray.push(
        <div>
          <h2>Date: {day.date}</h2>
          <h3>Weight: {day.weight}</h3>
        </div>
      )
    }

    return weightArray;
  }

  getExercises(){
    const exercisesArray = [];

    let prevDate;

    for(let exercise of this.props.exercises){
      let curExercise;
      //If a time value is present the user jogged
      if(exercise.time){
        curExercise = <p>Exercise: Running  Time: {cal.time}</p>
      } else {
        curExercise = <p>Exercise: {cal.exercise} Reps: {cal.reps}</p>
      }
      //If current object represents a new day
      if(exercise.date !== prevDate){
        prevDate = exercise.date;
        exercisesArray.push(
          <div>
            <h3>Date: {exercise.date}</h3>
            {curExercise}
          </div>
        )
      } else {
        exercisesArray.push(
          <div>
            {curExercise}
          </div>
        )
      }
    }
    
    return exercisesArray;
  }
  
  render () {
    const calorieSummary = this.getCalories();
    const weightProgression = this.getWeightProgression();
    const exerciseByDay = this.getExercises();

    return (
      <div>
        <h1>test</h1>
        <h2>Your Calorie Summaries By Day: </h2>
        {calorieSummary}
        <br/>
        <h2>Your Weight Progression By Day: </h2>
        {weightProgression}
        <br/>
        <h2>Your Daily Exercises Routine: </h2>
        {exerciseByDay}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  exercises: state.reducers.exercises,
  diet: state.reducers.diet,
  summaries: state.reducers.summaries
});

export default connect(
  mapStateToProps
)(Summary);
