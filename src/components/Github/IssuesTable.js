import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React, { Component } from "react";
//import { setDisplayBasicForDialog } from "../../redux/ActionsDialogIssue";
//import DialogIssue from "./DialogIssue";
//import Moment from "react-moment";
import "./IssuesTable.css";

export class IssuesTable extends Component {
  constructor(props) {
    super(props);
    console.log('IssuesTable props', props)

    this.state = {
      issues: [],
      expandedRows: null,
      editableComment: false,
      displayCreateCommentDialog: false,
      displayCreateIssueDialog: false,
      displaySolveIssueDialog: false,
      newComment: "",
      issueNumber: "",
      newIssueTitle: "",
      newIssueBody: "",
    };

    this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
    this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
    this.linkBodyTemplate = this.linkBodyTemplate.bind(this);

    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.closeBodyTemplate = this.closeBodyTemplate.bind(this);
    this.editBodyTemplate = this.editBodyTemplate.bind(this);

    this.onRowExpand = this.onRowExpand.bind(this);
    this.onRowCollapse = this.onRowCollapse.bind(this);
    this.expandAll = this.expandAll.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
    this.editCommentBodyTemplate = this.editCommentBodyTemplate.bind(this);
    this.bodyCommentEditor = this.bodyCommentEditor.bind(this);
    this.onEditorValueChange = this.onEditorValueChange.bind(this);
    this.openDialogComment = this.openDialogComment.bind(this);
    this.closeDialogComment = this.closeDialogComment.bind(this);
    this.openCreateIssueDialog = this.openCreateIssueDialog.bind(this);
    this.closeCreateIssueDialog = this.closeCreateIssueDialog.bind(this);
    this.openSolveIssueDialog = this.openSolveIssueDialog.bind(this);
    this.closeSolveIssueDialog = this.closeSolveIssueDialog.bind(this);
    this.handleNewCommentChange = this.handleNewCommentChange.bind(this);
  }

  static getDerivedStateFromProps(props) {
    /* console.log("IssuesTable getDerivedStateFromProps", props); */
    return { issues: props.issues };
  }

  refreshPage = ()=>{
    window.location.reload();
  }

  onRowExpand(event) {
    this.toast.show({
      severity: "info",
      summary: "Issue Expanded",
      detail: event.data.name,
      life: 3000,
    });
  }

  onRowCollapse(event) {
    this.toast.show({
      severity: "success",
      summary: "Issue Collapsed",
      detail: event.data.name,
      life: 3000,
    });
  }

  expandAll() {
    let expandedRows = {};
    this.state.issues.forEach((i) => {
      expandedRows[`${i.id}`] = true;
    });
    this.setState(
      {
        expandedRows,
      },
      () => {
        this.toast.show({
          severity: "success",
          summary: "All Rows Expanded",
          life: 3000,
        });
      }
    );
  }

  collapseAll() {
    this.setState(
      {
        expandedRows: null,
      },
      () => {
        this.toast.show({
          severity: "success",
          summary: "All Rows Collapsed",
          life: 3000,
        });
      }
    );
  }

  statusOrderBodyTemplate(rowData) {
    return (
      <span className={`order-badge order-${rowData.status.toLowerCase()}`}>
        {rowData.status}
      </span>
    );
  }

  imageBodyTemplate(rowData) {
    return (
      <a href={`${rowData.user.html_url}`} target="_blank" rel="noreferrer">
        <i className="pi pi-user" style={{ fontSize: "2em" }}></i>
      </a>
    );
  }

  linkBodyTemplate(rowData) {
    return (
      <a href={`${rowData.html_url}`} target="_blank" rel="noreferrer">
        <i className="pi pi-github" style={{ fontSize: "2em" }}></i>
      </a>
    );
  }

  statusBodyTemplate(rowData) {
    //console.log('statusBodyTemplate', rowData.state)
    return (
      <span className={`product-badge status-${rowData.state.toLowerCase()}`}>
        {rowData.state}
      </span>
    );
  }

