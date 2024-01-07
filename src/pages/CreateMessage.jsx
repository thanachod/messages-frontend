import { Button, Form } from "react-bootstrap";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export default function CreateMessage() {
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState('')
  const [authenticated, setAuthenticated] = useState(false);
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    const checkAuthentication =  async () => {
        try{
            
            const response = await axios.get('/users/check-auth')
            if (response.data.success) {
                setAuthenticated(true)
            }
        } catch(error) {
            console.error('Error checking authentication:', error);
        }
    }

  }, [])

  function handleCreate() {
    axios.post('/messages/create-message', {
        message,
    })
    .then(() => {
        setRedirect(true)
    })
    .catch((error) => {
        console.log('Error from create a message. ', error);
    })
  }

  if (redirect) {
    return <Navigate to={'/feeds'}/>
  }

  return (
    <>
      <Menu />
      <div className="form-style">
        <Form>
          <h1 className="feeds-header">Create a message</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea"
            className="form-textarea" 
            placeholder="Enter message" 
            onChange={(e) => setMessage(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Button onClick={handleCreate}>Create</Button>
        </Form>
      </div>
      <Footer />
    </>
  );
}
