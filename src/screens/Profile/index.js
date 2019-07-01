import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, ScrollView } from 'react-native';
import { Container, Thumbnail, View, Text } from 'native-base';

import AppHeader from './../../components/AppHeader';
import Contact from './Contact';
import Overview from './Overview';
import Social from './Social';
import styles from './styles';
import defaultConnector from './../../redux/defaultConnector';

const avatar = require('./../../../assets/images/avatar1.png');

class Profile extends Component {
  static propTypes = {
    navigation: PropTypes.any,
    profile: PropTypes.object,
  };

  render() {
    const { navigation, profile, profilePic } = this.props;
    console.log(profile);
    return (
      <Container>
        <ImageBackground
          source={require('./../../../assets/images/header-bg-big.png')}
          style={styles.container}>
          <AppHeader
            displayAvatar={false}
            displayLogo={false}
            navigation={navigation}
          />
          <View style={styles.profile.container}>
            <Thumbnail
              source={profilePic || avatar}
              style={styles.profile.avatar}
            />
            <Text style={styles.profile.title}>{profile.name}</Text>
          </View>
          <ScrollView style={styles.content}>
            <View style={styles.container}>
              {/*<Overview navigation={navigation} />*/}
              <View style={styles.separator} />
              <Contact
                type="phone"
                name={'Mobile'}
                number={profile.personMobilePhone}
              />
              <View style={styles.separator} />
              <Contact
                type="email"
                name={'Personal'}
                number={profile.email ? profile.email : profile.emailAdress}
              />
              <View style={styles.separator} />
            </View>
          </ScrollView>
        </ImageBackground>
      </Container>
    );
  }
}

export default defaultConnector(Profile);
