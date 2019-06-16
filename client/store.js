import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers/index.js";
import thunk from "redux-thunk";
// import rootReducer from './reducers';
const store = createStore(
    reducers, 
    composeWithDevTools(applyMiddleware(thunk))
);

//store.dispatch()
export default store;
