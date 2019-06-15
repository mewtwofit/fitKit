import React, { Component } from 'react';


export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      weight: 0,
      height: 0
    }
    this.onWeightChange = this.onInputChange.bind(this);
    this.onHeightChange = this.onHeightChange.bind(this);
  }

  onWeightChange = (event) => {
    this.setState({weight:event.target.value});
  }
  onHeightChange = (event) => {
    this.setState({height:event.target.value});
  }
  render () {
    return (
      <div>
    
        <div>
          <label>Weight (lbs):</label>
          <input onChange = { (e) => this.onWeightChange(e) }type="text" />
        </div>
        
        <div>
          <label>Height (inches):</label>
          <input onChange = { (e) => this.onHeightChange(e) } type="text" />
        </div>
        <div>
          <button class = 'dropbtn'> Gender </button>
          <div class = 'dropdown-content'>
            <a>M</a>
            <a>F</a>
          </div>
        </div>
        <p> BMI: {this.state.weight*this.stage.height}</p>
        <button> New Date </button>
      </div>
    )
  }
}