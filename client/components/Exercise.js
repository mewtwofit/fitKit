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
      sets: 0,
      reps: 0,
      time: "",
      calories: 0,
      previousExercises: []
    };
    this.selectType.bind(this);
    this.setExercise.bind(this);
    this.changeSets.bind(this);
    this.changeExercise.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:5000/getExercises")
      .then(res => res.json())
      .then(exercises => {
        // this.setState({
        //   previousExercises: exercises
        // });
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

  changeSets(e) {
    let sets = e.target.value;
    this.setState({
      sets,
      time: 0
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
      time,
      sets: 0
    });
  }
  // date, exercise, reps, time, calories
  setExercise(e) {
    e.preventDefault();
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
    }
    let calories = getRandomIntInclusive(50, 2000);
    // console.log('testing submit',this.state);
    this.setState(
      {
        calories: calories,
        date: new Date().toISOString().slice(0, 10)
      },
      () => {
        // console.log('did we get into set exeercise and call add exercise?')
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
    // console.log(this.state)
    const dailyLog = [];
    // let exercises = this.props.exercises;
    // for (let j = 0; j < this.state.previousExercises.length; j++) {
    //   // console.log(this.state.previousExercises[j])
    //   dailyLog.push(
    //     <PastDayExercises
    //       day={this.state.previousExercises[j].date}
    //       exercise={this.state.previousExercises[j].exercise}
    //       reps={this.state.previousExercises[j].reps}
    //       time={this.state.previousExercises[j].time}
    //       calories={this.state.previousExercises[j].calories}
    //     />
    //   );
    // }
    for (let i = 0; i < this.props.exercises.length; i++) {
      // console.log('testing', this.props.exercises)
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
              <label> Sets: </label>
              <input onChange={e => this.changeSets(e)} type="number" />
              <label> Reps: </label>
              <input onChange={e => this.changeReps(e)} type="number" />
              <label> Time: </label>
              <input onChange={e => this.changeTime(e)} type="text" />
            </div>
          ) : null}

          <button type="submit">Add New Exercise</button>
        </form>

        <p> Calories Burnt: {this.state.calories} </p>
        {dailyLog}
      </div>
    );
  }
}

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
