import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import { Container, Icon, View, Text, Content } from 'native-base';

import AppHeader from './../../components/AppHeader';

import styles from './styles';

class ComingSoonScreen extends Component {
  render() {
    return (
      <Container>
        <ImageBackground
          source={require('./../../../assets/images/wip.gif')}
          style={styles.container}>
          <AppHeader
            title="WIP"
            displayAvatar={false}
            displayLogo={false}
            navigation={this.props.navigation}
          />
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1 }}
            style={styles.emptyContent}>
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyMsg}>Coming Soon!</Text>
            </View>
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

export default ComingSoonScreen;
