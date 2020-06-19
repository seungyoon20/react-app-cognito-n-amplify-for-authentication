import {Component} from 'react';
import { Container, Button, Row, Col} from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import React from 'react';
import Tooltip from "react-simple-tooltip"

class TestBody extends Component {
    constructor(props){
        super(props);
        this.state = {
            user: "",
            email: "",
            email_verified: "",
            response: ""
        };
    }

    checkUser = async event => {
        try {
            const user = await Auth.currentAuthenticatedUser()
            this.setState({user: `${user.username}`, email: `${user.attributes.email}`, email_verified: `${user.attributes.email_verified}`})
        } catch (e) {
            this.setState({user: e})
        }
    }

    requestAPI = async event => {
        try {
            const user = await Auth.currentAuthenticatedUser()
            user.getSession((err, session) => {
                if(err) {
                    throw new Error(err);
                }
                // console.log(user)
                
                const sessionToken = session.getIdToken().jwtToken;
                // console.log(sessionToken)
                fetch('<An API endpoint uri that requires authentication>', {
                    mode: 'cors',  
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionToken
                    }
                }).then(
                    response => response.json()
                ).then(res => {
                    this.setState({response: res})
                })
            })
        } 
         catch (e){
            this.setState({response: e})
        }
        
  
        
    }

    render () {
        return (
            <Container>
                <Tooltip radius="10" content="Available functions: Sign In, Sign Up, Forgot Password" placement="bottom">
                    <h2>Easy Authentication w/ AWS Cognito & Amplify </h2>
                </Tooltip>
                <Row className="justify-content-md-center my-8" style={{textAlign: 'left'}}>
                    <Col className="my-4">
                        <Tooltip radius="10" content="Fetch current authenticated user details🎸" placement="right">
                            <Button onClick={this.checkUser} >Check Current User</Button>
                        </Tooltip>
                        <div>{this.props.isAuthenticated ? `Username: ${this.state.user}` : "Log in first!"}</div>
                        <div>{this.props.isAuthenticated ? `Email: ${this.state.email}` : ""}</div>
                        <div>{this.props.isAuthenticated ? `Is Email Verified: ${this.state.email_verified}` : ""}</div>
                    </Col>
                    <Col className="my-4">
                        <Tooltip radius="10" placement="left" content="This API endpoint requires authentication🤪">
                        <Button onClick={this.requestAPI}>Request API</Button>
                        </Tooltip>
                        <div>{`Reponse: ${this.state.response}`}</div>
                    </Col>
                </Row>

            </Container>
            
        )
        
    }
}
export default TestBody;