import React from 'react';
import { Icon } from 'native-base';

import theme from './../../theme/variables/myexpense';

export default class TabBarIcon extends React.Component {
  render() {
    const { type = 'Ionicons' } = this.props;
    return (
      <Icon
        name={this.props.name}
        type={type}
        style={{
          fontSize: 22,
          marginBottom: -3,
          color: this.props.focused
            ? theme.brandPrimary
            : theme.tabBarTextColor,
        }}
      />
    );
  }
}
