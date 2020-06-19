import {Auth} from 'aws-amplify';
import React, { Component } from 'react';
import LoaderButton from './components/LoaderButton';
import { FormLabel, FormGroup, FormControl} from 'react-bootstrap';
import {Col, Row} from "react-bootstrap";

export default class ForgetPassword extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            username: '',
            confirmationCode: '',
            password: '',
            hasForgotten: false
        };
    }

    validateForgetPassword() {
        return (
            this.state.username.length > 0
        );
    }

    validateResetPassword() {
        return (this.state.username.length > 0 &&
            this.state.confirmationCode.length > 0 &&
            this.state.password.length > 0    
        )
    }

    handleChange = event => {
		this.setState({
			[event.target.id]: event.target.value
		});
	};

    handleForgetPasswordSubmit = async event => {
        event.preventDefault();

        console.log(this.state.username)

		this.setState({ isLoading: true });

		try {
			await Auth.forgotPassword(
                this.state.username
            );
		} catch (e) {
            console.log('error in forget!')
			alert(e.message);
		}
        this.setState({hasForgotten: true});
		this.setState({ isLoading: false });
	};

    handleResetPasswordSubmit = async event => {
        event.preventDefault();
        this.setState({isLoading: true});
        
        try{await Auth.forgotPasswordSubmit(
            this.state.username, 
            this.state.confirmationCode,
            this.state.password
        )}
        catch (e){
            console.log('error in submitting new password')
            alert(e.message)
        }

        try {
            await Auth.signIn(this.state.username, this.state.password);
            this.props.userHasAuthenticated(true);
            this.props.history.push('/');
            console.log('loggedin');
        } catch (e){
            console.log('error in signing in')
            alert(e.message);
        }
        this.setState({isLoading: false});
    }

    renderResetPasswordSubmitForm() {
		return (
			<form onSubmit={this.handleResetPasswordSubmit}>
                <FormGroup controlId="username">
                    <FormLabel>Username: {this.state.username}</FormLabel>
                </FormGroup>
				<FormGroup controlId="confirmationCode" bsSize="large">
					<FormLabel>Confirmation Code</FormLabel>
					<FormControl autoFocus type="tel" value={this.state.confirmationCode} onChange={this.handleChange} />
					{/* <HelpBlock>Please check your email for the code.</HelpBlock> */}
				</FormGroup>
                <FormGroup controlId="password">
					<FormLabel>Your New Password</FormLabel>
					<FormControl autoFocus type="password" value={this.state.password} onChange={this.handleChange} />
					{/* <HelpBlock>Please check your email for the code.</HelpBlock> */}
				</FormGroup>
				<LoaderButton
					block
					bsSize="large"
					disabled={!this.validateResetPassword()}
					type="submit"
					isLoading={this.state.isLoading}
					text="Updating your password"
					loadingText="Updating your password…"
				/>
			</form>
		);
	}

	renderForgetPasswordForm() {
		return (
			<form onSubmit={this.handleForgetPasswordSubmit}>
                <FormGroup controlId="username">
                    <FormLabel>Username</FormLabel>
                    <FormControl type="username" value={this.state.username} onChange={this.handleChange} />
                </FormGroup>
				<LoaderButton
					block
					bsSize="large"
					disabled={!this.validateForgetPassword()}
					type="submit"
					isLoading={this.state.isLoading}
					text="Validate Email and Reset Your Password"
					loadingText="Retrieving…"
				/>
			</form>
		);
	}

	render() {
		return (
            <Row className="justify-content-md-center my-5">
                <Col md='3' className='dark'>
			        <div className="ForgetPassword">{this.state.hasForgotten === false ? this.renderForgetPasswordForm() : this.renderResetPasswordSubmitForm()}</div>
                </Col>
            </Row>
        );
	}
}