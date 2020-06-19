import {Auth} from 'aws-amplify';
import React, { Component } from 'react';
import LoaderButton from './components/LoaderButton';
import { FormLabel, FormGroup, FormControl, Col, Row} from 'react-bootstrap';

export default class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            confirmationCode: '',
            newUser: null
        };
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.username.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
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
			const newUser = await Auth.signUp({
                username: this.state.username,
                password: this.state.password,
                attributes: {
                    email: this.state.email
                }
			});
			this.setState({
				newUser
			});
		} catch (e) {
			alert(e.message);
		}

		this.setState({ isLoading: false });
	};

    handleConfirmationSubmit = async event => {
        event.preventDefault();
        this.setState({isLoading: true});
        try {
            await Auth.confirmSignUp(this.state.username, this.state.confirmationCode);
            console.log('confimed');
            await Auth.signIn(this.state.username, this.state.password);
            console.log('signed in');
            this.props.userHasAuthenticated(true);
            this.props.history.push('/');
            console.log('loggedin');
        } catch (e){
            alert(e.message);
        }
        this.setState({isLoading: false});
    }

    renderConfirmationForm() {
		return (
			<form onSubmit={this.handleConfirmationSubmit}>
				<FormGroup controlId="confirmationCode" bsSize="large">
					<FormLabel>Confirmation Code</FormLabel>
					<FormControl autoFocus type="tel" value={this.state.confirmationCode} onChange={this.handleChange} />
					{/* <HelpBlock>Please check your email for the code.</HelpBlock> */}
				</FormGroup>
				<LoaderButton
					block
					bsSize="large"
					disabled={!this.validateConfirmationForm()}
					type="submit"
					isLoading={this.state.isLoading}
					text="Verify"
					loadingText="Verifying…"
				/>
			</form>
		);
	}

	renderForm() {
		return (
			<form onSubmit={this.handleSubmit}>
                <FormGroup controlId="username" bsSize="large">
                    <FormLabel>Username</FormLabel>
                    <FormControl type="username" value={this.state.username} onChange={this.handleChange} />
                </FormGroup>
				<FormGroup controlId="email" bsSize="large">
					<FormLabel>Email</FormLabel>
					<FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange} />
				</FormGroup>
				<FormGroup controlId="password" bsSize="large">
					<FormLabel>Password</FormLabel>
					<FormControl value={this.state.password} onChange={this.handleChange} type="password" />
				</FormGroup>
				<FormGroup controlId="confirmPassword" bsSize="large">
					<FormLabel>Confirm Password</FormLabel>
					<FormControl value={this.state.confirmPassword} onChange={this.handleChange} type="password" />
				</FormGroup>
				<LoaderButton
					block
					bsSize="large"
					disabled={!this.validateForm()}
					type="submit"
					isLoading={this.state.isLoading}
					text="Signup"
					loadingText="Signing up…"
				/>
			</form>
		);
	}

	render() {
		return (
			<div className="Signup">
				<Row className="justify-content-md-center my-5">
                	<Col md='3' className='dark'>
						{this.state.newUser === null ? this.renderForm() : this.renderConfirmationForm()}
					</Col>
				</Row>
			</div>
		);
	}
}