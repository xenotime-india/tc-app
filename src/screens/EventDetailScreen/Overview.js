import React from 'react';
import { Text, View } from 'react-native';
import { Grid, Col } from 'native-base';
import PropTypes from 'prop-types';

import styles from './styles';
import theme from './../../theme/variables/myexpense';

const Overview = () => {
  return (
    <View style={[styles.overview.container]}>
      <Grid>
        <Col size={2}>
          <View>
            <View style={styles.overview.column}>
              <Text style={styles.overview.title}>$15</Text>
            </View>
            <View style={styles.overview.column}>
              <Text style={styles.overview.subtitle}>Found</Text>
              <View
                style={[
                  styles.overview.marker,
                  { borderColor: theme.brandSuccess },
                ]}
              />
            </View>
          </View>
        </Col>
        <Col size={2}>
          <View>
            <View style={styles.overview.column}>
              <Text style={styles.overview.title}>250</Text>
            </View>
            <View style={styles.overview.column}>
              <Text style={styles.overview.subtitle}>Registration</Text>
              <View
                style={[
                  styles.overview.marker,
                  { borderColor: theme.brandWarning },
                ]}
              />
            </View>
          </View>
        </Col>
        <Col size={2}>
          <View>
            <View style={styles.overview.column}>
              <Text style={styles.overview.title}>11</Text>
            </View>
            <View style={styles.overview.column}>
              <Text style={styles.overview.subtitle}>Available Slot</Text>
              <View
                style={[
                  styles.overview.marker,
                  { borderColor: theme.brandThird },
                ]}
              />
            </View>
          </View>
        </Col>
      </Grid>
    </View>
  );
};

Overview.propTypes = {
  navigation: PropTypes.any,
};

export default Overview;
