import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl, SectionList } from 'react-native';
import { Container, Content, Text, View, Spinner, Icon } from 'native-base';
import defaultConnector from './../../redux/defaultConnector';

import AppHeader from './../../components/AppHeader';
import UpCommingEvents from './UpcommingEvents';
import Category from './Category';
import UpcommingEventsLoader from './UpcommingEventsLoader';

import styles from './styles';
import theme from './../../theme/variables/myexpense';

class HomeScreen extends Component {
  state = {
    events: [],
    selected: 'key0',
    refreshing: false,
  };
  static propTypes = {
    navigation: PropTypes.any,
  };

  static defaultProps = {};

  componentDidMount() {
    this.initialize();
  }

  initialize = () => {
    this.props.EventActions.getEvents();
  };

  onRefreshHandler = () => {
    this.setState({ refreshing: true }, () => {
      this.props.userActions.verifyLogin(() => {
        this.props.EventActions.getEvents(() => {
          this.setState({ refreshing: false });
        });
      }, null);
    });
  };

  static getDerivedStateFromProps(props) {
    if (!props.event.eventsLoading && !props.event.eventsError) {
      const eventTransform = props.event.data.map(obj => {
        return {
          ...obj,
          amount: 200,
        };
      });

      return {
        events: eventTransform,
      };
    }
    return null;
  }

  onValueChange = value => {
    this.setState({
      selected: value,
    });
  };

  showPopover = () => {
    this.setState({ isVisible: true });
  };

  closePopover = () => {
    this.setState({ isVisible: false });
  };

  render() {
    const {
      navigation,
      categoriesLoading,
      profilePic,
      event,
      profile,
    } = this.props;
    const { eventsLoading } = event || {};
    const { events } = this.state;
    const {
      totalFundAccumulated,
      next3MonthWorkshopCount,
      next3MonthMeetupCount,
      LastDayRegistrationCount,
      LastDayRSVPCount,
    } = profile || {};
    console.log(events);
    const categories = [
      {
        id: '1',
        name: 'Meetup fund',
        iconName: 'dollar',
        iconType: 'FontAwesome',
        subTitle: 'Total Accured',
        subIcon: 'calendar',
        count: '$' + totalFundAccumulated,
      },
      {
        id: '2',
        name: 'Workshops',
        iconName: 'sun-o',
        iconType: 'FontAwesome',
        subTitle: 'Next 3 Months',
        subIcon: 'calendar',
        count: next3MonthWorkshopCount,
      },
      {
        id: '3',
        name: 'Meetups',
        iconName: 'meetup',
        iconType: 'FontAwesome',
        subTitle: 'Next 3 Months',
        subIcon: 'calendar',
        count: next3MonthMeetupCount,
      },
      {
        id: '4',
        name: 'Registration',
        iconName: 'user-follow',
        subTitle: 'Last day',
        subIcon: 'clock',
        count: LastDayRegistrationCount,
      },
    ];
    return (
      <Container>
        <View style={styles.background}>
          <AppHeader
            hasTabs
            navigation={navigation}
            title="Dashboard"
            profilePic={profilePic}
          />
          <Content
            showsVerticalScrollIndicator={false}
            style={styles.content}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefreshHandler}
              />
            }>
            {categoriesLoading && (
              <View style={styles.emptyContainer}>
                <Spinner color={theme.brandPrimary} />
              </View>
            )}
            {!categoriesLoading && categories.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyMsg}>No categories found</Text>
              </View>
            )}
            {!categoriesLoading && categories.length > 0 && (
              <FlatList
                horizontal={false}
                numColumns={2}
                data={categories}
                renderItem={({ ...props }) => (
                  <Category navigation={navigation} {...props} />
                )}
                keyExtractor={category => category.id}
                initialNumToRender={5}
              />
            )}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 10,
                backgroundColor: '#FAFAFB',
                borderColor: '#EDEDED',
                borderWidth: 0,
                borderTopWidth: 0.8,
                borderBottomWidth: 0.8,
              }}>
              <Text
                style={{
                  fontWeight: '800',
                  color: theme.brandPrimary,
                }}>{`Upcoming Events`}</Text>
            </View>

            {/*<Form style={{ flex: 1, alignItems: 'flex-start' }}>
                  <Item picker>
                    <Picker
                      mode="dropdown"
                      iosIcon={<Icon name="arrow-down" />}
                      headerStyle={{ backgroundColor: theme.brandPrimary }}
                      headerBackButtonTextStyle={{ color: '#fff' }}
                      headerTitleStyle={{ color: '#fff' }}
                      selectedValue={this.state.selected}
                      onValueChange={this.onValueChange}
                      style={{ width: 100, opacity: 0.4 }}>
                      <Picker.Item label="Show All" value="key0" />
                      <Picker.Item label="Meetups" value="key1" />
                      <Picker.Item label="Workshops" value="key2" />
                    </Picker>
                  </Item>
            </Form>*/}
            <View style={{ backgroundColor: '#ffffff' }}>
              <UpcommingEventsLoader isReady={!eventsLoading}>
                <UpCommingEvents navigation={navigation} events={events} />
              </UpcommingEventsLoader>
            </View>
          </Content>
        </View>
      </Container>
    );
  }
}

export default defaultConnector(HomeScreen);
