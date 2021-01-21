import React, { useRef, useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Spinner, Nav, Navbar, Row, Col, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { IAuthState } from '../../redux/auth/types';
import Input from '../../components/input';
import './styles.css';
import api from '../../services/api';
import * as AuthActions from '../../redux/auth/actions';

interface WidgetsUser {
  id: number;
  user_id: number;
  style: string;
  created_at: string;
}

interface Widgets {
  id: number;
  title: string;
  description: string;
  created_at: '2020-08-04T14:28:45+00:00';
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  const dispatch: Dispatch<any> = useDispatch();
  useSelector(state => console.log('state: ', state));

  const formRef = useRef<FormHandles>(null);

  const [loading, setLoading] = useState(false);
  const [widgets, setWidgets] = useState<Widgets[]>([
    {
      id: 1,

      title: 'Desconectados',
      description:
        'Este widget serve para mostar os usuários desconectados do sistema.',

      created_at: '2020-08-04T14:28:45+00:00',
    },
    {
      id: 2,

      title: 'Atendimentos previstos',
      description: 'Este widget serve para ......',

      created_at: '2020-08-04T14:28:45+00:00',
    },
    {
      id: 3,

      title: 'Performance da equipe',
      description: 'Este widget serve para ......',

      created_at: '2020-08-04T14:28:45+00:00',
    },
    {
      id: 4,

      title: 'Desempenho da equipe',
      description: 'Este widget serve para ......',

      created_at: '2020-08-04T14:28:45+00:00',
    },
    {
      id: 5,

      title: 'Colaboradores',
      description: 'Este widget serve para ......',

      created_at: '2020-08-04T14:28:45+00:00',
    },
    {
      id: 6,

      title: 'Dados aguardando transmissão',
      description: 'Este widget serve para ......',

      created_at: '2020-08-04T14:28:45+00:00',
    },
    {
      id: 7,

      title: 'Não iniciaram atendimento',
      description: 'Este widget serve para ......',

      created_at: '2020-08-04T14:28:45+00:00',
    },
    {
      id: 8,

      title: 'Colaboradores 2',
      description: 'Este widget serve para ......',

      created_at: '2020-08-04T14:28:45+00:00',
    },
  ]);
  const [widgetsUser, setWidgetsUser] = useState<WidgetsUser[]>([
    {
      id: 18,
      user_id: 2,

      style: 'basic',

      created_at: '2020-08-14T18:16:55+00:00',
    },
    {
      id: 19,
      user_id: 2,

      style: 'graph',

      created_at: '2020-08-14T18:17:01+00:00',
    },
    {
      id: 17,
      user_id: 2,

      style: 'basic',

      created_at: '2020-08-14T18:16:34+00:00',
    },
    {
      id: 22,
      user_id: 2,

      style: 'table',

      created_at: '2020-08-14T18:25:52+00:00',
    },
    {
      id: 20,
      user_id: 2,

      style: 'basic',

      created_at: '2020-08-14T18:25:17+00:00',
    },
    {
      id: 21,
      user_id: 2,

      style: 'basic',

      created_at: '2020-08-14T18:25:33+00:00',
    },
    {
      id: 24,
      user_id: 2,

      style: 'basic',

      created_at: '2020-08-14T18:43:31+00:00',
    },
  ]);

  useEffect(() => {
    (async function getWidgets() {
      try {
        setLoading(true);

        // const { data } = await api.get('/users/2/widgets');
        // dispatch(AuthActions.updateWidgetsUser(data.data));
        // setWidgetsUser(data.data);

        // const { data: data2 } = await api.get('/widgets');
        // dispatch(AuthActions.updateWidgets(data2.data));
        // setWidgets(data2.data);
      } catch (error) {
        toast.error('Ocorreu um erro ao buscar os widgets.');
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch]);

  // const auth: readonly IAuthState[] = useSelector(
  //   (state: IAuthState) => state.auth,
  // );

  // const handleSubmit: SubmitHandler<FormData> = async values => {
  //   dispatch(AuthActions.updateUser(values));
  // };

  const handleExit = () => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(AuthActions.updateUser({}));
    dispatch(AuthActions.updateWidgets([{}]));
    dispatch(AuthActions.updateWidgetsUser([{}]));
    history.push('/');
  };

  return (
    <>
      {loading ? (
        <div className="container">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Navbar bg="light" expand="lg">
            <div className="center w-100">
              <img width="380" src="/assets/images/logo.png" alt="logo" />
            </div>
            <Nav.Link onClick={handleExit}>Sair</Nav.Link>
          </Navbar>

          <Row className="p-20">
            <h3>Widgets By User</h3>
            <Row>
              {widgetsUser.map(item => (
                <Col sm="6" md="4" lg="3" key={item.id}>
                  <Card>
                    <Card.Body>
                      <Card.Title>
                        <b>user_id: </b>
                        {item.user_id}
                      </Card.Title>
                      <Card.Text>
                        <b>style: </b>
                        {item.style}
                      </Card.Text>
                      <div />
                      <span>
                        <small>criado em </small>
                        {/* {format(item.created_at, 'dd-MM-yyyy')} */}
                        12/20/2000
                      </span>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Row>

          <Row className="p-20">
            <h3>Widgets</h3>
            <Row>
              {widgets.map(item => (
                <Col sm="6" md="4" lg="3" key={item.id}>
                  <Card>
                    <Card.Body>
                      <Card.Title className="title">{item.title}</Card.Title>
                      <Card.Text>{item.description}</Card.Text>
                      <div />
                      <span>
                        <small>criado em </small>
                        {/* {format(item.created_at, 'dd-MM-yyyy')} */}
                        12/20/2000
                      </span>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Row>
        </>
      )}
    </>
  );
};

export default Dashboard;
