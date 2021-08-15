const UP_PROGRESS = "UP-PROGRESS";
const DOWN_PROGRESS = "DOWN-PROGRESS";

const initialState = {
    progress: 0,
};

export const progressReducer = (state = initialState, action) => {
  switch (action.type) {
    case UP_PROGRESS: {
        //console.log('signInReducer', action.login)
        let tmp_progress = state.progress + action.value
        return { ...state, progress: tmp_progress };
    }
    case DOWN_PROGRESS: {
        //console.log('signInReducer', action.psw)
        //let tmp_progress = state.progress - action.value
        return { ...state, progress: action.value };
    }
    default:
      return state;
  }
};

export const upProgressAC = (value) => {
  /* console.log('updateLoginAC', login) */
  return {type: UP_PROGRESS, value}
}
export const downProgressAC = (value) => ({type: DOWN_PROGRESS, value})
