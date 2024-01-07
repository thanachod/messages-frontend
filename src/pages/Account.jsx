import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Menu from "../components/Menu";
import axios from "axios";
import { Button, Card, Placeholder } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

export default function Account() {
  const [userAccount, setUserAccount] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [msgList, setMsgList] = useState([]);
  const {user} = useContext(UserContext);
  

  useEffect(() => {
    
    if(!isLoading && user){
        const fetchData = async () => {
            try {
              
              const response = await axios.get(
                `/messages/get-messages/${user.id}`
              );
      
              setMsgList(response.data.dataList);
              
            } catch (error) {
              console.error("Error fetching messages:", error);
            }
          };
          
          fetchData(); // Call the function
          
    }
    
    if(user){
        setIsLoading(false)
    }
    
    
  }, [isLoading, user]);

//   if(!user){
//     return <Navigate to={'/login'} />
//   }



  function handleDelete(e) {
    e.preventDefault()
    
    axios.delete(`/messages/${e.target.value}`)
    .then(async () => {
        const response = await axios.get(
            `/messages/get-messages/${user.id}`
          );
  
        setMsgList(response.data.dataList);
    })
    
  }

  return (
    <>
      <Menu />
      <div>
        <div>
          {!user ? (
            "no user"
          ) : (
            <>
              <div>
                <div>{userAccount.email}</div>
                <div className="general-style">
                  {!msgList ? (
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
                              <cite title="Source Title"></cite>
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
                          <div>
                          <Button variant="info"
                            value={item._id}
                            // onClick={handleEdit}
                            href={`/edit-message/${item._id}`}
                            >Edit</Button>
                            <Button variant="danger"
                            value={item._id}
                            onClick={handleDelete}
                            >Delete</Button>
                          </div>
                        </Card>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
