import { Auth } from 'aws-amplify';
import React, { Component } from 'react';
import { FormGroup, FormControl, FormLabel, NavItem } from 'react-bootstrap';
import LoaderButton from './components/LoaderButton';
import {Col, Row} from "react-bootstrap";
import {IndexLinkContainer} from "react-router-bootstrap"

export default class Login extends Component {
    constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			username: '',
			password: ''
		};
    }
    
    validateForm() {
		return this.state.username.length > 0 && this.state.password.length > 0;
	}

	handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

	handleSubmit = async event => {
		event.preventDefault();

		this.setState({ isLoading: true });

		try {
			await Auth.signIn(this.state.username, this.state.password);
			this.props.userHasAuthenticated(true);
            
            console.log('loggedin');
            // var uri = "https://g88xv8fkge.execute-api.us-west-2.amazonaws.com/default/yixue_get_authorization_url";
            // await Auth.currentSession( session => {
            //     console.log(session)
            // })
            
		} catch (e) {
			alert("error handle submit", e.message);
			this.setState({ isLoading: false });
        }

        const params = new URLSearchParams(this.props.location.search);
        if(params.has('redirect')){
            this.props.history.push('/' + params.get('redirect'));
        }else{
            this.props.history.push('/');
        }

        // Auth.currentAuthenticatedUser()
        //     .then(user => {
        //         // console.log(user)
        //         user.getSession((err, session) => {
        //             if(err) {
        //             throw new Error(err);
        //             }
        //             // console.log(user)
                    
        //             const sessionToken = session.getIdToken().jwtToken;
        //             // console.log(sessionToken)
        //             fetchItems(sessionToken);
        //         })
        //     })
        //     .catch(err => console.log(err));
	};

    render () {
        return (
            <Row className="justify-content-md-center my-5">
                <Col md='3' className='dark'>
                    <div className="Login">
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="username" bsSize="large">
                                <FormLabel>Username/ Email</FormLabel>
                                <FormControl autoFocus type="text" value={this.state.username} onChange={this.handleChange} />
                            </FormGroup>
                            <FormGroup controlId="password">
                                <FormLabel>Password</FormLabel>
                                <FormControl value={this.state.password} onChange={this.handleChange} type="password" />
                            </FormGroup>
                            <LoaderButton
                                block
                                bsSize="large"
                                disabled={!this.validateForm()}
                                type="submit"
                                isLoading={this.state.isLoading}
                                text="Login"
                                loadingText="Logging in…"
                            />
                            {/* <button onClick={() => Auth.federatedSignIn({provider: 'Google'})}>Open Google</button> */}
                        </form>
                        <IndexLinkContainer to="/signup">
                            <NavItem>Don't Have an account?</NavItem>
                        </IndexLinkContainer>
                        <IndexLinkContainer to="/forget-password">
                            <NavItem>Forgot your password?</NavItem>
                        </IndexLinkContainer>

                    </div>
                </Col>
            </Row>
            
        )
    }
}

export function fetchItems(sessionToken) {
    // $.get("https://g88xv8fkge.execute-api.us-west-2.amazonaws.com/default/yixue_get_authorization_url", headers=, function(data, status) {
    //     console.log(data);
    // });
    return fetch('https://g88xv8fkge.execute-api.us-west-2.amazonaws.com/default/yixue_get_authorization_url', {
      mode: 'cors',  
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionToken
      }
    }).then(
        response => response.json()
    ).then(res => {
        console.log(res)
    })
  };