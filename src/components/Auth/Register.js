import React from "react";
import { Grid, Header, Icon, Form, Segment, Button, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

class Register extends React.Component {

    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: [],
        loading: false
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.isFormValid()) {
            this.setState({ errors: [], loading: true })
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.state.email, this.state.password)
                .then(createdUser => {
                    this.setState({ loading: false })
                    console.log(createdUser)
                })
                .catch(error => {
                    this.setState({ loading: false, errors: this.state.errors.concat(error) })
                    console.log(error)
                })
        }
    }

    isFormValid = () => {
        let errors = [];
        let error;

        if (this.isFormEmpty(this.state)) {
            error = { message: "Fill in all fields !" }
            this.setState({ errors: errors.concat(error) })
            return false;
        } else if (!this.isPasswordValid(this.state)) {
            error = { message: "Password is invalid" }
            this.setState({ errors: errors.concat(error) })
            return false
        } else {
            return true;
        }
    }
    //check if form empty
    isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
        return !username.length || !email.length || !password.length || !passwordConfirmation.length
    }

    isPasswordValid = ({ password, passwordConfirmation }) => {
        if (password.length < 6 || passwordConfirmation.length < 6) {
            return false;
        }
        else if (password !== passwordConfirmation) {
            return false;
        } else {
            return true;
        }
    }

    displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>)

    handleInputError = (errors, inputName) => {
        return errors.some(error => error.message.toLowerCase().includes(inputName)) ? 'error' : ''
    }

    render() {
        const { username, email, password, passwordConfirmation, errors, loading } = this.state;
        return (
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as="h2" icon color="violet" textAlign="center">
                        <Icon name="houzz" />
                        Register for Otaku-Chat
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked color='violet'>
                            <Form.Input
                                name="username"
                                icon="user secret"
                                iconPosition="left"
                                placeholder="User Name"
                                fluid
                                onChange={this.handleChange}
                                type="text"
                                value={username}
                                className={this.handleInputError(errors, 'username')}
                            />
                            <Form.Input
                                name="email"
                                icon="mail"
                                iconPosition="left"
                                placeholder="Email"
                                fluid
                                onChange={this.handleChange}
                                type="email"
                                value={email}
                                className={this.handleInputError(errors, 'email')}
                            />
                            <Form.Input
                                name="password"
                                icon="lock"
                                iconPosition="left"
                                placeholder="Password"
                                fluid
                                onChange={this.handleChange}
                                type="password"
                                value={password}
                                className={this.handleInputError(errors, 'password')}
                            />
                            <Form.Input
                                name="passwordConfirmation"
                                icon="repeat"
                                iconPosition="left"
                                placeholder="Password Confirmation"
                                fluid
                                onChange={this.handleChange}
                                type="password"
                                value={passwordConfirmation}
                                className={this.handleInputError(errors, 'password')}
                            />
                            <Button
                                color="violet"
                                fluid
                                size="large"
                                className={loading ? 'loading' : ''}
                                disabled={loading}>Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Errors</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>
                        Already a user? <Link to="/login">Login</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register;