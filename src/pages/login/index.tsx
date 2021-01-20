import React, { useRef } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Button, FormGroup, FormCheck } from 'react-bootstrap';

import './styles.css';
import * as AuthActions from '../../redux/auth/actions';
import Input from '../../components/input';
import api from '../../services/api';

interface FormData {
  account: string;
  username: string;
  password: string;
}

const initialData = {
  account: 101694,
  username: 'ederfel',
  password: 'abc1234',
  force: 1,
};

const Login: React.FC = () => {
  const history = useHistory();
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
    try {
      const { data } = await api.post('/users/token', values);

      if (data.data.fail === 'session') {
        toast.error(
          'Encontramos uma sessão em andamento. Habilite entrar a força para atualizar a sessão.',
        );
        return;
      }

      dispatch(
        AuthActions.updateUser({
          token: data.data.token,
          account: values.account,
          username: values.username,
        }),
      );
      history.push('/dashboard');
    } catch (err) {
      if (err.response.status === 401) {
        toast.error('Usuário ou senha incorretos.');
        return;
      }
      toast.error('Ocorreu um erro ao efetuar o login. Tente novamente.');
    }
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
        <Input name="account" type="number" required label="Conta:" />
        <Input name="username" required label="Usuário:" />
        <Input name="password" type="password" required label="Senha:" />
        <FormGroup>
          <FormCheck
            type="checkbox"
            id="Keep-me-connected"
            label="Mantenha-me conectado"
            custom
          />
        </FormGroup>
        <FormGroup>
          <FormCheck
            type="checkbox"
            id="force"
            label='Entrar a "força"'
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
