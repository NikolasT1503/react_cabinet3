import React from 'react';
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import {
  setNewIssueTitle,
  setNewIssueBody,
  setDisplayBasicForDialog,
} from "../../redux/ActionsDialogIssue";

const selectNewIssueTitle = (state) => state.dialogIssue.newIssueTitle;
const selectNewIssueBody = (state) => state.dialogIssue.newIssueBody;
const selectDisplayBasic = (state) => state.dialogIssue.displayBasic;

function DialogIssue(props) {
    const dispatch = useDispatch();
    const newIssueTitle = useSelector(selectNewIssueTitle);
    const newIssueBody = useSelector(selectNewIssueBody);
    const displayBasic = useSelector(selectDisplayBasic);
    /* console.log('displayBasic DialogIssue', displayBasic) */
    
    const onDialogHide = (flag)=> {
        dispatch(setDisplayBasicForDialog(false))
        if (flag) {
            props.createIssue(newIssueTitle, newIssueBody);
        }
    }
    const renderFooter = () => {
        return (
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              onClick={() => onDialogHide(false)}
              className="p-button-text"
            />
            <Button
              label="Yes"
              icon="pi pi-check"
              onClick={() => onDialogHide(true)}
              autoFocus
            />
          </div>
        )
      }

    return(
        <Dialog
            header="Создать обращение"
            visible={displayBasic}
            style={{ width: "50vw" }}
            footer={renderFooter("displayBasic")}
            onHide={() => onDialogHide(false)}
          >
            <div className="p-grid">
              <label className="p-col-4" htmlFor="title">
                Заголовок
              </label>
              <div className="p-col-8">
                <div className="p-inputgroup">
                  <InputText
                    onChange={(e) => dispatch(setNewIssueTitle(e.value))}
                  ></InputText>
                </div>
              </div>
            </div>
            <div className="p-grid">
              <label className="p-col-4" htmlFor="body">
                Сообщение
              </label>
              <div className="p-col-8">
                <div className="p-inputgroup">
                  <InputText
                    onChange={(e) => dispatch(setNewIssueBody(e.value))}
                  ></InputText>
                </div>
              </div>
            </div>
        </Dialog>
    )
    
}

export default DialogIssue;