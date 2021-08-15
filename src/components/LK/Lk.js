import React, { useRef } from "react";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from 'primereact/dropdown';
import { Fieldset } from "primereact/fieldset";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { DADATA_TOKEN } from "../../const/Const";
import { ToggleButton } from 'primereact/togglebutton';
import DetailCardCont from "./DetailCardCont";
//import axios from "axios";
import MyProgressBar from "./ProgressBar";
import { Messages } from 'primereact/messages';

const schema = yup.object().shape({
    addressReg: yup.string().required(),
  });

function dateStrToDate(dateStr, separator) {
    let temp = dateStr.split(separator);
    return new Date(+temp[2], temp[1]-1, +temp[0])
}


function Lk(props) {
  const { history } = props;
  console.log('LK render, props', props);
  const dateBirthday = dateStrToDate(props.birthday, '.');
  const msg = useRef(null);

  const { register, handleSubmit, formState: { errors }} = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    console.log('LK Объект формы', data);
/*     axios
        .post("https://jsonplaceholder.typicode.com/posts", data)
        .then((resp) => console.log('Запрос axios LK', resp)); */
    props.updateFamChanged(data.famChanged);
    props.updateFamPrevious(data.famPrevious);
    props.updateDocSeries(data.docSeries);
    props.updateDocNumber(data.docNumber);
    props.updateDocDate(data.docDate);
    props.updateDocOrg(data.docOrg);
    props.updateDocPodr(data.docPodr);
    props.updateBirthdayPlace(data.birthdayPlace);
    props.updateAddressReg(data.addressReg);
    props.updateAddressFact(data.addressFact);
    props.updateAddressEqual(data.addressEqual);
    props.updatePhone(data.phone);
    props.updateEmail(data.email);
    addMessages();
  };

  function countCurrentPercent() {
      let current_percent = 0;
      if (props.surname !== '') current_percent = current_percent+8.3;
      if (props.firstname !== '') current_percent = current_percent+8.3;
      if (props.patrname !== '') current_percent = current_percent+8.3;
      if (props.birthday !== '') current_percent = current_percent+8.3;
      if (props.phone !== '') current_percent = current_percent+8.3;
      if (props.email !== '') current_percent = current_percent+8.3;
      if (props.docSeries !== '') current_percent = current_percent+8.4;
      if (props.docNumber !== '') current_percent = current_percent+8.4;
      if (props.docDate !== '') current_percent = current_percent+8.4;
      if (props.docOrg !== '') current_percent = current_percent+8.4;
      if (props.docPodr !== '') current_percent = current_percent+8.3;
      if (props.addressReg !== '') current_percent = current_percent+8.3;
      return current_percent;
  }

  const handleGoBackButtonClick = () => {
    history.goBack();
  };

  const monthNavigatorTemplate = (e) => {
    return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
  }

  const yearNavigatorTemplate = (e) => {
      return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="p-ml-2" style={{ lineHeight: 1 }} />;
  }

  const current_percent = countCurrentPercent();

  const addMessages = () => {
    msg.current.show([
        { severity: 'Успешно', summary: 'Успешно', detail: 'Данные сохранены', sticky: true },
    ]);
  }

  return (
    <div>
      <div className="p-fluid p-grid p-align-top">
        <div className="p-col-1">
          <Button
            label="Назад"
            className="p-button-raised p-button-rounded"
            icon="pi pi-angle-left"
            onClick={handleGoBackButtonClick}
          />
        </div>
        <div className="p-col-8">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Fieldset legend="Анкетные данные" toggleable>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-4">
                            <label htmlFor="surname">Фамилия</label>
                            <InputText id="surname" disabled type="text" value={props.surname} />
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label htmlFor="firstname">Имя</label>
                            <InputText id="firstname" disabled type="text" value={props.firstname} />
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label htmlFor="patrtname">Отчество</label>
                            <InputText id="patrtname" disabled type="text" value={props.patrname} />
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label htmlFor="famChanged">Менялась ли фамилия</label>
                            <ToggleButton onLabel="Да" offLabel="Нет" onIcon="pi pi-check" offIcon="pi pi-times" 
                                id="famChanged" checked={props.famChanged}
                                {...register("famChanged")}
                                onChange={(e) => {
                                    props.updateFamChanged(e.value);
                                    //current_percent = current_percent + 7
                                }}
                            />
                            <p className="messages">{errors["famChanged"]?.message}</p>
                        </div>
                        { props.famChanged &&
                            <div className="p-field p-col-12 p-md-8">
                                <label htmlFor="famPrevious">Предыдущая фамилия</label>
                                <InputText id="famPrevious" type="text" value={props.famPrevious} {...register("famPrevious")}                                
                                        onChange={(e) => {props.updateFamPrevious(e.target.value);}}/>
                                <p className="messages">{errors["famPrevious"]?.message}</p>
                            </div>
                        }
                        <div className="p-field p-col-12">
                            <label htmlFor="birthday">Дата рождения</label>
                            <Calendar
                                id="birthday"
                                disabled
                                dateFormat="dd.mm.yy"
                                value={dateBirthday}                                
                                showIcon
                                className="p-md-4"
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label htmlFor="phone">Телефон</label>
                            <InputMask id="phone" mask="+9 (999) 999-9999" value={props.phone} {...register("phone")}
                                onChange={(e) => props.updatePhone(e.value)}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-8">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" type="text" value={props.email} {...register("email")}
                                    onChange={(e) => {props.updateEmail(e.target.value);}}/>
                        </div>
                    </div>
                </Fieldset>
                <Fieldset legend="Паспортные данные" toggleable>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-4">
                            <label htmlFor="docSeries">Серия</label>
                            <InputText id="docSeries" type="text" value={props.docSeries} {...register("docSeries")}
                                    onChange={(e) => {props.updateDocSeries(e.target.value);}} />
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label htmlFor="docNumber">Номер</label>
                            <InputText id="docNumber" type="text" value={props.docNumber} {...register("docNumber")}
                                    onChange={(e) => {props.updateDocNumber(e.target.value);}}/>
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label htmlFor="docDate">Дата выдачи</label>
                            <Calendar
                                id="docDate"
                                value={props.docDate}
                                dateFormat="dd.mm.yy"
                                monthNavigator yearNavigator yearRange="1900:2021"
                                monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}
                                {...register("docDate")}
                                onChange={(e) => {
                                    const dateStr = new Date(e.target.value).toLocaleDateString();
                                    props.updateDocDate(dateStr);
                                }}
                                showIcon
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-8">
                            <label htmlFor="docOrg">Кем выдан</label>
                            <InputText id="docOrg" type="text" value={props.docOrg} {...register("docOrg")}
                                        onChange={(e) => {props.updateDocOrg(e.target.value);}}/>
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label htmlFor="docPodr">Номер подразделения</label>
                            <InputMask id="docPodr" mask="999-999" value={props.docPodr} {...register("docPodr")}
                                onChange={(e) => props.updateDocPodr(e.target.value)}
                            />
                        </div>
                    </div>
                </Fieldset>
                <Fieldset legend="Адресные данные" toggleable>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12">
                            <label htmlFor="addressReg">Адрес регистрации</label>
                            <AddressSuggestions
                                id="addressReg"
                                token={DADATA_TOKEN}
                                {...register("addressReg")}
                                onChange={(e) => props.updateAddressReg(e.value)}
                            />
                        </div>
                        <div className="p-field p-col-12 p-md-4">
                            <label htmlFor="addressEqual">Совпадает с фактическим? </label>
                            <ToggleButton onLabel="Да" offLabel="Нет" onIcon="pi pi-check" offIcon="pi pi-times" 
                                id="addressEqual" checked={props.addressEqual}
                                style={{width:'200px'}}
                                {...register("addressEqual")}
                                onChange={(e) => props.updateAddressEqual(e.value)}
                            />
                        </div>
                        {!props.addressEqual &&
                            <div className="p-field p-col-12">
                                <label htmlFor="addressFact">Адрес фактический</label>
                                <AddressSuggestions
                                    id="addressFact"
                                    token={DADATA_TOKEN}
                                    {...register("addressFact")}
                                    onChange={(e) => props.updateAddressFact(e.value)}
                                />
                            </div>                
                        }
                    </div>
                </Fieldset>
                <div className="button-submit">
                    <Button type="submit" label="Сохранить" icon="pi pi-check" style={{width:'200px'}} />
                </div>
                <Messages ref={msg} />
            </form>
            <br/>
            <br/>
            <br/>
            <div className="p-fluid p-formgrid p-grid">
                <div className="p-field p-col-12">
                    <MyProgressBar percent={current_percent}/>
                </div>
            </div>
        </div>
        <div className="p-col-3">
          <DetailCardCont />
        </div>
      </div>
    </div>
  );
}

export default Lk;
