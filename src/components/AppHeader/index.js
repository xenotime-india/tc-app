import React, { PureComponent } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Icon,
  Left,
  Right,
  Body,
  Button,
  Header,
} from 'native-base';

import HeaderDrawerButton from './HeaderDrawerButton';
import SearchHeader from './SearchHeader';

const logo = require('./../../../assets/images/logo.png');
const avatar = require('./../../../assets/images/avatar1.png');
import styles from './styles';
import theme from './../../theme/variables/myexpense';

class AppHeader extends PureComponent {
  state = {
    displaySearchBar: false,
  };

  onSearch = query => {
    this.setState({ displaySearchBar: false });
    this.props.onSearch(query);
  };

  render() {
    const { backAction, hideDrawerButton = false } = this.props;
    return (
      <View style={{ zIndex: 999 }}>
        <Header
          transparent
          hasTabs
          style={{
            backgroundColor: theme.brandPrimary,
          }}>
          <Left style={{ flex: 1 }}>
            {this.props.displayBackBtn && (
              <Button
                transparent
                onPress={() =>
                  backAction ? backAction() : this.props.navigation.goBack()
                }>
                <Icon
                  style={styles.navigation}
                  type="SimpleLineIcons"
                  name="arrow-left"
                />
              </Button>
            )}
            {this.props.displaySearch && (
              <Button
                transparent
                onPress={() => {
                  this.setState(() => ({
                    displaySearchBar: !this.state.displaySearchBar,
                  }));
                }}>
                <Icon active name="ios-search" style={{ fontSize: 34 }} />
              </Button>
            )}
          </Left>
          <Body style={{ flex: 1 }}>
            {this.props.title && (
              <View style={styles.titles.container}>
                <View style={styles.titles.content}>
                  <Text style={styles.titles.text}>{this.props.title}</Text>
                  {this.props.titleSuffix && (
                    <Text note style={styles.titles.suffix}>
                      {' ' + this.props.titleSuffix}
                    </Text>
                  )}
                </View>
              </View>
            )}
          </Body>
          <Right style={{ flex: 1 }}>
            {!hideDrawerButton && (
              <HeaderDrawerButton navigation={this.props.navigation} />
            )}
            {/*this.props.displayAvatar && (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('Profile');
                }}>
                <Thumbnail
                  source={profilePic || avatar}
                  style={styles.avatar}
                />
              </TouchableOpacity>
              )*/}
          </Right>
        </Header>

        {(this.state.displaySearchBar || this.props.displaySearchBar) && (
          <SearchHeader
            onSearch={this.onSearch}
            filterText={this.props.filterText}
          />
        )}
      </View>
    );
  }
}

AppHeader.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired }),
  title: PropTypes.string,
  titleSuffix: PropTypes.string,
  subTitle: PropTypes.string,
  style: PropTypes.object,
  displayAvatar: PropTypes.bool,
  displaySearch: PropTypes.bool,
  displayLogo: PropTypes.bool,
  onSearch: PropTypes.func,
};

AppHeader.defaultProps = {
  displayAvatar: true,
  displayLogo: true,
  displaySearch: false,
  titleSuffix: ' ',
};

export default AppHeader;
