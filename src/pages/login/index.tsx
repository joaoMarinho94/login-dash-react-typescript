import React, { useRef } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import { Button, FormGroup, FormCheck } from 'react-bootstrap';

import './styles.css';
import Input from '../../components/input';
import api from '../../services/api';

interface FormData {
  account: string;
  username: string;
  password: string;
}

const initialData = {
  account: null,
  username: '',
  password: '',
};

const Login: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const formRef = useRef<FormHandles>(null);

  // const handleSubmit: SubmitHandler<FormData> = async data => {
  //   try {
  //     formRef.current?.setErrors({});
  //     const schema = Yup.object().shape({
  //       account: Yup.string().required('A conta é obrigatória'),
  //       username: Yup.string().required('O usuário é obrigatório'),
  //       password: Yup.string().required('A senha é obrigatória'),
  //     });

  //     await schema.validate(data, {
  //       abortEarly: false,
  //     });

  //     console.log(data);
  //     formRef.current?.setErrors({});
  //   } catch (err) {
  //     const validationErrors = {};
  //     if (err instanceof Yup.ValidationError) {
  //       err.inner.forEach(error => {
  //         validationErrors[error.path] = error.message;
  //       });
  //       // formRef.current?.setErrors(validationErrors);
  //     }
  //   }
  // };

  const handleSubmit: SubmitHandler<FormData> = async values => {
    // dispatch(removeArticle(article))
    // try {
    //   const { data } = await api.post('/users/token', values);
    //   console.log('data: ', data);
    // } catch (err) {
    //   console.log('err: ', err);
    // }
  };

  return (
    <div className="container">
      <img src="/assets/images/logo.png" alt="logo" />
      <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
        <h2 className="center">
          Faça Login para
          <br />
          Acessar o Dashboard
        </h2>
        <Input name="account" type="number" label="Conta:" />
        <Input name="username" label="Usuário:" />
        <Input name="password" type="password" label="Senha:" />
        <FormGroup>
          <FormCheck
            type="checkbox"
            id="Keep-me-connected"
            label="Mantenha-me conectado"
            custom
          />
        </FormGroup>
        <div className="center">
          <Button variant="primary" type="submit">
            Entrar
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
