import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { Icon } from 'native-base';
import Modal from 'react-native-modal';
import styles from './styles';

class ModalMessage extends React.Component {
  render() {
    const { title, success, error } = this.props;
    return (
      <Modal
        isVisible={this.props.modalVisible}
        onBackdropPress={this.props.hideModal}
        onBackButtonPress={this.props.hideModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.imageContainer}>
              <View style={styles.imageSubContainer}>
                {success && (
                  <Icon
                    type="Ionicons"
                    name="ios-checkmark-circle-outline"
                    style={{
                      color: '#39bf75',
                      fontSize: 55,
                    }}
                  />
                )}
                {error && (
                  <Icon
                    type="Ionicons"
                    name="ios-warning"
                    style={{
                      color: '#f44242',
                      fontSize: 55,
                    }}
                  />
                )}
              </View>
            </View>
            {title && (
              <View style={styles.titleContainer}>
                <Text style={styles.titleStyle}>{title}</Text>
              </View>
            )}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {this.props.children}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ModalMessage;
