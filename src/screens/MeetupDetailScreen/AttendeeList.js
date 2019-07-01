import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

import { View } from 'native-base';
import AttendeeItem from './../../components/AttendeeItem';
import theme from './../../theme/variables/myexpense';
import styles from './styles';

class AttendeeList extends Component {
  static propTypes = {
    Attendees: PropTypes.array,
  };

  static defaultProps = {
    Attendees: [],
  };

  _openDetail = event => () => {
    const { navigation } = this.props;
    navigation.navigate('WorkshopDetail', {
      event,
    });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#ccccce',
        }}
      />
    );
  };

  render() {
    const { Attendees } = this.props;
    const AttendeeFilter = Attendees.filter(
      a => a.rsvp === 'May Be' || a.rsvp === 'Yes'
    );

    return (
      <FlatList
        horizontal={false}
        data={AttendeeFilter}
        renderItem={({ item }) => <AttendeeItem item={item} />}
        initialNumToRender={7}
        showsVerticalScrollIndicator={false}
        keyExtractor={Attendee => Attendee.sfid}
      />
    );
  }
}

export default AttendeeList;
