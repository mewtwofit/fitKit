import React, { Component } from "react";
import PastDayExercises from './PastDayExercises';

export default class Exercise extends Component {
  render() {
    return (
      // <form>
      //   <div className="form">
      //     <label>
      //       <input
      //         type="radio"
      //         name="radio"
      //         value="cardio"
      //         checked={true}
      //         className="form-check-input"
      //       />
      //       Option 1
      //     </label>

      //   </div>
      // </form>
      <div>
        <form>
          <label> Name of Exercise </label>
            <input type='text' />
          <label> Type of Exercise </label>
            <input type="text" />
        </form>
        <button>Add New Exercise</button>
        <p> Calories Burnt: </p>
        <PastDayExercises />
      </div>
    );
  }
}
