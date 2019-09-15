import React from "react";
import { Grid, Header, Icon, Form, Segment, Button, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import firebase from "../../firebase";

class Register extends React.Component {

    state = {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();

        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createdUser => {
                console.log(createdUser)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { username, email, password, passwordConfirmation } = this.state;
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
                            />
                            <Button color="violet" fluid size="large">Submit</Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already a user? <Link to="/login">Login</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        )
    }
}

export default Register;