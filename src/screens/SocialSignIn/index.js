import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, ImageBackground, StatusBar, Linking } from 'react-native';
import {
  Container,
  Text,
  Button,
  View,
  Spinner,
  Content,
  Form,
  Footer,
  Icon,
} from 'native-base';
import * as yup from 'yup';
import { NavigationActions } from 'react-navigation';
import { Formik, Field } from 'formik';

import LoginInput from './../../components/LoginInput';
import Notification from './../../components/Notification';
import defaultConnector from './../../redux/defaultConnector';

import styles from './styles';

class SocialSignIn extends Component {
  static propTypes = {
    navigation: PropTypes.shape({ dispatch: PropTypes.func.isRequired }),
    user: PropTypes.shape({
      loginStarted: PropTypes.bool,
      loginSuccess: PropTypes.bool,
      loginErrorMsg: PropTypes.string,
      loginError: PropTypes.bool,
    }),
    userActions: PropTypes.shape({
      doLogin: PropTypes.func,
      doRedirectLogin: PropTypes.func,
    }),
  };

  static defaultProps = {
    user: {
      loginStarted: false,
      loginSuccess: false,
      loginError: false,
    },
  };

  handleSubmit = values => {
    this.props.userActions.doLogin(values.username, values.password, () => {
      console.log('4');
      this.props.navigation.dispatch(
        NavigationActions.navigate({ routeName: 'App' })
      );
    });
  };

  loginWithAuth0 = () => {
    this.props.userActions.doRedirectLogin(() => {
      this.props.navigation.dispatch(
        NavigationActions.navigate({ routeName: 'App' })
      );
    });
  };

  openPrivacyPolicy = () => {
    const { navigation } = this.props;
    navigation.navigate('PrivacyPolicy');
  };

  render() {
    const { navigation, user } = this.props;
    const { loginStarted, loginError, loginErrorMsg } = user || {};
    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <ImageBackground
          source={require('./../../../assets/images/background1.png')}
          resizeMode="cover"
          style={styles.background}>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={yup.object().shape({
              username: yup
                .string()
                .email()
                .required(),
              password: yup.string().required(),
            })}
            onSubmit={(values, actions) => {
              this.handleSubmit(values);
            }}
            render={props => (
              <>
                <Content showsVerticalScrollIndicator={false}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.header.wrapper}>
                      <Image
                        source={require('./../../../assets/images/logo.png')}
                        style={styles.header.logo}
                      />
                      {loginError && loginErrorMsg && (
                        <Notification
                          message={loginErrorMsg}
                          buttonText="Retry"
                          duration={5000}
                          position="top"
                          type="danger"
                        />
                      )}
                    </View>
                    <Form>
                      <Field
                        type="username"
                        component={LoginInput}
                        name="username"
                        icon="user"
                        touched={props.touched}
                        keyboardType="email-address"
                        textContentType="username"
                        placeholder="Username"
                        onBlur={props.handleBlur('username')}
                        onChangeText={props.handleChange('username')}
                      />
                      <Field
                        type="password"
                        component={LoginInput}
                        name="password"
                        touched={props.touched}
                        placeholder="Password"
                        icon="lock"
                        textContentType="password"
                        secureTextEntry={true}
                        onBlur={props.handleBlur('password')}
                        onChangeText={props.handleChange('password')}
                      />

                      <View style={styles.account.container}>
                        <Button
                          small
                          transparent
                          onPress={this.openPrivacyPolicy}>
                          <Text style={styles.account.signUpBtn}>
                            Privacy Policy
                          </Text>
                        </Button>
                        <Button
                          small
                          transparent
                          onPress={() =>
                            Linking.openURL(
                              'mailto:app.support@us.artofliving.org'
                            )
                          }>
                          <Text style={styles.account.resetPwdBtn}>
                            Help & Support
                          </Text>
                        </Button>
                      </View>
                    </Form>
                  </View>
                </Content>
                <Footer style={styles.footer}>
                  <View style={{ flex: 1 }}>
                    <Button
                      large
                      primary
                      block
                      full
                      onPress={props.handleSubmit}
                      disabled={!props.isValid}>
                      {loginStarted ? (
                        <Spinner color="#fff" />
                      ) : (
                        <Text>Sign In</Text>
                      )}
                    </Button>
                    {/*<View style={[styles.social.container]}>
                      <TouchableOpacity onPress={this.loginWithAuth0}>
                        <Icon name="logo-google" style={styles.social.icon} />
                      </TouchableOpacity>
                      <View style={{ padding: 40 }} />
                      <TouchableOpacity onPress={this.loginWithAuth0}>
                        <Icon name="logo-facebook" style={styles.social.icon} />
                      </TouchableOpacity>
                    </View>*/}
                  </View>
                </Footer>
              </>
            )}
          />
        </ImageBackground>
      </Container>
    );
  }
}

export default defaultConnector(SocialSignIn);
