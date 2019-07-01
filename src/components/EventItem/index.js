import React from 'react';
import PropTypes from 'prop-types';
import { View, Grid, Col, Text, Icon } from 'native-base';
import { TouchableOpacity, Platform } from 'react-native';
import moment from 'moment';

import styles from './styles';
import theme from './../../theme/variables/myexpense';

const EventItem = ({ item, style, pressAction }) => {
  const borderColor =
    item.eventType === 'Workshop' ? theme.brandThird : theme.brandInfo;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={pressAction}>
      <View
        style={[
          styles.item.content,
          { borderColor: borderColor, borderLeftWidth: 0 },
          style,
        ]}>
        <Grid>
          <Col size={3} style={{ flexDirection: 'row' }}>
            <View>
              <Text numberOfLines={2} style={styles.item.subtitle}>
                {moment(item.eventstartdategmt).fromNow()}
              </Text>
              <Text
                numberOfLines={2}
                style={{ ...styles.item.title, fontSize: 14 }}>
                {moment(item.eventstartdategmt).format('MMM D, YYYY')}
              </Text>
            </View>
          </Col>
          <Col size={7} style={{ flexDirection: 'row' }}>
            <View>
              <Text numberOfLines={1} style={styles.item.subtitle}>
                {item.addressShort ||
                  `${item.city || ''}, ${item.state || ''}, ${item.country ||
                    ''}`}
              </Text>
              <Text numberOfLines={1} style={styles.item.title}>
                {item.meetupTitle || item.title}
              </Text>
              <View style={styles.item.subtitleContainer}>
                {/*<Icon
                  name={Platform.OS === 'ios' ? 'ios-add' : 'md-add'}
                  style={{
                    fontSize: 16,
                    color: theme.brandDanger,
                    fontWeight: 'bold',
                  }}
                />
                <Text numberOfLines={1} style={styles.item.subtitleWithIcon}>
                  {item.validRegistration || '0'} people going
                </Text>*/}
                {item.maxAttendees && (
                  <Text
                    numberOfLines={1}
                    style={{
                      ...styles.item.subtitle,
                      color: theme.brandDanger,
                    }}>
                    {item.maxAttendees - item.validRegistration} spots left
                  </Text>
                )}
              </View>
            </View>
          </Col>
        </Grid>
      </View>
    </TouchableOpacity>
  );
};

EventItem.propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object,
};

export default EventItem;
