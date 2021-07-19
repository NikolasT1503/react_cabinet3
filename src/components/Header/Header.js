import React, { Component } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { withRouter } from "react-router";

class Header extends Component {
    constructor(props) {
        super(props);
        const { history } = this.props;
        this.items = [
            {
                label: 'Sign',
                icon: 'pi pi-fw pi-sign-in',
                command:()=>{ history.push("/sign") }
            },
            {
                label: 'Github',
                icon: 'pi pi-fw pi-github',
                command:()=>{ history.push("/github") }
            },
            {
                label: 'Error',
                icon: 'pi pi-fw pi-github',
                command:()=>{ history.push("/error") }
            },
        ];
    }

    render() {
        const start = <img alt="logo" src="https://i1.wp.com/www.primefaces.org/wp-content/uploads/2017/03/primereact-logo-200.png?fit=200%2C181&ssl=1" onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="p-mr-2"></img>;
        const end = <InputText placeholder="Search" type="text" />;

        return (
            <div>
                <div className="card">
                    <Menubar model={this.items} start={start} end={end} />
                </div>
            </div>
        );
    }
}

const HeaderWithRouter = withRouter(Header);
export default HeaderWithRouter;
