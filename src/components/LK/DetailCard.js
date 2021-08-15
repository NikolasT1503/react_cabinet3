import React from "react";
import {Checkbox} from 'primereact/checkbox';
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";

function DetailCard(props) {
  return (
    <Card title="Детальная информация">
        <Panel header="Анкетные данные">
            <div className="p-fluid p-formgrid p-grid">
                <label className="p-field p-col-12 p-md-4" htmlFor="surname">Фамилия</label>
                <span className="p-field p-col-12 p-md-8" id="surname">{props.surname}</span>
                <label className="p-field p-col-12 p-md-4" htmlFor="famChanged">Фамилия менялась</label>
                <Checkbox className="p-field p-col-12 p-md-8" checked={props.famChanged} />
                {props.famChanged && (
                    <>
                        <label className="p-field p-col-12 p-md-4" htmlFor="famPrevious">Предыдущая Фамилия</label>
                        <p className="p-field p-col-12 p-md-8" id="famPrevious">{props.famPrevious}</p>
                    </>
                )}
                <label className="p-field p-col-12 p-md-4" htmlFor="firstname">Имя</label>
                <p className="p-field p-col-12 p-md-8" id="firstname">{props.firstname}</p>
                <label className="p-field p-col-12 p-md-4" htmlFor="patrname">Отчество</label>
                <p className="p-field p-col-12 p-md-8" id="patrname">{props.patrname}</p>
                <label className="p-field p-col-12 p-md-4" htmlFor="gender">Пол</label>
                <p className="p-field p-col-12 p-md-8" id="gender"> {(props.gender === 'MALE') ? 'М': 'Ж'} </p>
                <label className="p-field p-col-12 p-md-4" htmlFor="birthday">Дата рождения</label>
                <p className="p-field p-col-12 p-md-8" id="birthday">{props.birthday}</p>
                <label className="p-field p-col-12 p-md-4" htmlFor="phone">Телефон</label>
                <p className="p-field p-col-12 p-md-8" id="phone">{props.phone}</p>
                <label className="p-field p-col-12 p-md-4" htmlFor="email">Email</label>
                <p className="p-field p-col-12 p-md-8" id="email">{props.email}</p>
            </div>
        </Panel>
        <Panel header="Паспортные данные">
            <div className="p-fluid p-formgrid p-grid">
                <label className="p-field p-col-12 p-md-4" htmlFor="docSeries">Серия и номер</label>
                <p className="p-field p-col-12 p-md-8" id="docSeries">{props.docSeries} {props.docNumber}</p>
                <label className="p-field p-col-12 p-md-4" htmlFor="docDate">Дата выдачи</label>
                <p className="p-field p-col-12 p-md-8" id="docDate">{props.docDate}</p>
                <label className="p-field p-col-12 p-md-4" htmlFor="docOrg">Кем выдан</label>
                <p className="p-field p-col-12 p-md-8" id="docOrg">{props.docOrg}</p>
                <label className="p-field p-col-12 p-md-4" htmlFor="docPodr">Код подразделения</label>
                <p className="p-field p-col-12 p-md-8" id="docPodr">{props.docPodr}</p>
                <label className="p-field p-col-12 p-md-4" htmlFor="placeBirthday">Место рождения</label>
                <p className="p-field p-col-12 p-md-8" id="placeBirthday">{props.birthdayPlace}</p>
            </div>
        </Panel>
        <Panel header="Адресные данные">
            <div className="p-fluid p-formgrid p-grid">
                <label className="p-field p-col-12 p-md-4" htmlFor="addressReg">Адрес регистрации</label>
                <p className="p-field p-col-12 p-md-8" id="addressReg">{props.addressReg}</p>
                <label className="p-field p-col-12 p-md-4" htmlFor="addressEqual">Совпадает с фактическим?</label>
                <Checkbox className="p-field p-col-12 p-md-8" id="addressEqual" checked={props.addressEqual} />
                {!props.addressEqual && (
                    <>
                        <label className="p-field p-col-12 p-md-4" htmlFor="addressFact">Адрес фактический</label>
                        <p className="p-field p-col-12 p-md-8" id="addressFact">{props.addressFact}</p>
                    </>
                )}
            </div>
        </Panel>
    </Card>  
  ) 
}

export default DetailCard;
