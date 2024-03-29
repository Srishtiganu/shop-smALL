import React, {component, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {Container, Row, Col, Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import UserViewManager from './UserViewManager';

export default function Login() {
  //ensure signed out if in the login page. 
  
  

  const [isShownUser, setIsShownUser] = useState(false);
  const [isShownSeller, setIsShownSeller] = useState(false);

  const showSellerLogin = (event) => {
    setIsShownSeller(current => !current);
  }

  const showUserLogin = (event) => {
    setIsShownUser(current => !current);
  }

  return (
    <div> 
      <Container>
        <><style type="text/css"> {`
                    .btn-flat {
                        background-color: #25a47f;
                        color: white;
                        font-family: 'Josefin Sans'
                    }
                    .btn-medium {
                        padding: 1rem 1.5rem;
                        font-size: 1rem;
                        border-radius: "1000px"
                    }
                    `}
                    </style></>
        <Row>
          <Col>
            <Button variant="flat" size="medium" onClick={showUserLogin}>User Portal</Button> 
          </Col>
          <Col>
            <Button variant="flat" size="medium" onClick={showSellerLogin}>Seller Portal</Button>
          </Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </Container>
      <Container>
        {isShownUser && <UserLogIn /> }
      </Container>
      <Container>
        {isShownSeller && <SellerLogIn /> }
      </Container>
    </div>
    );
  }
  
  function UserLogIn() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = new UserViewManager();

    var id = null;
  
    useEffect(() => {
      if(id==null && user.getID()!=null) {
        id = user.getID();
        
      }
    })

    const handleClick = () => {
      user.signIn(email, password); 
      if(id!=null) {
        navigate(`/UserPage/${id}`);
      }
      
    }

    return (
      <div>
        <Form>
          <Form.Group> 
            {/* authenticate stuff, this is placeholder */}
            <Form.Label>User Email</Form.Label>
            <Form.Control onChange={(event)=> setEmail(event.target.value)} type="email"></Form.Control>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
             {/* onChange={(event) => setPassword(event.target.value)}  */}
            <Form.Control onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Session Password" />
          </Form.Group>
          <Button variant="flat" size="medium" onClick={handleClick}>Login</Button>
        </Form>
      </div>
    )
  }
  
  function SellerLogIn() {
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = new UserViewManager();
  
    return (
      <div>
        <Form>
          <Form.Group> 
            {/* authenticate stuff, this is placeholder */}
            <Form.Label>Seller Email</Form.Label>
            <Form.Control onChange={(event)=> setEmail(event.target.value)} type="email"></Form.Control>
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
             {/* onChange={(event) => setPassword(event.target.value)}  */}
            <Form.Control onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Session Password" />
          </Form.Group>
          <Button variant="flat" size="medium" onClick={() => {user.signIn(email, password); navigate("./SellerPage");}}>Login</Button>
        </Form>
      </div>
    )
  }


// function UserLogIn() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const auth = getAuth();
//   const signIn = async (event) => {
//     console.log("in sign in function")
//     event.preventDefault();
//     try {
//       signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         // Signed in 
//         const user = userCredential.user;
//         console.log("logged in!");
//         {navigate(`/UserPage/${user.uid}`)};
//         // ...
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         console.log("in top")
//         const errorMessage = error.message;
//         console.log(errorMessage);
//       });
//         console.log("email: ", email, " pass: ", password);
//     } catch (err) {
//       alert(err);
//     } 
//   }

//   return (
//     <div>
//       <Form>
//         <Form.Group>
//           {/* authenticate stuff, this is placeholder */}
//           <Form.Label>User Email</Form.Label>
//           <Form.Control onChange={(event) => setEmail(event.target.value)} type="email"></Form.Control>
//         </Form.Group>
//         <Form.Group controlId="formPassword">
//           <Form.Label>Password</Form.Label>
//           {/* onChange={(event) => setPassword(event.target.value)}  */}
//           <Form.Control onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Session Password" />
//         </Form.Group>
//         <Button onClick={signIn}>Login</Button>
//       </Form>
//     </div>
//   )
// }

// function SellerLogIn() {
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");

//   return (
//     <div>
//       <Form>
//         <Form.Group>
//           {/* authenticate stuff, this is placeholder */}
//           <Form.Label>Seller Email</Form.Label>
//           <Form.Control onChange={(event) => setEmail(event.target.value)} type="email"></Form.Control>
//         </Form.Group>
//         <Form.Group controlId="formPassword">
//           <Form.Label>Password</Form.Label>
//           {/* onChange={(event) => setPassword(event.target.value)}  */}
//           <Form.Control onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Session Password" />
//         </Form.Group>
//       </Form>
//     </div>
//   )
// }
