import { combineReducers, createStore } from "redux";
import { signInReducer } from './SingInReducer';

export const reducers = combineReducers({
    signin: signInReducer,
});

export const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

window.store = store;

export default store;