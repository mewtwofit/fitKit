import * as types from "../constants/actionsTypes";

export const addExercise = formData => ({
  type: types.ADD_EXERCISE,
  payload: formData
});

export const addFood = formData => dispatch => {
  fetch()
    .then()
    .then();
  return {
    type: types.ADD_FOOD,
    payload: formData
  };
};
/*
export const addFood = ( ? ) => {
  type: types.ADD_FOOD,
  payload: ?
}

export const addSummary ( ? ) => {
  type: types.ADD_SUMMARY,
  payload: ?
}

export const addDate ( ? ) => {
  type: types.ADD_DATE,
  payload: ?
}
*/
