import React from 'react';
import PropTypes from 'prop-types';

import { TouchableOpacity } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  View,
  Icon,
  Grid,
  Col,
  Row,
} from 'native-base';

import theme from './../../theme/variables/myexpense';
import styles from './styles';

import categoryColors from './../../theme/categoryColors';

export class Category extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      category: PropTypes.string,
      percent: PropTypes.number,
      amount: PropTypes.number,
    }).isRequired,
    index: PropTypes.number.isRequired,
    navigation: PropTypes.any,
  };

  render() {
    const {
      item: { ...category },
      navigation,
      index,
    } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Expenses')}>
        <Card style={styles.categoryBox}>
          <CardItem style={styles.categoryBoxItem}>
            <Grid>
              <Row>
                <Col size={2} style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Icon
                      type={category.iconType || 'SimpleLineIcons'}
                      name={category.iconName}
                      style={styles.categoryIcon}
                    />
                  </View>
                </Col>
                <Col size={7}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.categoryTitle}>{category.name}</Text>
                    <Text style={styles.categoryAmount}>{category.count}</Text>
                  </View>
                </Col>
              </Row>
              <Row style={styles.categoryLine}>
                <Col style={{ flexDirection: 'row' }}>
                  <View style={styles.categorySubtitleContainer}>
                    <Icon
                      type="SimpleLineIcons"
                      name={category.subIcon}
                      style={{
                        fontSize: 16,
                        color: '#8E8E93',
                      }}
                    />
                    <Text numberOfLines={1} style={styles.categorySubTitle}>
                      {category.subTitle}
                    </Text>
                  </View>
                </Col>
                <Col style={{ flexDirection: 'row', width: 20 }}>
                  <View>
                    {/*<Icon
                      type="SimpleLineIcons"
                      name="arrow-down-circle"
                      style={styles.categoryArrowDownIcon}
                    />*/}
                  </View>
                </Col>
              </Row>
            </Grid>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default Category;
