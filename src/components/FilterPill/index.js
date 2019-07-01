import React from 'react';
import { TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Badge, Text, View } from 'native-base';

const styles = {
  caseBadgeView: {
    paddingTop: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
  },
  badge: {
    alignSelf: 'flex-end',
    backgroundColor: '#D8D8D8',
    borderRadius: 3,
    borderColor: '#969897',
    borderWidth: 2,
    flexDirection: 'row',
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0,
    paddingLeft: 0,
  },
  badgeContent: {
    flexDirection: 'row',
  },
  caseFilterView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  caseFilterIcon: {
    left: 0,
    borderRightWidth: 2,
    borderColor: '#969897',
    padding: 3,
  },
  caseFilterText: {
    color: '#000',
    fontSize: 16,
    left: 0,
    paddingLeft: 5,
    paddingRight: 5,
  },
};

export default props => {
  const { label, onClose } = props;
  return (
    <View>
      <View style={styles.caseBadgeView}>
        <Badge style={styles.badge}>
          <View style={[styles.badgeContent]}>
            <View style={styles.caseFilterView}>
              <TouchableOpacity onPress={onClose} style={styles.caseFilterIcon}>
                <EvilIcons size={19} name="close" color="#000" />
              </TouchableOpacity>
              <Text style={styles.caseFilterText}>
                {label === 'Trauma' ? 'Trauma & Extremeties' : label}
              </Text>
            </View>
          </View>
        </Badge>
      </View>
    </View>
  );
};
