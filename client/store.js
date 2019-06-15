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