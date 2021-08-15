export const NEWISSUETITLE = "NEWISSUETITLE";
export const NEWISSUEBODY = "NEWISSUEBODY";
export const DISPLAYBASIC = "DISPLAYBASIC";

export const setNewIssueTitle = (value) => ({type: NEWISSUETITLE, payload: value})
export const setNewIssueBody = (value) => ({type: NEWISSUEBODY, payload: value})
export const setDisplayBasicForDialog = (value) => ({type: DISPLAYBASIC, payload: value})