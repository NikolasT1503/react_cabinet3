import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Service } from "./Service";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import "./Projects.css";

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      expandedRows: null,
    };

    this.service = new Service();
    this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
    this.onRowExpand = this.onRowExpand.bind(this);
    this.onRowCollapse = this.onRowCollapse.bind(this);
    this.expandAll = this.expandAll.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
  }
  componentDidMount() {
    this.service
      .getProjects()
      .then((data) => this.setState({ projects: data }));
  }
  onRowExpand(event) {
    this.toast.show({
      severity: "info",
      summary: "Строки раскрыты",
      detail: event.data.name,
      life: 3000,
    });
  }

  onRowCollapse(event) {
    this.toast.show({
      severity: "success",
      summary: "Строки скрыты",
      detail: event.data.name,
      life: 3000,
    });
  }
  expandAll() {
    let expandedRows = {};
    this.state.projects.forEach((p) => (expandedRows[`${p.id}`] = true));

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


rowExpansionTemplate(data) {
    console.log(data);
    return (
        <div className="orders-subtable">
            <h5>Список проектов по данной теме</h5>
            <DataTable value={data.homeworks}>
                <Column field="homework" header="Д/з" sortable></Column>
                <Column field="url" header="Ссылка" sortable></Column>
            </DataTable>
        </div>
    );
}
  render() {
    const header = (
        <div className="table-header-container">
            <Button icon="pi pi-plus" label="Expand All" onClick={this.expandAll} className="p-mr-2" />
            <Button icon="pi pi-minus" label="Collapse All" onClick={this.collapseAll} />
        </div>
    );
    console.log('Projects render - state', this.state)
    return (
      <div>
        <h1>Мои проекты по курсу React.js</h1>
        <div className="datatable-rowexpansion-demo">
                <Toast ref={(el) => this.toast = el} />

                <div className="card">
                    <DataTable value={this.state.projects} expandedRows={this.state.expandedRows} onRowToggle={(e) => this.setState({ expandedRows: e.data })}
                        onRowExpand={this.onRowExpand} onRowCollapse={this.onRowCollapse}
                        rowExpansionTemplate={this.rowExpansionTemplate} dataKey="id" header={header}>
                        <Column expander style={{ width: '3em' }} />
                        <Column field="theme" header="Тема" sortable />
                    </DataTable>
                </div>
            </div>
      </div>
    );
  }
}

export default Projects;
