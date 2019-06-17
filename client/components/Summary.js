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

  getCalories(){
    const calArray = [];

    let prevDate;
    for(let cal of this.props.diet){
      //If current object represents a new day
      if(cal.date !== prevDate){
        prevDate = cal.date;
        calArray.push(
          <div>
            <h4>Date: {cal.date}</h4>
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
          <h4>Date: {day.date}</h4>
          <p>Weight: {day.weight}</p>
        </div>
      )
    }

    return weightArray;
  }

  getExercises(){
    const exercisesArray = [];

    let prevDate;

    for(let exercise of this.props.exercises){
      //If current object represents a new day
      if(exercise.date !== prevDate){
        prevDate = exercise.date;
        exercisesArray.push(
          <div>
            <h3>Date: {exercise.date}</h3>
            <p>Exercise: {exercise.exercise} Reps: {exercise.reps}</p>
            <p>Cardio Time: {exercise.time}</p>
          </div>
        )
      } else {
        exercisesArray.push(
          <div>
            <p>Exercise: {exercise.exercise} Reps: {exercise.reps}</p>
            <p>Cardio Time: {exercise.time}</p>
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
        <h1></h1>
        <h3>Your Calorie Summaries By Day: </h3>
        {calorieSummary}
        <br/>
        <h3>Your Weight Progression By Day: </h3>
        {weightProgression}
        <br/>
        <h3>Your Daily Exercises Routine: </h3>
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



