import { connect } from 'react-redux';
import Lk from './Lk';
import { 
    updateFamChangedAC,
    updateFamPreviousAC,
    updateDocSeriesAC,
    updateDocNumberAC,
    updateDocDateAC,
    updateDocOrgAC,
    updateDocPodrAC,
    updateBirthdayPlaceAC,
    updateAddressRegAC,
    updateAddressFactAC,
    updateAddressEqualAC,
 } from '../../redux/LkReducer';
 import { 
    updateSurnameAC,
    updateFirstnameAC,
    updatePatrnameAC,
    updateBirthdayAC,
    updateGenderAC,
    updatePhoneAC,
    updateEmailAC,
 } from '../../redux/SignUpReducer';
/*  import {
    upProgressAC,
    downProgressAC
 } from '../../redux/ProgressReducer'; */
 
import { withRouter } from "react-router";

const mapStateToProps = (state) => {
    /* console.log('mapStateToProps', state) */
    return {
        famChanged: state.lk.famChanged,
        famPrevious: state.lk.famPrevious,
        docSeries: state.lk.docSeries,
        docNumber: state.lk.docNumber,
        docDate: state.lk.docDate,
        docOrg: state.lk.docOrg,
        docPodr: state.lk.docPodr,
        birthdayPlace: state.lk.birthdayPlace,
        addressReg: state.lk.addressReg,
        addressFact: state.lk.addressFact,
        addressEqual: state.lk.addressEqual,
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
        updateFamChanged: (famChanged) => {dispatch(updateFamChangedAC(famChanged))},
        updateFamPrevious: (famPrevious) => {dispatch(updateFamPreviousAC(famPrevious))},
        updateDocSeries: (docSeries) => {dispatch(updateDocSeriesAC(docSeries))},
        updateDocNumber: (docNumber) => {dispatch(updateDocNumberAC(docNumber))},
        updateDocDate: (docDate) => {dispatch(updateDocDateAC(docDate))},
        updateDocOrg: (docOrg) => {dispatch(updateDocOrgAC(docOrg))},
        updateDocPodr: (docPodr) => {dispatch(updateDocPodrAC(docPodr))},
        updateBirthdayPlace: (birthdayPlace) => {dispatch(updateBirthdayPlaceAC(birthdayPlace))},
        updateAddressReg: (addressReg) => {dispatch(updateAddressRegAC(addressReg))},
        updateAddressFact: (addressFact) => {dispatch(updateAddressFactAC(addressFact))},
        updateAddressEqual: (addressEqual) => {dispatch(updateAddressEqualAC(addressEqual))},
        updateSurname: (surname) => {dispatch(updateSurnameAC(surname))},
        updateFirstname: (firstname) => {dispatch(updateFirstnameAC(firstname))},
        updatePatrname: (patrname) => {dispatch(updatePatrnameAC(patrname))},
        updateBirthday: (birthday) => {dispatch(updateBirthdayAC(birthday))},
        updateGender: (gender) => {dispatch(updateGenderAC(gender))},
        updatePhone: (phone) => {dispatch(updatePhoneAC(phone))},
        updateEmail: (email) => {dispatch(updateEmailAC(email))},
    }
}

const LkCont = withRouter(connect(mapStateToProps, mapDispatchToProps)(Lk));

export default LkCont;