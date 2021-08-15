import { connect } from 'react-redux';
import { withRouter } from "react-router";
import DetailCard from './DetailCard';

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

const DetailCardCont = withRouter(connect(mapStateToProps)(DetailCard));

export default DetailCardCont;