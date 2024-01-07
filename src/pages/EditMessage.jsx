import { Button, Form } from "react-bootstrap";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditMessage() {
  let { msgId } = useParams();
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState(
  `this is a message`
  )
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/messages/${msgId}`)
      console.log(response.data.msgData.content);
      setMessage(response.data.msgData.content)
    }
    console.log(msgId);
    fetchData()
  },[])

  function handleEdit(e) {
    e.preventDefault()
    axios.put(`/messages/${msgId}`, {
      message
    })
    .then(() => {
      setRedirect(true)
    })
  }

  if(redirect) {
    return <Navigate to={'/account'} />
  }

  return (
    <>
      <Menu />
      <div className="form-style">
        <Form>
          <h1 className="feeds-header">Edit a message</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" 
            className="form-textarea"
            placeholder="Enter message" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Button onClick={handleEdit}>Edit</Button>
        </Form>
      </div>
      <Footer />
    </>
  );
}
