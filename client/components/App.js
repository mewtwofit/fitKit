import React, { Component } from "react";
import Profile from "./Profile";
import Exercise from "./Exercise";
import Diet from "./Diet";
import Summary from "./Summary";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Visualization from "./visualization";
import * as actions from "../actions/actions";


class App extends Component {
  componentDidMount() {
    fetch("http://localhost:5000/getDiet")
      .then(res => res.json())
      .then(previousFoodData => {
        for (let food of previousFoodData) {
          this.props.addFoodAsync(food);
        }
      });

    fetch("http://localhost:5000/getExercises")
      .then(res => res.json())
      .then(exercises => {
        for (let exercise of exercises) {
          this.props.addExerciseAsync(exercise);
        }
      });

    fetch("http://localhost:5000/getUser")
      .then(res => res.json())
      .then(summaries => {
        for (let summary of summaries) {
          this.props.addSummaryAsync(summary);
        }
      });
  }
  
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Profile</Link>
            </li>
            <li>
              <Link to="/exercise">Exercise</Link>
            </li>
            <li>
              <Link to="/diet">Diet</Link>
            </li>
            <li>
              <Link to="/summary">Summary</Link>
            </li>
            <li>
              <Link to="/visualization">Calorie Progression</Link>
            </li>
          </ul>
          <hr />

          <Route exact path="/" component={Profile} />
          <Route path="/exercise" component={Exercise} />
          <Route path="/diet" component={Diet} />
          <Route path="/summary" component={Summary} />
          <Route path="/visualization" component={Visualization} />
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addFoodAsync: foodData => dispatch(actions.addFoodAsync(foodData)),
  addExerciseAsync: exercise => dispatch(actions.addExerciseAsync(exercise)),
  addSummaryAsync: summary => dispatch(actions.addSummaryAsync(summary))
});

export default connect(
  null,
  mapDispatchToProps
)(App);
