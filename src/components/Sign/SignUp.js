import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { Button } from "primereact/button";
import { InputMask } from "primereact/inputmask";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from 'primereact/dropdown';
import { SelectButton } from "primereact/selectbutton";
import React, { useState } from "react";
import { FioSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {DADATA_TOKEN} from '../../const/Const';

const schema = yup.object().shape({
  surname: yup.string().required().max(50),
  firstname: yup.string().required().max(31),
  patrname: yup.string().required().max(50),
  gender: yup.string().required().min(4),
  birthday: yup.string().required(),
  email: yup.string().required("Please enter email").email(),
  //phone: yup.string().required("Please enter phone").max(20),
});

const genders = [
  { name: "Муж", value: "MALE" },
  { name: "Жен", value: "FEMALE" },
];

const SignUp = (props) => {
    console.log('SignUp render', props);
  const { register, handleSubmit, formState: { errors }} = useForm({ resolver: yupResolver(schema) });

  const [showFIO, setShowFIO] = useState(false);
  const handleFIOClick = () => setShowFIO(!showFIO);
  const {history} = props;
  console.log('Errors form SignUp', errors);

  const onSubmit = (data) => {
    console.log("submit SignUp", data);
    props.updateSurname(data.surname);
    props.updateFirstname(data.firstname);
    props.updatePatrname(data.patrname);
    props.updateGender(data.gender);
    //let dateStr = new Date(data.birthday).toLocaleDateString();
    //props.updateBirthday(dateStr);
    props.updateBirthday(data.birthday);
    props.updatePhone(data.phone);
    props.updateEmail(data.email);
    axios
      .post("https://jsonplaceholder.typicode.com/posts", data)
      .then((resp) => console.log(resp));
    history.push("/lk");
  };

  const handleFIOChange = (value) => {
    props.updateSurname(value.data.surname);
    props.updateFirstname(value.data.name);
    props.updatePatrname(value.data.patronymic);
    props.updateGender(value.data.gender);
  };

  const monthNavigatorTemplate = (e) => {
    return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
  }

  const yearNavigatorTemplate = (e) => {
      return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="p-ml-2" style={{ lineHeight: 1 }} />;
  }

  return (
    <div className="card">
      <div className="p-justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-grid">
          <label className="p-col-6" htmlFor="fio">Введите ФИО</label>
          <div className="p-col-6">
            <div className="p-inputgroup">
              <FioSuggestions
                id="fio"
                token={DADATA_TOKEN}
                onChange={handleFIOChange}
              />
              <Button type="button" icon="pi pi-pencil" onClick={handleFIOClick} />
            </div>
          </div>
        </div>
        {showFIO && (
          <>
            <div className="p-grid">
              <label className="p-col-6" htmlFor="surname">Фамилия</label>
              <div className="p-col-6">
                  <InputText
                    id="surname"
                    {...register("surname")}
                    value={props.surname}
                    onChange={(e) => {
                      props.updateSurname(e.value);
                    }}
                  ></InputText>
                  <p className="messages">{errors["surname"]?.message}</p>
              </div>
            </div>
            <div className="p-grid">
              <label className="p-col-6" htmlFor="firstname">Имя</label>
              <div className="p-col-6">
                  <InputText
                    id="firstname"
                    value={props.firstname}
                    {...register("firstname")}
                    onChange={(e) => props.updateFirstname(e.value)}
                  ></InputText>
                  <p className="messages">{errors["firstname"]?.message}</p>
              </div>
            </div>
            <div className="p-grid">
              <label className="p-col-6" htmlFor="patrname">Отчество</label>
              <div className="p-col-6">
                  <InputText
                    id="patrname"
                    value={props.patrname}
                    {...register("patrname")}
                    onChange={(e) => props.updatePatrname(e.value)}
                  ></InputText>
                  <p className="messages">{errors["patrname"]?.message}</p>
              </div>
            </div>
            <div className="p-grid">
              <label className="p-col-6" htmlFor="gender">
                Пол
              </label>
              <div className="p-col-6">
                  <SelectButton
                    id="gender"
                    {...register("gender", { value: props.gender})}
                    value={props.gender}
                    options={genders}
                    optionLabel="name"
                    onChange={(e) => props.updateGender(e.target.value)}
                  />
                  <p className="messages">{errors["gender"]?.message}</p>
              </div>
            </div>
          </>
        )}
        <div className="p-grid">
          <label className="p-col-6" htmlFor="birthday">
            Дата рождения
          </label>
          <div className="p-col-6">
              <Calendar
                id="birthday"
                value={props.birthday}
                dateFormat="dd.mm.yy"
                {...register("birthday", { value: props.birthday})}
                monthNavigator yearNavigator yearRange="1900:2021"
                monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate}
                onChange={(e) => {
                  const dateStr = new Date(e.target.value).toLocaleDateString();
                  props.updateBirthday(dateStr);
                }}
                showIcon
              />
              <p className="messages">{errors["birthday"]?.message}</p>
          </div>
        </div>
        <div className="p-grid">
          <label className="p-col-6" htmlFor="phone">
            Телефон
          </label>
          <div className="p-col-6">
              <InputMask
                id="phone"
                {...register("phone")}
                mask="+9 (999) 999-9999"
                value={props.phone}
                onChange={(e) => props.updatePhone(e.target.value)}
              ></InputMask>
              <p className="messages">{errors["phone"]?.message}</p>
          </div>
        </div>
        <div className="p-grid">
          <label className="p-col-6" htmlFor="email">
            Email
          </label>
          <div className="p-col-6">
              <InputText
                id="email"
                {...register("email")}
                value={props.email}
                onChange={(e) => props.updateEmail(e.target.value)}
              ></InputText>
              <p className="messages">{errors["email"]?.message}</p>
          </div>
        </div>
        <div className="button-submit">
          <Button type="submit" label="Зарегистрироваться" icon="pi pi-check" />
        </div>
      </form>
    </div>
    </div>
  );
}

export default SignUp;
