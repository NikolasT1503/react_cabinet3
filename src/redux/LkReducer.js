const UPDATE_FAMCHANGED = "UPDATE-FAMCHANGED";
const UPDATE_FAMPREVIOUS = "UPDATE-FAMPREVIOUS";
const UPDATE_DOCSERIES = "UPDATE-DOCSERIES";
const UPDATE_DOCNUMBER = "UPDATE-DOCNUMBER";
const UPDATE_DOCDATE = "UPDATE-DOCDATE";
const UPDATE_DOCORG = "UPDATE-DOCORG";
const UPDATE_DOCPODR = "UPDATE-DOCPODR";
const UPDATE_BIRTHDAYPLACE = "UPDATE-BIRTHDAYPLACE";
const UPDATE_ADDRESSREG = "UPDATE-ADDRESSREG";
const UPDATE_ADDRESSFACT = "UPDATE-ADDRESSFACT";
const UPDATE_ADDRESSEQUAL = "UPDATE-ADDRESSEQUAL";
const SAVELK = 'SAVELK';

const initialState = {
    famChanged: false,
    famPrevious: "",
    docSeries: "",
    docNumber: "",
    docDate: '',
    docOrg: "",
    docPodr: "",
    birthdayPlace: "",
    addressReg: "",
    addressFact: "",
    addressEqual: true,
    saved: false,
};
    
export const lkReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FAMCHANGED: {return {...state, famChanged: action.famChanged}}
    case UPDATE_FAMPREVIOUS: {return {...state, famPrevious: action.famPrevious}}
    case UPDATE_DOCSERIES: {return {...state, docSeries: action.docSeries}}
    case UPDATE_DOCNUMBER: {return {...state, docNumber: action.docNumber}}
    case UPDATE_DOCDATE: {return {...state, docDate: action.docDate}}
    case UPDATE_DOCORG: {return {...state, docOrg: action.docOrg}}
    case UPDATE_DOCPODR: {return {...state, docPodr: action.docPodr}}
    case UPDATE_BIRTHDAYPLACE: {return {...state, birthdayPlace: action.birthdayPlace}}
    case UPDATE_ADDRESSREG: {return {...state, addressReg: action.addressReg}}
    case UPDATE_ADDRESSFACT: {return {...state, addressFact: action.addressFact}}
    case UPDATE_ADDRESSEQUAL: {return {...state, addressEqual: action.addressEqual}}
    case SAVELK: {return {...state, saved: action.saved}}
    default: return state;
  }
};

export const updateFamChangedAC = (famChanged) => ({type: UPDATE_FAMCHANGED, famChanged})
export const updateFamPreviousAC = (famPrevious) => ({type: UPDATE_FAMPREVIOUS, famPrevious})
export const updateDocSeriesAC = (docSeries) => ({type: UPDATE_DOCSERIES, docSeries})
export const updateDocNumberAC = (docNumber) => ({type: UPDATE_DOCNUMBER, docNumber})
export const updateDocDateAC = (docDate) => ({type: UPDATE_DOCDATE, docDate})
export const updateDocOrgAC = (docOrg) => ({type: UPDATE_DOCORG, docOrg})
export const updateDocPodrAC = (docPodr) => ({type: UPDATE_DOCPODR, docPodr})
export const updateBirthdayPlaceAC = (birthdayPlace) => ({type: UPDATE_BIRTHDAYPLACE, birthdayPlace})
export const updateAddressRegAC = (addressReg) => ({type: UPDATE_ADDRESSREG, addressReg})
export const updateAddressFactAC = (addressFact) => ({type: UPDATE_ADDRESSFACT, addressFact})
export const updateAddressEqualAC = (addressEqual) => ({type: UPDATE_ADDRESSEQUAL, addressEqual})
export const saveLkAC = (saved) => ({type: SAVELK, saved})
