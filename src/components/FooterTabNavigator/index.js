import React from 'react';
import { Input, Icon, Item, Text } from 'native-base';

import styles from './styles';
const FooterTabNavigator = props => {
  let currentRouteName =
    props.navigation.state.routes[props.navigation.state.index].key;
  return (
    <SafeAreaView style={defaultFooterStyle}>
      <TouchableOpacity
        activeOpacity={0.6}
        hitSlop={{
          top: 20,
          bottom: 50,
          left: 50,
          right: 50,
        }}
        onPress={() => props.navigation.navigate('Feed')}>
        {currentRouteName === 'Feed' ? (
          <FeedActive fill={Colors.white} />
        ) : (
          <Feed fill={Colors.white} />
        )}
      </TouchableOpacity>
      <UploadIcon navigation={props.navigation} />
      <TouchableOpacity
        activeOpacity={0.6}
        hitSlop={{
          top: 20,
          bottom: 50,
          left: 50,
          right: 50,
        }}
        onPress={() => props.navigation.navigate('Message')}>
        <InboxIcon focused={currentRouteName === 'Message'} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
