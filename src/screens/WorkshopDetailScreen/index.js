import React, { Component } from 'react';
import { StatusBar, Dimensions } from 'react-native';
import {
  Container,
  Content,
  Header,
  Text,
  Tabs,
  Tab,
  Icon,
  Left,
  Right,
  Button,
  View,
  List,
  Grid,
  Col,
} from 'native-base';
import moment from 'moment';

import HeaderDrawerButton from './../../components/AppHeader/HeaderDrawerButton';
import RNParallax from './../../components/RNParallax';
import styles from './styles';
import theme from './../../theme/variables/myexpense';
import Detail from './Detail';
import AttendeeList from './AttendeeList';

const images = {
  hp: require('./../../../assets/images/background1.png'),
  sahaj: require('./../../../assets/images/background1.png'),
};

export default class WorkshopDetailScreen extends Component {
  state = {
    enableNotification: false,
  };

  _openQRScan = () => {
    const { navigation } = this.props;
    const event = navigation.getParam('event', {});
    navigation.navigate('QRScanOnEvent', {
      event,
    });
  };

  renderNavBar = () => (
    <Header transparent hasTabs>
      <Left style={{ flex: 1 }}>
        <Button transparent onPress={() => this.props.navigation.goBack()}>
          <Icon
            style={styles.header.navigation}
            type="SimpleLineIcons"
            name="arrow-left"
          />
        </Button>
      </Left>
      <Right style={{ flex: 1 }}>
        <HeaderDrawerButton navigation={this.props.navigation} />
      </Right>
    </Header>
  );

  renderContent = () => {
    const { navigation } = this.props;
    const event = navigation.getParam('event', {});
    const allTeachers = [];
    if (event.primaryTeacher) {
      allTeachers.push({
        name: event.primaryTeacherName,
        pic: event.primaryTeacherPic ? { uri: event.primaryTeacherPic } : null,
      });
    }
    if (event.coTeacher1) {
      allTeachers.push({
        name: event.coTeacher1Name,
        pic: event.coTeacher1Pic ? { uri: event.coTeacher1Pic } : null,
      });
    }
    if (event.coTeacher2) {
      allTeachers.push({
        name: event.coTeacher2Name,
        pic: event.coTeacher2Pic ? { uri: event.coTeacher2Pic } : null,
      });
    }
    return (
      <Content
        paddershowsVerticalScrollIndicator={false}
        style={styles.content}>
        <View>
          <Detail event={event} allTeachers={allTeachers} />
        </View>
        <View>
          <Grid
            style={{
              backgroundColor: '#FAFAFB',
              borderColor: '#EDEDED',
              borderWidth: 0,
              padding: 5,

              borderTopWidth: 0.8,
              borderBottomWidth: 0.8,
            }}>
            <Col size={1} />
            <Col
              size={4}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '800',
                  color: theme.brandPrimary,
                  fontSize: 18,
                }}>
                ATTENDEES
              </Text>
            </Col>
            <Col
              size={1}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Button
                transparent
                onPress={this._openQRScan}
                style={{ paddingTop: 0, paddingBottom: 0, height: 25 }}>
                <Icon
                  name="qrcode"
                  type="FontAwesome"
                  style={{
                    fontSize: 22,
                    color: theme.brandPrimary,
                  }}
                />
              </Button>
            </Col>
          </Grid>
        </View>
        <View>
          <AttendeeList Attendees={event.attendees} />
        </View>
      </Content>
    );
  };

  render() {
    const { navigation } = this.props;
    const event = navigation.getParam('event', {});
    const bgImg =
      event.title === 'The Happiness Program' ? images.hp : images.sahaj;
    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <RNParallax
          headerMaxHeight={250}
          extraScrollHeight={20}
          navbarColor={theme.brandPrimary}
          title={event.title ? event.title.toUpperCase() : ''}
          titleStyle={styles.titleStyle}
          subtitle={moment(event.eventstartdategmt).format('MMM D, YYYY')}
          subtitleStyle={styles.subtitleStyle}
          backgroundImage={bgImg}
          backgroundImageScale={1.2}
          renderNavBar={this.renderNavBar}
          renderContent={this.renderContent}
          containerStyle={styles.container}
          contentContainerStyle={styles.contentContainer}
          innerContainerStyle={styles.container}
        />
      </Container>
    );
  }
}
