import * as actionTypes from "../constants/actionsTypes";
// import * as action from actiontype

const initialState = {
  exercises: [],
  diet: [],
  summaries: []
};

export const reducer = (state = initialState, action) => {
  let stateCopy;
  switch (action.type) {
    case actionTypes.ADD_EXERCISE:
      stateCopy = state.exercises.slice();
      stateCopy.unshift(action.payload);
      // console.log('testing state add exe', stateCopy)
      return {
        ...state,
        exercises: stateCopy
      };
    case actionTypes.ADD_FOOD:
      stateCopy = state.diet.slice();
      stateCopy.unshift(action.payload);
      return {
        ...state,
        diet: stateCopy
      };
    case actionTypes.ADD_SUMMARY:
      stateCopy = state.summaries.slice();
      stateCopy.unshift(action.payload);
      console.log(stateCopy);
      return {
        ...state,
        summaries: stateCopy
      };
    default:
      return { ...state };
  }
};
