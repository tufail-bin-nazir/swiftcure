import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { emailChanged, passwordChanged, login } from '../actions';

class LoginForm extends Component {

  onEmailChange(text) {
     this.props.emailChanged(text);
  }

  onPasswordChange(text) {
     this.props.passwordChanged(text);
  }

  onLogin() {
    this.props.login({ email: this.props.email, pasword: this.props.password });
  }

  onAuthenticationFail() {
    if (this.props.loginfail) {
      return (
        <Text style={{ color: 'red', textAlign: 'center' }}> Authentication Failed</Text>

      );
    }
  }
  toggleSpinner() {
    if (this.props.loggingin) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.onLogin.bind(this)}>
        LogIn
      </Button>
    );
  }
  render() {
   return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="user@email.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>
        {this.onAuthenticationFail()}
        <CardSection>
          {this.toggleSpinner()}
        </CardSection>
       </Card>
    );
  }

}
const mapStateToProps = (state) => {
  const { email, password, loginfail, loggingin } = state.auth;
  return { email, password, loginfail, loggingin };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, login })(LoginForm);
