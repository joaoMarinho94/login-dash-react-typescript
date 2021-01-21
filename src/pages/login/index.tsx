import React, { useRef, useEffect, useState } from 'react';
import { SubmitHandler, FormHandles } from '@unform/core';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Button, FormGroup, FormCheck, Spinner } from 'react-bootstrap';

import './styles.css';
import * as AuthActions from '../../redux/auth/actions';
import Input from '../../components/input';
import api from '../../services/api';

interface FormData {
  account: number;
  username: string;
  password: string;
}

interface ISomeObject {
  [key: string]: string;
}

// const initialData = {
//   account: 101694,
//   username: 'ederfel',
//   password: 'abc1234',
// };

const initialData = {
  account: null,
  username: '',
  password: '',
};

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch: Dispatch = useDispatch();
  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);
  const [force, setForce] = useState(0);
  const [KeepMeConnected, setKeepMeConnected] = useState(false);

  useEffect(() => {
    const userSessionStorage = sessionStorage.getItem('user');
    const userLocalStorage = localStorage.getItem('user');
    let user = null;

    if (userSessionStorage) user = JSON.parse(userSessionStorage);
    else if (userLocalStorage) user = JSON.parse(userLocalStorage);
    else return;

    dispatch(AuthActions.updateUser(user));
    history.push('/dashboard');
  }, [dispatch, history]);

  const handleValidation = async (data: FormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        account: Yup.string().required('A conta é obrigatória'),
        username: Yup.string().required('O usuário é obrigatório'),
        password: Yup.string().required('A senha é obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      return true;
    } catch (err) {
      const validationErrors: ISomeObject = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach(error => {
          validationErrors[error.path || ''] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      }
      return false;
    }
  };

  const handleSubmit: SubmitHandler<FormData> = async values => {
    try {
      if (loading) return;

      setLoading(true);

      const validation = await handleValidation(values);

      if (!validation) return;

      const bodyData = { ...values, force };

      const { data } = await api.post('/users/token', bodyData);

      if (data.data.fail === 'session') {
        toast.error(
          'Encontramos uma sessão em andamento. Habilite entrar a força para atualizar a sessão.',
        );
        return;
      }

      const user = {
        token: data.data.token,
        account: values.account,
        username: values.username,
      };

      const { data: data2 } = await api.get('/users/me', {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const userAditionalData = {
        ...user,
        id: data2.data[0].id,
        active: data2.data[0].active,
      };

      dispatch(AuthActions.updateUser(userAditionalData));

      sessionStorage.setItem('user', JSON.stringify(userAditionalData));

      if (KeepMeConnected)
        localStorage.setItem('user', JSON.stringify(userAditionalData));

      history.push('/dashboard');
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error('Usuário ou senha incorretos.');
        return;
      }
      toast.error('Ocorreu um erro ao efetuar o login. Tente novamente.');
    } finally {
      setLoading(false);
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
        <Input name="account" type="number" label="Conta:" />
        <Input name="username" label="Usuário:" />
        <Input name="password" type="password" label="Senha:" />
        <FormGroup>
          <FormCheck
            type="checkbox"
            id="Keep-me-connected"
            label="Mantenha-me conectado"
            custom
            onChange={() => setKeepMeConnected(!KeepMeConnected)}
          />
        </FormGroup>
        <FormGroup>
          <FormCheck
            type="checkbox"
            id="force"
            label='Entrar a "força"'
            custom
            onChange={() => setForce(1)}
          />
        </FormGroup>
        <div className="center">
          <Button variant="primary" type="submit">
            {loading ? <Spinner animation="border" /> : 'Entrar'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
