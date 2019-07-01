import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import {
  Ionicons,
  Feather,
  SimpleLineIcons,
  FontAwesome,
  Entypo,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { Root, StyleProvider } from 'native-base';
import { Provider } from 'react-redux';

import AppNavigator from './src/navigation/AppNavigator';
import mmoneyTheme from './src/theme/variables/myexpense';
import getTheme from './src/theme/components';
import configureStore from './src/redux/store';

const store = configureStore();

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <StyleProvider style={getTheme(mmoneyTheme)}>
          <Provider store={store}>
            <Root>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <View style={styles.container}>
                <AppNavigator />
              </View>
            </Root>
          </Provider>
        </StyleProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/splash/splash.png'),
        require('./assets/images/logo.png'),
        require('./assets/images/avatar1.png'),
        require('./assets/images/background1.png'),
        require('./assets/images/background2.png'),
        require('./assets/images/header-bg.png'),
        require('./assets/images/header-bg-big.png'),
        require('./assets/images/header2-bg.png'),
        require('./assets/images/Scan-Square.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        ...Feather.font,
        ...SimpleLineIcons.font,
        ...FontAwesome.font,
        ...Entypo.font,
        ...MaterialCommunityIcons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        Roboto_light: require('./assets/fonts/Roboto-Light.ttf'),
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
