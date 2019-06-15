import { ADD_EXERCISE, ADD_FOOD, ADD_SUMMARY } from "../constants/actionsTypes";
// import * as action from actiontype

const initialState = {
  exercises: [],
  diet: [],
  summaries: [],
};

export const reducer = (state = initialState, action) => {
  let stateCopy;
  switch (action.type) {
    case ADD_EXERCISE:
      stateCopy = state.exercises.slice();
      stateCopy.push(action.payload);
      return {
        ...state,
        exercises: stateCopy
      };
    case ADD_FOOD:
      stateCopy = state.diet.slice();
      stateCopy.push(action.payload);
      return {
        ...state,
        diet: stateCopy
      };
    case ADD_SUMMARY:
      stateCopy = state.summaries.slice();
      stateCopy.push(action.payload);
      return {
        ...state,
        summaries: stateCopy
      };
    default:
      return { ...state };
  }
};
