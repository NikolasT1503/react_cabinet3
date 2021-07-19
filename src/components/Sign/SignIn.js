import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { InputMask } from "primereact/inputmask";
import { Password } from "primereact/password";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";

const schema = yup.object().shape({
  login: yup.string().required().max(50),
  password: yup.string().required().min(6),
});

const SignIn = (props) => {
    /* console.log('SignIn', props); */
    const { history, login, password } = props;
    const { register, handleSubmit, formState: { errors }} = useForm({ 
        resolver: yupResolver(schema),
    });

    const onLoginChange = (e) => {
        props.updateLogin(e.value);
    }
    const onPasswordChange = (e) => {
        props.updatePassword(e.target.value);
    }

    const onSubmit = (data) => {
      console.log('Отправка формы SignIn', data);
      axios
      .post("https://jsonplaceholder.typicode.com/posts", data)
      .then((resp) => console.log(resp));
      //добавить потом проверку usera
      props.updateLogin(data.login);
      props.updatePassword(data.password);
      //end добавить потом проверку usera
      history.push("/lk");
    };

  return (
    <div className="p-justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-grid">
          <label className="p-col-4" htmlFor="login">
            Логин
          </label>
          <div className="p-col-8">
            <div className="p-inputgroup">
              <InputMask
                id="login"
                {...register("login")}
                mask="+9 (999) 999-9999"
                value={login}
                onChange={onLoginChange}
              />
            </div>
            <p className="messages">{errors["login"]?.message}</p>
          </div>
        </div>
        <div className="p-grid">
          <label className="p-col-4" htmlFor="password">
            Пароль
          </label>
          <div className="p-col-8">
            <div className="p-inputgroup">
              <Password
                id="password"
                value={password}
                {...register("password")}
                onChange={onPasswordChange}
              />
            </div>
            <p className="messages">{errors["password"]?.message}</p>
          </div>
        </div>
        <Button
          type="submit"
          label="Войти"
          icon="pi pi-check"
        />
      </form>
    </div>
  );
};

export default SignIn;
