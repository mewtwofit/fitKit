import React, { Component } from "react";
import PastDayFoods from './PastDayFoods';
import * as actions from '../actions/actions';
import {connect} from 'react-redux';

//ask exactly what foodData is. is it the state?
class Diet extends Component {
  constructor() {
    super();

    this.state = {
      foodName: '',
      calories: 0,
      date: ""
    };

    this.onFoodChange = this.onFoodChange.bind(this);
    this.onCalorieChange = this.onCalorieChange.bind(this);
  };

  componentDidMount(){
    fetch('http://localhost:5000/getDiet')
    .then(res => res.json())
    .then(previousFoodData => {
      for (let food of previousFoodData){
        this.props.addFoodAsync(food);
      }
    });
  }

  onFoodChange (event) {
    console.log(event.target.value);
    this.setState({
      foodName:event.target.value
    });

  }
  onCalorieChange (event) {
    console.log(event.target.value);
    this.setState({
      calories: event.target.value
    });
  }
  onSubmit (event) {
    event.preventDefault();
    this.setState({
      date: new Date().toISOString().slice(0,10)
    }, () => {
      this.props.addFood({
        foodName:this.state.foodName,
        calories:this.state.calories,
        date:this.state.date
      });
    });
  }

 
  render() {
    const dailyLog = [];
    for (let i = 0; i < this.props.diet.length;i++){
      dailyLog.push(
        <PastDayFoods 
        foodName = {this.props.diet[i].foodName}
        calories = {this.props.diet[i].calories}
        date = {this.props.diet[i].date}
        />
      )
    }

    return (
      <div>
        <h2>Food Input: </h2>
        <form >
          <label>Food Name</label>
          <input onChange = {event => this.onFoodChange(event)} type="text" />
          <br />
          <label >Calories </label>
          <input onChange = {event => this.onCalorieChange(event)} type="text" />
          <br />
          <button onSubmit = {event=>this.onSubmit(event)}> Submit </button>
        </form>
        <h3>Daily Food Log: </h3>
        <div>{dailyLog}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  diet: state.reducers.diet
});

const mapDispatchToProps = dispatch => ({
  addFood: foodData => dispatch(actions.addFood(foodData)),
  addFoodAsync: foodData => dispatch(actions.addFoodAsync(foodData))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Diet);