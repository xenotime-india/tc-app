import React, { Component } from 'react';
import EventListScreen from './../EventListScreen/index';

class FindMeetupScreen extends Component {
  render() {
    return (
      <EventListScreen
        {...this.props}
        heading="Find Meetups"
        requestType="meetup"
      />
    );
  }
}

export default FindMeetupScreen;
