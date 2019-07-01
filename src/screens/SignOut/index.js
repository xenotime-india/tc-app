import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, ImageBackground, StatusBar } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
  Container,
  Text,
  Button,
  View,
  Spinner,
  Content,
  Footer,
} from 'native-base';
import Notification from './../../components/Notification';
import defaultConnector from './../../redux/defaultConnector';

import styles from './styles';

class SignOut extends Component {
  static propTypes = {
    user: PropTypes.shape({
      logoutStarted: PropTypes.bool,
      logoutSuccess: PropTypes.bool,
      logoutError: PropTypes.bool,
    }),
    userActions: PropTypes.shape({
      doLogout: PropTypes.func.isRequired,
    }),
    navigation: PropTypes.shape({ dispatch: PropTypes.func.isRequired }),
  };

  static defaultProps = {
    user: {
      logoutStarted: false,
      logoutSuccess: false,
      logoutError: false,
    },
  };

  handleSubmit = () => {
    this.props.userActions.doLogout(() => {
      this.props.navigation.dispatch(
        NavigationActions.navigate({ routeName: 'Auth' })
      );
    });
  };

  render() {
    const { user, navigation } = this.props;
    const { logoutStarted, logoutError } = user || {};
    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <ImageBackground
          source={require('./../../../assets/images/background1.png')}
          style={styles.background}>
          <Content showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1 }}>
              <View style={styles.header.wrapper}>
                <Image
                  source={require('./../../../assets/images/logo.png')}
                  style={styles.header.logo}
                />
                {logoutError && (
                  <Notification
                    message="Invalid username or password!"
                    buttonText="Retry"
                    duration={5000}
                    position="top"
                    type="danger"
                  />
                )}
              </View>
              <View style={{ justifyContent: 'center' }}>
                <Text
                  style={{ alignSelf: 'center', color: '#FFF', fontSize: 24 }}>
                  Are you sure you want to logout?
                </Text>
              </View>
            </View>
          </Content>
          <Footer style={styles.footer}>
            <View style={{ flex: 1 }}>
              <Button large primary block full onPress={this.handleSubmit}>
                {logoutStarted ? (
                  <Spinner color="#fff" />
                ) : (
                  <Text>Yes, Sign me out</Text>
                )}
              </Button>
              <Button transparent full onPress={() => navigation.goBack()}>
                <Text style={styles.signout.linkText}>No, </Text>
                <Text style={styles.signout.linkBtn}>Keep me signed in</Text>
              </Button>
            </View>
          </Footer>
        </ImageBackground>
      </Container>
    );
  }
}

export default defaultConnector(SignOut);
