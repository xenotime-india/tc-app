import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground } from 'react-native';
import { groupBy } from 'lodash';
import { Container, Content, View, Text, Spinner, Icon } from 'native-base';
import { Agenda } from 'react-native-calendars';
import moment from 'moment';
import AppHeader from './../../components/AppHeader';

import EventItem from './../../components/EventItem';

import defaultConnector from './../../redux/defaultConnector';
import categoryColors from './../../theme/categoryColors';
import styles from './styles';
import theme from './../../theme/variables/myexpense';

class EventCalendarScreen extends Component {
  static propTypes = {
    navigation: PropTypes.any,
    selected: PropTypes.string,
    getEvents: PropTypes.func.isRequired,
    eventsLoading: PropTypes.bool.isRequired,
    eventsError: PropTypes.bool.isRequired,
    events: PropTypes.array,
  };

  state = {
    date: new Date(),
    selected: '',
    items: {},
    events: [],
  };

  static defaultProps = {
    eventsLoading: false,
    eventsError: false,
  };

  static getDerivedStateFromProps(props) {
    if (!props.eventsLoading && !props.eventsError) {
      const eventTransform = props.events.map(obj => {
        return {
          ...obj,
          date: moment(obj.eventstartdategmt).format('YYYY-MM-DD'),
          amount: 200,
        };
      });

      const eventsWithColor = eventTransform.map((obj, index) => {
        return {
          ...obj,
          color: categoryColors[index % categoryColors.length],
        };
      });
      const eventsGroupedByDate = groupBy(eventsWithColor, 'date');
      return {
        events: eventsGroupedByDate,
      };
    }
    return null;
  }
  renderItem = item => {
    return <EventItem item={item} style={styles.agenda.item} />;
  };
  renderEmptyData = () => {
    return (
      <View style={styles.emptyContainer}>
        {this.props.eventsLoading ? (
          <Spinner color={theme.brandPrimary} />
        ) : (
          <Text style={styles.emptyMsg}>No events found for this date</Text>
        )}
      </View>
    );
  };
  rowHasChanged = (r1, r2) => {
    return r1.id !== r2.id;
  };

  render() {
    const { navigation, profilePic, events } = this.props;
    //const { events } = this.state;
    return (
      <Container>
        <ImageBackground
          source={require('./../../../assets/images/header-bg.png')}
          style={styles.container}>
          <AppHeader hasTabs navigation={navigation} profilePic={profilePic} />
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1 }}
            style={styles.content}>
            <Agenda
              style={styles.agenda.container}
              items={this.state.events}
              loadItemsForMonth={day => {
                this.props.EventActions.getEvents(day);
              }}
              renderItem={this.renderItem}
              rowHasChanged={this.rowHasChanged}
              selected={moment(this.state.date).format('YYYY-MM-DD')}
              pastScrollRange={2}
              futureScrollRange={2}
              renderEmptyData={this.renderEmptyData}
              renderKnob={() => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.agenda.knobText}>More dates</Text>
                    <Icon
                      style={styles.agenda.knobIcon}
                      type="SimpleLineIcons"
                      name="arrow-down"
                    />
                  </View>
                );
              }}
              theme={{
                calendarBackground: '#FFF',
                textSectionTitleColor: theme.brandPrimary,
                selectedDayBackgroundColor: theme.brandPrimary,
                selectedDayTextColor: '#FFF',
                todayTextColor: theme.brandPrimary,
                textDisabledColor: '#DDD',
                dotColor: theme.brandSecondary,
                selectedDotColor: '#FFF',
                arrowColor: theme.brandPrimary,
                monthTextColor: '#000',
                agendaKnobColor: 'blue',
              }}
            />
          </Content>
        </ImageBackground>
      </Container>
    );
  }
}

export default defaultConnector(EventCalendarScreen);