  closeBodyTemplate(rowData) {
      return (
        <Button
          className="p-button-raised p-button-rounded"
          icon="pi pi-reply"
          onClick={() => {
            //this.openSolveIssueDialog(rowData.number)
            console.log('resolveIssue', rowData.number);
            this.props.resolveIssue(rowData.number);
            this.toast.show({
              severity: "success",
              summary: "Issue Solved",
              detail: rowData.number,
              life: 3000,
            });
          }}
      />
      )
  }

  editBodyTemplate() {
    return (
      <Button
        className="p-button-raised p-button-rounded p-button-sm"
        icon="pi pi-pencil"
        onClick={() => console.log("Button Close Click")}
      />
    );
  }
  editCommentBodyTemplate() {
    return (
      <Button
        className="p-button-raised p-button-rounded"
        icon="pi pi-pencil"
        onClick={() =>
          this.setState({ editableComment: !this.state.editableComment })
        }
      />
    );
  }

  onEditorValueChange(productKey, props, value) {
    let updatedProducts = [...props.value];
    updatedProducts[props.rowIndex][props.field] = value;
    this.setState({ [`${productKey}`]: updatedProducts });
  }

  bodyCommentEditor(productKey, props) {
    return (
      <InputText
        value={props.rowData["body"]}
        onValueChange={(e) =>
          this.onEditorValueChange(productKey, props, e.value)
        }
      />
    );
  }

  openCreateIssueDialog() {
    let state = { displayCreateIssueDialog: true };
    this.setState(state);
  }

  closeCreateIssueDialog(flag) {
    this.setState({ displayCreateIssueDialog: false });
    if (flag) {
      this.props.createIssue(this.state.newIssueTitle, this.state.newIssueBody);
    }
  }

  openSolveIssueDialog(issue_number) {
    this.setState({ displaySolveIssueDialog: true, issueNumber:  issue_number});
  }
  closeSolveIssueDialog(flag) {
    this.setState({ displaySolveIssueDialog: false });
    if (flag) {
      this.props.solveIssue(this.state.issueNumber);
    }
  }

  openDialogComment(issueNumber) {
    let state = { displayCreateCommentDialog: true, issueNumber: issueNumber };
    this.setState(state);
  }
  closeDialogComment(flag) {
    this.setState({ displayCreateCommentDialog: false });
    if (flag) {
      this.props.createIsueComment(
        this.state.issueNumber,
        this.state.newComment
      );
    }
  }

