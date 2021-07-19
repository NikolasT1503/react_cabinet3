import { connect } from 'react-redux';
import SignIn from './SignIn';
import { updateLoginAC, updatePasswordAC } from '../../redux/SingInReducer';
import { withRouter } from "react-router";

const mapStateToProps = (state) => {
    /* console.log('mapStateToProps', state) */
    return {
        login: state.signin.login,
        password: state.signin.password,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateLogin: (login) => {dispatch(updateLoginAC(login))},
        updatePassword: (psw) => {dispatch(updatePasswordAC(psw))},
    }
}

const SignInCont = withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));

export default SignInCont;