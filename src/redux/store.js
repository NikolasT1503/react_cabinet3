import { combineReducers, createStore } from "redux";
import { signInReducer } from './SingInReducer';
import { signUpReducer } from './SignUpReducer';
import { lkReducer } from './LkReducer';
import { githubReducer } from './GithubReducer';

export const reducers = combineReducers({
    signin: signInReducer,
    signup: signUpReducer,
    lk: lkReducer,
    github: githubReducer
});

export const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

window.store = store;

export default store;