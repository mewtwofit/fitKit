<<<<<<< HEAD
import {createStore, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducers from './reducers/reducer';
import thunk from 'redux-thunk';
// import rootReducer from './reducers';
const store = createStore(
    reducers,
    composeWithDevTools();
);

//store.dispatch()
export default store;
=======
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers/reducer";
import thunk from "redux-thunk";
// import rootReducer from './reducers';
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

//store.dispatch()
export default store;
>>>>>>> f293bce8ac1482dab8041c6814ce7ac200d8c926
