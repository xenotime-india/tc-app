import React, { Component } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { DrawerActions } from 'react-navigation';
import {
  Container,
  Content,
  Icon,
  Thumbnail,
  Button,
  Header,
  Left,
  Right,
  Footer,
  Text,
  View,
} from 'native-base';
import Constants from 'expo-constants';
import { BUILD_ENV } from 'react-native-dotenv';

import MenuItem from './MenuItem';
import styles from './styles';
import { routes } from './config';
import defaultConnector from './../../redux/defaultConnector';
import theme from './../../theme/variables/myexpense';

const avatar = require('./../../../assets/images/avatar1.png');
class SideBar extends Component {
  version = `${BUILD_ENV} - ${Constants.manifest.version}`;
  state = {
    selected: '',
  };
  onPressItem = route => {
    this.setState(() => ({
      selected: route,
    }));
    this.props.navigation.navigate(route);
  };
  renderMenuItem = ({ item }) => (
    <MenuItem
      id={item.route}
      onPressItem={this.onPressItem}
      selected={this.state.selected === item.route}
      title={item.title}
      icon={item.icon}
    />
  );
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 0.8,
          backgroundColor: 'rgba(29, 29, 38, 0.2)',
        }}
      />
    );
  };
  render() {
    const { navigation, profilePic } = this.props;

    return (
      <Container style={{ backgroundColor: theme.brandPrimary }}>
        <Header transparent style={styles.header.container}>
          <Left style={{ flex: 1 }}>
            <Button
              transparent
              onPress={() =>
                navigation.dispatch(DrawerActions.toggleDrawer({}))
              }>
              <Icon
                type="SimpleLineIcons"
                name="arrow-right"
                style={styles.header.icon}
              />
            </Button>
          </Left>
          <Right>
            <TouchableOpacity
              style={{ alignSelf: 'flex-end' }}
              onPress={() => {
                navigation.navigate('Profile');
              }}>
              <Thumbnail
                source={profilePic || avatar}
                style={styles.header.avatar}
              />
            </TouchableOpacity>
          </Right>
        </Header>
        <Content style={styles.content}>
          <FlatList
            initialNumToRender={8}
            data={routes}
            renderItem={this.renderMenuItem}
            keyExtractor={item => item.route}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </Content>
        <Footer>
          <Text style={styles.footerAppTitleText}>
            AOLF Teacher Version: {this.version}
          </Text>
        </Footer>
      </Container>
    );
  }
}
export default defaultConnector(SideBar);
