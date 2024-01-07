import { Alert, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)

  function handleLogin() {
    axios.post('/users/login', {
      email,
      password
    })
    .then(() => {
      setRedirect(true)
    })
    .catch((error) => {
      setShow(true)
      console.log(error.response.data);
    }) 
  }

  if (redirect) {
    
    return <Navigate to={'/feeds'}/>
  }

  return (
    <>
    <Menu />
      <Alert show={show} variant="warning">
        <Alert.Heading>My Alert</Alert.Heading>
        <p>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
          lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
          fermentum.
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(!show)} variant="outline-success">
            Close me
          </Button>
        </div>
      </Alert>
      <div className="form-style">
        <Form>
        <h1 className="feeds-header">Log in</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" 
            placeholder="Enter email" 
            onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button onClick={handleLogin}>Log in</Button>
        </Form>
      </div>
      <Footer />
    </>
  );
}
