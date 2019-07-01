import React from 'react';
import { Text } from 'native-base';

import styles from './styles';
export default class TabBarIcon extends React.Component {
  render() {
    return <Text style={styles.linkBtn}>{this.props.title}</Text>;
  }
}
