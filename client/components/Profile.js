import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions.js";
import PreviousDaySummary from './PreviousDaySummary.js';

//Dear Iteration Group, this is some really hacky code. We were running out of time. Apologies.
//Please come to me for any questions regarding this component. 
class Profile extends Component {
  constructor() {
    super();

    this.state = {
      weight: 0,
      age: 0,
      gender: "",
      bmi: 0,
      bmr: 0,
      height: 0,
      date: ""
    };

    this.changeWeight.bind(this);
    this.changeAge.bind(this);
    this.changeHeight.bind(this);
    this.selectGender.bind(this);
    this.setBMRandBMIandDate.bind(this);
  };

  componentDidMount(){
    fetch('http://localhost:5000/getUser')
    .then(res => res.json())
    .then(summaries => {
      for(let summary of summaries){
        this.props.addSummaryAsync(summary);
      }
    });
  }

  changeWeight(e) {
    let weight = e.target.value;
    this.setState({
      weight
    });
  };

  changeAge(e) {
    let age = e.target.value;
    this.setState({
      age
    });
  };

  changeHeight(e) {
    let height = e.target.value;
    this.setState({
      height
    });
  };

  selectGender(e) {
    let gender = e.target.value;
    this.setState({
      gender
    });
  };

  setBMRandBMIandDate(e){
    e.preventDefault();
    let bmr = 0;
    if(this.state.gender === 'M'){
      bmr = Math.floor((4.536 * this.state.weight) + (15.88 * this.state.height) - (5 * this.state.age) + 5);
    } else if(this.state.gender === 'F'){
      bmr = Math.floor((4.536 * this.state.weight) + (15.88 * this.state.height) - (5 * this.state.age) - 161);
    }

    let bmi = Math.floor((this.state.weight * 703) / Math.pow(this.state.height, 2));

    this.setState({ 
      bmr,
      bmi,
      date: new Date().toISOString().slice(0,10)
    }, () => {
      //invoke action creator to send obj with state data to reducer
      this.props.addSummary({
        weight: this.state.weight,
        age: this.state.age,
        gender: this.state.gender,
        bmi: this.state.bmi,
        bmr: this.state.bmr,
        height: this.state.height,
        date: this.state.date
      })
    });
  };
  
  //onSubmit - calculate everything before calling action creator and dispatching
  render() {
    const dailyLog = [];
    //Adding content from redux store
    for(let i = 0; i < this.props.summaries.length; i++){
      dailyLog.push(
        <PreviousDaySummary 
          day={this.props.summaries[i].date}
          age={this.props.summaries[i].age}
          weight={this.props.summaries[i].weight}
          gender={this.props.summaries[i].gender}
          bmi={this.props.summaries[i].bmi}
          bmr={this.props.summaries[i].bmr}
          height={this.props.summaries[i].height}
        />
      );
    };  

    return (
      <div>
        <h1>Input User Info: </h1>
        <form onSubmit={e => this.setBMRandBMIandDate(e)}>
          <label>Age:</label>
          <input onChange={e => this.changeAge(e)} type="text" />
          <br />
          <label>Weight (lbs):</label>
          <input onChange={e => this.changeWeight(e)} type="number" />
          <br />
          <label>Height (inches):</label>
          <input onChange={e => this.changeHeight(e)} type="number" />
          <label>Gender: </label>
          <br />
          <select onChange={e => this.selectGender(e)} id="pet-select">
            <option>Select Your Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
          <br />
          <button type="submit">Submit</button>
        </form>
        <h3>Your Daily Stats: </h3>
        {dailyLog}
      </div>
    );
  };
};

const mapStateToProps = state => ({
  summaries: state.reducers.summaries
});

const mapDispatchToProps = dispatch => ({
  addSummary: summary => dispatch(actions.addSummary(summary)),
  addSummaryAsync: summary => dispatch(actions.addSummaryAsync(summary))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
