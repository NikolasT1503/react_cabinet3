const UPDATE_LOGIN = "UPDATE-LOGIN";
const UPDATE_PASSWORD = "UPDATE-PASSWORD";
const SAVESIGNIN = "SAVESIGNIN";

const initialState = {
    login: "",
    password: "",
    saved: false,
};

export const signInReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOGIN: {
        //console.log('signInReducer', action.login)
        return { ...state, login: action.login };
    }
    case UPDATE_PASSWORD: {
        //console.log('signInReducer', action.psw)
        return { ...state, password: action.psw };
    }
    case SAVESIGNIN: {return {...state, saved: action.saved}}
    default:
      return state;
  }
};

export const updateLoginAC = (login) => {
  /* console.log('updateLoginAC', login) */
  return {type: UPDATE_LOGIN, login}
}
export const updatePasswordAC = (psw) => ({type: UPDATE_PASSWORD, psw})
export const saveSignInAC = (saved) => ({type: SAVESIGNIN, saved})
