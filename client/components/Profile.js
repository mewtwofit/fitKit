import React, { Component } from 'react';


export default class Profile extends Component {

  render () {
    return (
      <div>
    
        <form>
          <label> Enter Weight: </label>
          <input type="text" />
        </form>
        
        <form>
          <label> Enter Height: </label>
          <input type="text" />
        </form>
        <form>
          <button class = 'dropbtn'> Gender </label>
          <div class = 'dropdown-content'>
            <a>M</a>
            <a>F</a>
          </div>
        </form>
        <p> BMI: {}</p>
        <button> New Date </button>
      </div>
    )
  }
}