import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  Left,
  Thumbnail,
  Text,
  Body,
  Right,
  Icon,
  Badge,
  Grid,
  Col,
  Row,
} from 'native-base';
import { Linking } from 'react-native';

import styles from './styles';
import theme from './../../theme/variables/myexpense';

const avatar = require('./../../../assets/images/avatar1.png');

const mailTo = address => () => {
  if (address) Linking.openURL('mailto:' + address);
};

const phoneTo = phoneNumber => () => {
  if (phoneNumber) Linking.openURL('tel:' + phoneNumber);
};

const renderStatus = attended => {
  if (attended) {
    return (
      <Badge success>
        <Text style={{ fontSize: 12 }}>Checked-In</Text>
      </Badge>
    );
  }
  return (
    <Badge danger>
      <Text style={{ fontSize: 12 }}>Pending</Text>
    </Badge>
  );
};
const AttendeeItem = ({ item, style, pressAction }) => {
  const thumbnailImage = item.attendeeUserPic
    ? { uri: item.attendeeUserPic }
    : avatar;
  return (
    <ListItem style={{ backgroundColor: '#ffffff' }}>
      <Body>
        <Grid>
          <Col style={{ width: 70 }}>
            <Thumbnail source={thumbnailImage} />
          </Col>
          <Col>
            <Row>
              <Col>
                <Text>{item.attendeeUserName}</Text>
              </Col>
              <Col style={{ width: 80 }}>{renderStatus(item.attended)}</Col>
            </Row>
            <Row style={{ paddingTop: 10 }}>
              <Col
                style={styles.item.iconContainer}
                onPress={mailTo(item.attendeeUserEmail)}>
                <Icon name="ios-mail" style={styles.item.icon} />
                <Text style={styles.item.subtitle}>
                  {item.attendeeUserEmail}
                </Text>
              </Col>
            </Row>
            <Row style={{ paddingTop: 2 }}>
              <Col
                style={styles.item.iconContainer}
                onPress={phoneTo(item.attendeeUserMobilePhone)}>
                <Icon name="ios-call" style={styles.item.icon} />
                <Text style={styles.item.subtitle}>
                  {item.attendeeUserMobilePhone}
                </Text>
              </Col>
            </Row>
          </Col>
        </Grid>
      </Body>
    </ListItem>
  );
};

AttendeeItem.propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object,
};

export default AttendeeItem;
