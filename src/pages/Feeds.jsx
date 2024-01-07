import { Button, Card, ListGroup, Placeholder } from "react-bootstrap";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Feeds() {
  const [msgList, setMsgList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/messages/get-messages");

        setMsgList(response.data.dataList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchData(); // Call the function
  }, []);

  return (
    <>
      <Menu />
      <div>
        <h1 className="feeds-header">Feeds</h1>
        
        <div className="feeds-style">
        <div>
          <Button href="/create-message">Create a message</Button>
        </div>
          {isLoading ? (
            <>
              <Card>
              <Card.Header>Messages</Card.Header>
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  
                    <Placeholder as={Card.Text} animation="glow">
                      <Placeholder xs={7} /> <Placeholder xs={4} />{" "}
                      <Placeholder xs={4} /> <Placeholder xs={3} />{" "}
                      <Placeholder xs={2} />
                      <Placeholder xs={8} />
                    </Placeholder>
                  
                  <footer className="blockquote-footer">
                    <Placeholder as={Card.Title} animation="glow">
                      <Placeholder xs={6} />
                    </Placeholder>
                    <cite title="Source Title">
                      
                    </cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Card>
            </>
          ) : (
            <>
              {msgList.map((item) => (
                <Card key={item._id}>
                  <Card.Header>Messages</Card.Header>
                  <Card.Body>
                    <blockquote className="blockquote mb-0">
                      <p> {item.content} </p>
                      <footer className="blockquote-footer">
                        {item.author.email}
                        
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Card>
              ))}
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
