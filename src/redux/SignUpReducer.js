const UPDATE_SURNAME = "UPDATE-SURNAME";
const UPDATE_FIRSTNAME = "UPDATE-FIRSTNAME";
const UPDATE_PATRNAME = "UPDATE-PATRNAME";
const UPDATE_BIRTHDAY = "UPDATE-BIRTHDAY";
const UPDATE_GENDER = "UPDATE-GENDER";
const UPDATE_PHONE = "UPDATE-PHONE";
const UPDATE_EMAIL = "UPDATE-EMAIL";
const SAVESIGNUP = 'SAVESIGNUP';

const initialState = {
    surname: 'Иванов',
    firstname: 'Иван',
    patrname: 'Иванович',
    birthday: '15.03.1980',
    gender: 'MALE',
    phone: '+7 (983) 531-37-47',
    email: 'ivanov@mail.ru',
    saved: false,
};
    
export const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SURNAME: { return { ...state, surname: action.surname }}
    case UPDATE_FIRSTNAME: { return { ...state, firstname: action.firstname }}
    case UPDATE_PATRNAME: { return { ...state, patrname: action.patrname }}
    case UPDATE_BIRTHDAY: { return { ...state, birthday: action.birthday }}
    case UPDATE_GENDER: { return { ...state, gender: action.gender }}
    case UPDATE_PHONE: { return { ...state, phone: action.phone }}
    case UPDATE_EMAIL: { return { ...state, email: action.email }}
    case SAVESIGNUP: { return { ...state, saved: action.saved }}
    default: return state;
  }
};

export const updateSurnameAC = (surname) => ({type: UPDATE_SURNAME, surname})
export const updateFirstnameAC = (firstname) => ({type: UPDATE_FIRSTNAME, firstname})
export const updatePatrnameAC = (patrname) => ({type: UPDATE_PATRNAME, patrname})
export const updateBirthdayAC = (birthday) => ({type: UPDATE_BIRTHDAY, birthday})
export const updateGenderAC = (gender) => ({type: UPDATE_GENDER, gender})
export const updatePhoneAC = (phone) => ({type: UPDATE_PHONE, phone})
export const updateEmailAC = (email) => ({type: UPDATE_EMAIL, email})
export const saveSignUpAC = (saved) => ({type: SAVESIGNUP, saved})
