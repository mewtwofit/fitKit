import React, { Component } from "react";
import PastDayExercises from "./PastDayExercises";
import * as actions from "../actions/actions.js";
import { connect } from "react-redux";

// Possible TODO: / Known Issues:
// 1. some inputs throw POST errors, particularly related to time
// 2. date is not formatted properly
// 3. calories is just a random number
// 4. the set box maintains its input number if switching between formats
// 5. using class component with its own state, not sure if it should be passed down, but can refactor later
// final note:
// not sure where this will be rendered, but functionality works when rendered in App for most inputs

//
class Exercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      exercise: "",
      type: "",
      reps: 0,
      time: "",
      calories: 0
    };
    this.selectType.bind(this);
    this.setExercise.bind(this);
    this.changeExercise.bind(this);
    this.changeCalories.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/getExercises")
      .then(res => res.json())
      .then(exercises => {
        for(let exercise of exercises){
          this.props.addExerciseAsync(exercise);
        }
      });
  }

  selectType(e) {
    let type = e.target.value;
    this.setState({
      type
    });
    // console.log(type)
  }

  changeExercise(e) {
    let exercise = e.target.value;
    this.setState({
      exercise
    });
  }

  changeReps(e) {
    let reps = Number(e.target.value);
    this.setState({
      reps
    });
  }

  changeTime(e) {
    let time = e.target.value;
    this.setState({
      time
    });
  }

  changeCalories(e){
    let calories = e.target.value;
    this.setState({
      calories
    })
  }
  // date, exercise, reps, time, calories
  setExercise(e) {
    e.preventDefault();
    let time = this.state.time ? this.state.time : "00:00:00";
    
    this.setState({
      time,
      date: new Date().toISOString().slice(0, 10)
    },
    () => {
        this.props.addExercise({
          exercise: this.state.exercise,
          reps: this.state.reps,
          time: this.state.time,
          calories: this.state.calories,
          date: this.state.date
        });
      }
    );
  }

  render() {
    const dailyLog = [];

    for (let i = 0; i < this.props.exercises.length; i++) {
      dailyLog.push(
        <PastDayExercises
          day={this.props.exercises[i].date}
          exercise={this.props.exercises[i].exercise}
          reps={this.props.exercises[i].reps}
          time={this.props.exercises[i].time}
          calories={this.props.exercises[i].calories}
        />
      );
    }
    return (
      <div>
        <h2>Exercise Input: </h2>
        <form onSubmit={e => this.setExercise(e)}>
          <br />
          <label>Exercise: </label>
          <input onChange={e => this.changeExercise(e)} type="text" />
          <br />
          <select onChange={e => this.selectType(e)} id="pet-select">
            <option> Select type of workout</option>
            <option value="cardio">Cardio</option>
            <option value="strength">Strength</option>
          </select>
          <br />

          <br />
          {this.state.type === "cardio" ? (
            <div>
              <label> Time: </label>
              <input onChange={e => this.changeTime(e)} type="text" />
            </div>
          ) : this.state.type === "strength" ? (
            <div>
              <label> Reps: </label>
              <input onChange={e => this.changeReps(e)} type="number" />
            </div>
          ) : null}
          <br />
          <label> Calories Burned: </label>
          <input onChange={e => this.changeCalories(e)} type="number" />
          <br />
          <button type="submit">Submit</button>
        </form>

        {/*<p> Calories Burnt: {this.state.calories} </p>*/}
        <h3>Daily Exercise Log: </h3>
        {dailyLog}
      </div>
    );
  };
};

const mapStateToProps = state => ({
  exercises: state.reducers.exercises
});

const mapDispatchToProps = dispatch => ({
  addExercise: exercise => dispatch(actions.addExercise(exercise)),
  addExerciseAsync: exercise => dispatch(actions.addExerciseAsync(exercise))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exercise);
