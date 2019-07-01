import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, RefreshControl } from 'react-native';
import moment from 'moment';
import {
  Container,
  Content,
  Tabs,
  Tab,
  Text,
  Icon,
  Fab,
  Spinner,
  View,
} from 'native-base';
import _ from 'lodash';

import EventList from './EventList';
import AppHeader from './../../components/AppHeader';
import FilterPill from './../../components/FilterPill';
import defaultConnector from './../../redux/defaultConnector';

import styles from './styles';
import theme from './../../theme/variables/myexpense';

class EventListScreen extends Component {
  static propTypes = {
    navigation: PropTypes.any,
    event: PropTypes.array,
    deleteExpense: PropTypes.func,
  };

  static defaultProps = {
    eventLoading: false,
    eventError: false,
  };

  state = {
    events: [],
    filterText: '',
    isFetching: false,
  };
  componentDidMount() {
    this.initialize();
  }

  initialize = () => {
    const { requestType, EventActions } = this.props;
    if (requestType === 'workshop') {
      EventActions.getAllWorkshops();
    } else if (requestType === 'meetup') {
      EventActions.getAllMeetups();
    } else {
      EventActions.getEvents();
    }
  };

  static getDerivedStateFromProps(props, state) {
    const exclude = ['sfid'];
    let data = [];
    if (props.requestType === 'workshop') {
      data = props.event.workshops;
    } else if (props.requestType === 'meetup') {
      data = props.event.meetups;
    } else {
      data = props.event.data;
    }
    if (!props.event.eventsLoading && !props.event.eventsError) {
      if (state.filterText != '') {
        const filterEvents = _.filter(
          data,
          _.flow(
            _.partial(_.omit, _, exclude),
            _.partial(
              _.some,
              _,
              _.flow(
                _.toLower,
                _.partial(_.includes, _, _.toLower(state.filterText), 0)
              )
            )
          )
        );
        return {
          events: filterEvents,
        };
      } else {
        return { events: data };
      }
    }
    return null;
  }

  onRefresh = () => {
    const { EventActions, requestType } = this.props;
    this.setState({ isFetching: true }, () => {
      if (requestType === 'workshop') {
        EventActions.getAllWorkshops(() => {
          this.setState({ isFetching: false });
        });
      } else if (requestType === 'meetup') {
        EventActions.getAllMeetups(() => {
          this.setState({ isFetching: false });
        });
      } else {
        EventActions.getEvents(() => {
          this.setState({ isFetching: false });
        });
      }
    });
  };

  doSearch = query => {
    console.log(query);
    const exclude = ['sfid'];
    this.setState({ filterText: query });
    const { events } = this.state;
    const filterEvents = _.filter(
      events,
      _.flow(
        _.partial(_.omit, _, exclude),
        _.partial(
          _.some,
          _,
          _.flow(
            _.toLower,
            _.partial(_.includes, _, _.toLower(query), 0)
          )
        )
      )
    );
    this.setState({ events: filterEvents });
  };

  closeSearchFilterPressed = () => {
    this.setState({ filterText: '' });
  };

  _openDetail = event => () => {
    const { navigation, requestType } = this.props;
    if (requestType) {
      navigation.navigate(
        event.eventType === 'Workshop'
          ? 'FindWorkshopDetail'
          : 'FindMeetupDetail',
        {
          event,
        }
      );
    } else {
      navigation.navigate('QRScan', {
        event,
      });
    }
  };

  render() {
    const { navigation, event, heading = 'Events', requestType } = this.props;
    const { events = [], filterText, isFetching } = this.state;
    const { eventsLoading } = event || {};
    return (
      <Container>
        <View style={styles.container}>
          {requestType && (
            <AppHeader
              hasTabs
              displayBackBtn
              backAction={() => navigation.navigate('Home')}
              displaySearchBar
              navigation={navigation}
              title={heading}
              onSearch={this.doSearch}
              filterText={filterText}
            />
          )}
          {!requestType && (
            <AppHeader
              hasTabs
              displaySearch
              navigation={navigation}
              title={heading}
              onSearch={this.doSearch}
              filterText={filterText}
            />
          )}
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1 }}
            style={styles.content}
            refreshControl={
              <RefreshControl
                refreshing={isFetching}
                onRefresh={this.onRefresh}
              />
            }>
            <View>
              {filterText !== '' && !requestType && (
                <FilterPill
                  label={`Search: ${filterText}`}
                  onClose={this.closeSearchFilterPressed}
                />
              )}
            </View>
            {eventsLoading && !isFetching && (
              <View style={styles.emptyContainer}>
                <Spinner color={theme.brandPrimary} />
              </View>
            )}
            {!eventsLoading && events.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyMsg}>No events found.</Text>
              </View>
            )}
            {!eventsLoading && events.length > 0 && (
              <EventList
                openDetail={this._openDetail}
                events={events}
                navigation={navigation}
              />
            )}
          </Content>
        </View>
      </Container>
    );
  }
}

export default defaultConnector(EventListScreen);
