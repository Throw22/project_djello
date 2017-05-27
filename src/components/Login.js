import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

const Login = ({ onLoginSubmit }) => (
  <Container>
    <Row>
      <Col>
        <Form
          style={{ margin: 'auto', width: '50%', paddingTop: '30px' }}
          inline
          onSubmit={onLoginSubmit}
        >
          <FormGroup>
            <Label for="username" hidden>Username</Label>{' '}
            <Input
              type="text"
              name="user[username]"
              id="username"
              placeholder="Username"
            />
          </FormGroup>
          {' '}
          <FormGroup>
            <Label for="password" hidden>Password</Label>{' '}
            <Input
              type="password"
              name="user[password]"
              id="password"
              placeholder="Password"
            />
          </FormGroup>
          {' '}
          <Button>Submit</Button>
        </Form>
        {/* <form onSubmit={onLoginSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="user[username]" />
          <label htmlFor="username">Password</label>
          <input type="password" id="password" name="user[password]" />
          <input type="submit" value="Log In" />
        </form> */}
      </Col>
    </Row>
  </Container>
);

export default Login;
