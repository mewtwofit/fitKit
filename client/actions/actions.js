import * as types from "../constants/actionsTypes";
// import thunk from 'redux-thunk';

//TO GROUP MEMBERS:
//IF YOU ARE MAKING THESE ACTION CREATORS: CHECK EXAMPLES OF REDUX THUNK AND MAKE SURE THEY GO
//TO THE APPROPRIATE SERVER ROUTES TO ADD DATA TO THE SERVER
export const addExerciseAsync = data => ({
  type: types.ADD_EXERCISE,
  payload: data,
});

export const addExercise = data => {
    // console.log('addexercise actions', data)
  return dispatch => {
    fetch('http://localhost:5000/addExercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      dispatch(addExerciseAsync(data));
    })
  }
}

// addExercise post /addExercise

//Incomplete needs to return object after successful add to database
export const addFood = formData => dispatch => {
  fetch()
    .then()
    .then();
    return {
      type: types.ADD_FOOD,
      payload: formData
    };
}; 

export const addSummaryAsync = data => {
  return {
    type: types.ADD_SUMMARY,
    payload: data
  }
}

export const addSummary = data => {
  return dispatch => {
    fetch('http://localhost:5000/addUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      dispatch(addSummaryAsync(data));
    })
  }
}

//not finished with action creators
