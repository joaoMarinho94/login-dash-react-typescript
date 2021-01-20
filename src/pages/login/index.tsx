import React from 'react';

import { Form, Button } from 'react-bootstrap';

import './styles.css';

interface Props {
  account: number;
  username: string;
  password: string;
}

const Login: React.FC = () => {
  return (
    <div className="container">
      <img src="/assets/images/logo.png" alt="logo" />
      <Form>
        <h2 className="center">
          Faça Login para
          <br />
          Acessar o Dashboard
        </h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Conta:</Form.Label>
          <Form.Control type="account" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="username" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Senha:</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Mantenha-me conectado" />
        </Form.Group>
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
