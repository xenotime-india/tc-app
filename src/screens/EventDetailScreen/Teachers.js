import React from 'react';
import { Grid, Col, View, Thumbnail, Text } from 'native-base';

import styles from './styles';
const avatar = require('./../../../assets/images/avatar1.png');

const Teachers = ({ allTeachers }) => {
  return (
    <View style={[styles.social.container]}>
      <Grid>
        {allTeachers.map((teacher, index) => (
          <Col key={teacher.name + index}>
            <View>
              <View style={styles.overview.column}>
                <Thumbnail
                  source={teacher.pic || avatar}
                  style={styles.avatar}
                />
              </View>
              <View style={styles.overview.column}>
                <Text style={styles.overview.subtitle}>{teacher.name}</Text>
              </View>
            </View>
          </Col>
        ))}
      </Grid>
    </View>
  );
};

export default Teachers;
