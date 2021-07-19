import React, { Component } from "react";
import { Card } from "primereact/card";
import { TabPanel, TabView } from "primereact/tabview";
import SignInCont from "./SignInCont";

class Sign extends Component {
  state = {
    activeIndex: 0,
  };
  handleTabChange = (e) => {
    this.setState({ activeIndex: e.index });
  };
  render() {
    return (
      <div>
        <Card
          className="center-form-card"
          style={{
            width: "75%",
            marginBottom: "2em",
            marginLeft: "auto",
            marginRight: "auto",
            justifyContent: "center",
          }}
        >
          <div className="tabview">
            <TabView
              className="tabview-custom"
              activeIndex={this.state.activeIndex}
              onTabChange={this.handleTabChange}
            >
              <TabPanel header="Вход" leftIcon="pi pi-sign-in"> <SignInCont/> </TabPanel>
              <TabPanel header="Регистрация" leftIcon="pi pi-user-edit"> Таб 2</TabPanel>
            </TabView>
          </div>
        </Card>
      </div>
    );
  }
}

export default Sign;
