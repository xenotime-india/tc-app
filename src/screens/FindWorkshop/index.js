import React, { Component } from 'react';
import EventListScreen from './../EventListScreen/index';

class FindWorkshopScreen extends Component {
  render() {
    return (
      <EventListScreen
        {...this.props}
        heading="Find Workshops"
        requestType="workshop"
      />
    );
  }
}

export default FindWorkshopScreen;
