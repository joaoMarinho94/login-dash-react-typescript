import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Spinner, Nav, Navbar, Row, Col, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';

import './styles.css';
import api from '../../services/api';
import * as AuthActions from '../../redux/auth/actions';
import { RootState } from '../../redux/index';

const Dashboard: React.FC = () => {
  const history = useHistory();
  const dispatch: Dispatch = useDispatch();

  const { user, widgets, widgetsUser } = useSelector(
    (state: RootState) => state.auth,
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.token) {
      history.push('/');
      return;
    }

    (async function getWidgets() {
      try {
        const { data } = await api.get('/users/2/widgets');
        dispatch(AuthActions.updateWidgetsUser(data.data));

        const { data: data2 } = await api.get('/widgets');
        dispatch(AuthActions.updateWidgets(data2.data));
      } catch (error) {
        toast.error('Ocorreu um erro ao buscar os widgets.');
      } finally {
        setLoading(false);
      }
    })();
  }, [dispatch, user.token, history]);

  const handleExit = () => {
    sessionStorage.clear();
    localStorage.clear();
    dispatch(AuthActions.clearUser());
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
            <Col>
              <h3>Informações do Usuário Conectado:</h3>
              <h5>
                <b>Username: </b>
                {user.username}
              </h5>
              <h5>
                <b>Status: </b>
                {user.active ? 'Ativo' : 'Inativo'}
              </h5>
              <h5>
                <b>Id: </b>
                {user.id}
              </h5>
              <h5>
                <b>Conta: </b>
                {user.account}
              </h5>
            </Col>
          </Row>

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
                        {item.created_at &&
                          format(new Date(item.created_at), 'dd/MM/yyyy')}
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
                        {item.created_at &&
                          format(new Date(item.created_at), 'dd/MM/yyyy')}
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
