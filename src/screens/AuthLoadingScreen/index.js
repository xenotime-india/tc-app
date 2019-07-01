import React from 'react';
import { StatusBar, ImageBackground } from 'react-native';
import { Container, Spinner } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { checkInternetConnection } from 'react-native-offline';
import ErrorModal from './ErrorModal';

import defaultConnector from './../../redux/defaultConnector';

class AuthLoadingScreen extends React.Component {
  state = {
    errorModalVisible: false,
  };
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const isConnected = await checkInternetConnection();
    if (isConnected) {
      this.props.userActions.verifyLogin(
        () => {
          this.props.navigation.dispatch(
            NavigationActions.navigate({ routeName: 'App' })
          );
        },
        () => {
          this.props.navigation.dispatch(
            NavigationActions.navigate({ routeName: 'Auth' })
          );
        }
      );
    } else {
      this.setState({
        errorModalVisible: true,
      });
    }
  };

  hideModal = () => {
    this.setState({
      errorModalVisible: false,
    });
    this._bootstrapAsync();
  };

  // Render any loading content that you like here
  render() {
    console.log(this.props.network);
    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <ImageBackground
          source={require('./../../../assets/images/splash/splash.png')}
          resizeMode="cover"
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ErrorModal
            modalVisible={this.state.errorModalVisible}
            hideModal={this.hideModal}
            message={'No Internet Connection'}
          />
          <Spinner color="#FFFFFF" />
        </ImageBackground>
      </Container>
    );
  }
}

export default defaultConnector(AuthLoadingScreen);
