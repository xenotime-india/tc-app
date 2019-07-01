import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon, Grid, Col } from 'native-base';

import styles from './styles';

const DetailRow = ({ title, detail }) => {
  return (
    <View style={[styles.contact.container]}>
      <Grid>
        <Col size={4}>
          <View>
            <View style={styles.contact.nameColumn}>
              {title.trim().length !== 0 && (
                <Text style={styles.contact.nameText}>{title}</Text>
              )}
            </View>
            <View style={styles.contact.valueColumn}>
              <Text style={styles.contact.valueText}>{detail}</Text>
            </View>
          </View>
        </Col>
      </Grid>
    </View>
  );
};

export default DetailRow;
