import { connect } from 'react-redux';
import SignUp from './SignUp';
import { 
    updateSurnameAC,
    updateFirstnameAC,
    updatePatrnameAC,
    updateBirthdayAC,
    updateGenderAC,
    updatePhoneAC,
    updateEmailAC,
 } from '../../redux/SignUpReducer';
import { withRouter } from "react-router";

const mapStateToProps = (state) => {
    /* console.log('mapStateToProps', state) */
    return {
        surname: state.signup.surname,
        firstname: state.signup.firstname,
        patrname: state.signup.patrname,
        birthday: state.signup.birthday,
        gender: state.signup.gender,
        phone: state.signup.phone,
        email: state.signup.email
    }
}

const mapDispatchToProps = (dispatch) => {
    return {    
        updateSurname: (surname) => {dispatch(updateSurnameAC(surname))},
        updateFirstname: (firstname) => {dispatch(updateFirstnameAC(firstname))},
        updatePatrname: (patrname) => {dispatch(updatePatrnameAC(patrname))},
        updateBirthday: (birthday) => {dispatch(updateBirthdayAC(birthday))},
        updateGender: (gender) => {dispatch(updateGenderAC(gender))},
        updatePhone: (phone) => {dispatch(updatePhoneAC(phone))},
        updateEmail: (email) => {dispatch(updateEmailAC(email))},        
    }
}

const SignUpCont = withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));

export default SignUpCont;