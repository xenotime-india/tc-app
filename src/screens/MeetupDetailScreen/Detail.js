import React, { Component } from 'react';
import { View } from 'native-base';
import moment from 'moment';
import openMap from 'react-native-open-maps';

import styles from './styles';
import DetailRow from './../WorkshopDetailScreen/DetailRow';
import TeachersList from './../../components/TeachersList';

const openMapAction = ({ latitude, longitude }) => () => {
  openMap({ latitude, longitude });
};

const Detail = ({ event, allTeachers }) => {
  let status = 'Active';
  if (event.maxAttendees && event.maxAttendees <= event.validRegistration) {
    status = 'Full';
  }
  return (
    <View style={styles.container}>
      <TeachersList allTeachers={allTeachers} />
      <View style={styles.separator} />
      <DetailRow
        swap={true}
        icon="calendar"
        title={moment(event.eventstartdategmt).format('MMM D, YYYY')}
        detail={event.formattedWeekDay}
      />
      <View style={styles.separator} />
      <DetailRow
        swap={true}
        icon="location-pin"
        title={`${event.city || ''} ${event.state || ''}`}
        detail={event.addressShort || ''}
      />
      <View style={styles.separator} />
      <DetailRow oneLine title={'Meetup Status'} detail={status} />
      <View style={styles.separator} />
      <DetailRow
        oneLine
        title={'Maximum Attendees'}
        detail={event.maxAttendees || 'NA'}
      />
      <View style={styles.separator} />
      <DetailRow
        oneLine
        title={"RSVP's"}
        detail={event.validRegistration || '0'}
      />
      <View style={styles.separator} />
      {event.organizer && (
        <>
          <DetailRow oneLine title={'Organizer'} detail={event.organizerName} />
          <View style={styles.separator} />
        </>
      )}
      <DetailRow
        oneLine
        title={'Contact Name'}
        detail={event.centerName || ''}
      />
      <View style={styles.separator} />
      <DetailRow
        oneLine
        title={'Contact Email'}
        detail={event.centerEmail || ''}
      />
      <View style={styles.separator} />
      <DetailRow
        oneLine
        title={'Contact Phone'}
        detail={event.contactPersonName1 || ''}
      />
      <View style={styles.separator} />
    </View>
  );
};

export default Detail;
