import React, { Component } from 'react';
import { StatusBar, WebView } from 'react-native';
import { Container, Content } from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import AppHeader from './../../components/AppHeader';

class PrivacyPolicyScreen extends Component {
  state = { visible: true };

  showSpinner = () => {
    this.setState({ visible: true });
  };

  hideSpinner = () => {
    this.setState({ visible: false });
  };
  render() {
    const { navigation } = this.props;
    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <AppHeader
          hideDrawerButton
          displayBackBtn
          navigation={navigation}
          title="Privacy Policy"
        />
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}>
          <Spinner
            visible={this.state.visible}
            textContent={'Loading...'}
            textStyle={{ color: '#FFF' }}
          />
          <WebView
            scalesPageToFit
            source={{ uri: 'https://www.artofliving.org/us-en/privacy-policy' }}
            onLoadStart={this.showSpinner}
            onLoad={this.hideSpinner}
          />
        </Content>
      </Container>
    );
  }
}

export default PrivacyPolicyScreen;
