import React, { Component } from "react";
import Profile from "./Profile";
import Exercise from "./Exercise";
import Diet from "./Diet";
import Summary from "./Summary";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Visualization from "./visualization";
import * as actions from "../actions/actions";
import '../App.css';


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
          <div className = 'navnav'>
              <Link to="/" style={{textDecoration: 'none'}}>Profile</Link>
          </div>
              <Link to="/exercise" style={{textDecoration: 'none'}}> Exercise</Link>
           <div className = 'navnav'>
              <Link to="/diet" style={{textDecoration: 'none'}}>Diet</Link>
            </div>
              <Link to="/summary" style={{textDecoration: 'none'}}>Summary</Link>
            <div className = 'navnav'>
              <Link to="/visualization" style={{textDecoration: 'none'}}>Calorie Progression</Link>
            </div>
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
