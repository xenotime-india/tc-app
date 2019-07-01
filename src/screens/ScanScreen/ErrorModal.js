import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View, Button } from 'native-base';
import ModalMessage from './../../components/ModalMessage';
export default class ErrorModal extends PureComponent {
  render() {
    const { modalVisible, hideModal, message = '' } = this.props;
    return (
      <ModalMessage
        modalVisible={modalVisible}
        error
        title="Error in Attendance marking!">
        <View style={styles.modalWrapper}>
          <Text style={styles.textStyle}>{message}</Text>
        </View>
        <Button danger large block full onPress={hideModal}>
          <Text>Tap to Retry or Scan next</Text>
        </Button>
      </ModalMessage>
    );
  }
}

const styles = StyleSheet.create({
  modalWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
  },
  textStyle: {
    color: '#706f6f',
    fontSize: 14,
    textAlign: 'center',
  },
});