  renderFooterDialogComment() {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => this.closeDialogComment(false)}
          className="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => this.closeDialogComment(true)}
          autoFocus
        />
      </div>
    );
  }

  handleNewCommentChange = (e) => {
    this.setState({ newComment: e.target.value });
  };

  renderFooterCreateIssueDialog = () => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => this.closeCreateIssueDialog(false)}
          className="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => this.closeCreateIssueDialog(true)}
          autoFocus
        />
      </div>
    );
  };

  renderFooterSolveDialog = () => {
    return (
      <div>
        <Button
          label="No"
          icon="pi pi-times"
          onClick={() => this.closeSolveIssueDialog(false)}
          className="p-button-text"
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          onClick={() => this.closeSolveIssueDialog(true)}
          autoFocus
        />
      </div>
    );
  };

  refreshTable = () => {
    //this.refreshPage();

    this.props.getIssues();
    this.setState(
      {
        expandedRows: null,
      }
    );
  }

  rowExpansionTemplate(data) {
    console.log("rowExpansionTemplate", data);
    return (
      <div className="orders-subtable">
        <Button
          icon="pi pi-external-link"
          label="Создать комментарий"
          onClick={() => this.openDialogComment(data.number)}
        />
        <Dialog
          header="Создать комментарий"
          visible={this.state.displayCreateCommentDialog}
          style={{ width: "50vw" }}
          footer={this.renderFooterDialogComment()}
          onHide={() => this.closeDialogComment(false)}
        >
          <div className="p-grid">
            <label className="p-col-4" htmlFor="comment">
              Комментарий
            </label>
            <div className="p-col-8">
              <div className="p-inputgroup">
                <InputText
                  id="comment"
                  onChange={this.handleNewCommentChange}
                />
              </div>
            </div>
          </div>
        </Dialog>
        <DataTable
          value={data.comments}
          dataKey="id"
          editMode="row"
          //onRowEditInit={this.onRowEditInit}
          //onRowEditCancel={this.onRowEditCancel}
        >
          <Column
            field="createdDateComment"
            header="Дата комментария"
            sortable
          ></Column>
          <Column field="user.login" header="Автор" sortable></Column>
          <Column
            field="body"
            header="Содержание"
            sortable
            editor={(props) => this.bodyCommentEditor("issues", props)}
          ></Column>
{/*           <Column
            rowEditor
            headerStyle={{ width: "7rem" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column> */}
        </DataTable>
      </div>
    );
  }

  render() {
    //const { createIssue } = this.props;
    //console.log("displayBasic IssueTable", displayBasic);
    console.log("IssueTable render - state", this.state.issues);
    const header = (
      <div className="p-grid">
        <div className="p-col-8">
          <Button
            icon="pi pi-plus"
            label="Expand All"
            onClick={this.expandAll}
            className="p-mr-2"
          />
          <Button
            icon="pi pi-minus"
            label="Collapse All"
            onClick={this.collapseAll}
          />
        </div>
        <div className="p-col-4">
          <Button
            icon="pi pi-plus"
            label="Создать"
            className="p-mr-2"
            onClick={
              /* () => {
              console.log("Click setDisplayBasicForDialog IssueTable");
              setDisplayBasicForDialog(true); 
              */
              this.openCreateIssueDialog
            }
          />
          <Button
            icon="pi pi-refresh"
            label="Обновить"
            onClick={
              /* () => {
              console.log("Click setDisplayBasicForDialog IssueTable");
              setDisplayBasicForDialog(true); 
              */
              this.refreshTable
            }
          />
        </div>
        <Dialog
          header="Создать обращение"
          visible={this.state.displayCreateIssueDialog}
          style={{ width: "50vw" }}
          footer={this.renderFooterCreateIssueDialog}
          onHide={() => this.closeCreateIssueDialog(false)}
        >
          <div className="p-grid">
            <label className="p-col-4" htmlFor="title">
              Заголовок
            </label>
            <div className="p-col-8">
              <div className="p-inputgroup">
                <InputText
                  onChange={(e) =>
                    this.setState({ newIssueTitle: e.target.value })
                  }
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
                  onChange={(e) =>
                    this.setState({ newIssueBody: e.target.value })
                  }
                ></InputText>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
    /*     console.log("IssueTable render", this.state.issues); */
    console.log("IssueTable state", this.state);
    return (
      <div className="datatable-rowexpansion-demo">
        <Toast ref={(el) => (this.toast = el)} />
        <div className="card">
          <DataTable
            value={this.state.issues}
            expandedRows={this.state.expandedRows}
            onRowToggle={(e) => this.setState({ expandedRows: e.data })}
            onRowExpand={this.onRowExpand}
            onRowCollapse={this.onRowCollapse}
            rowExpansionTemplate={this.rowExpansionTemplate}
            dataKey="id"
            header={header}
          >
            <Column expander style={{ width: "3em" }} />
            <Column
              field="state"
              header="State"
              body={this.statusBodyTemplate}
            />
            <Column
              field="body"
              header="Содержание"
            />
            <Column field="createdDate" header="Created" sortable />
            <Column field="number" header="Number" sortable />
            <Column field="title" header="Title" sortable />
            <Column
              field="user.login"
              header="User"
              sortable
              body={this.imageBodyTemplate}
            />
            <Column
              header="Lock"
              headerStyle={{ width: "4rem" }}
              body={this.closeBodyTemplate}
            >
            </Column>
            <Column
              header="Edit"
              headerStyle={{ width: "4rem" }}
              body={this.editBodyTemplate}
            ></Column>
            <Column
              field="html_url"
              header="Ссылка на issue"
              body={this.linkBodyTemplate}
            />
          </DataTable>
{/*           <Dialog
              header="Решить обращение"
              visible={this.state.displaySolveIssueDialog}
              style={{ width: "50vw" }}
              footer={this.renderFooterSolveDialog}
              onHide={() => this.closeSolveIssueDialog(false)}
            >
              <div className="p-grid">

              </div>
            </Dialog> */}
        </div>
      </div>
    );
  }
}

export default IssuesTable;
