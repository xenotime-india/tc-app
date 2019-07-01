import React from 'react';

import { FlatList, View } from 'react-native';
import EventItem from './../../components/EventItem';
import styles from './styles';

export class UpcommingEvents extends React.Component {
  _openDetail = event => () => {
    const { navigation } = this.props;
    navigation.navigate(
      event.eventType === 'Workshop' ? 'WorkshopDetail' : 'MeetupDetail',
      {
        event,
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 0.8,
          backgroundColor: '#EDEDED',
        }}
      />
    );
  };

  render() {
    return (
      <FlatList
        style={{ flex: 0 }}
        data={this.props.events}
        renderItem={({ item }) => (
          <EventItem pressAction={this._openDetail(item)} item={item} />
        )}
        initialNumToRender={7}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={this.renderSeparator}
        keyExtractor={event => event.sfid}
      />
    );
  }
}

export default UpcommingEvents;
