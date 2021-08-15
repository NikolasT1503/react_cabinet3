import { NEWISSUETITLE, NEWISSUEBODY, DISPLAYBASIC} from './ActionsDialogIssue';


const initState = {
    displayBasic: false,
    newIssueTitle: "",
    newIssueBody: "",
  };

export const dialogIssueReducer = (state = initState, action) => {
    switch (action.type) {
        case DISPLAYBASIC: {return {...state, displayBasic: action.payload}}
        case NEWISSUETITLE: {return {...state, newIssueTitle: action.payload}}
        case NEWISSUEBODY: {return {...state, newIssueBody: action.payload}}
        default: return state
    }
  }