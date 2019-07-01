import React, { Component } from 'react';
import { Alert, Image, StatusBar, StyleSheet } from 'react-native';
import {
  Container,
  Content,
  Text,
  View,
  Spinner,
  Button,
  Icon,
} from 'native-base';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

import defaultConnector from './../../redux/defaultConnector';
import ScanSquare from './../../../assets/images/Scan-Square.png';
import AppHeader from './../../components/AppHeader';
import SuccessModal from './SuccessModal';
import ErrorModal from './ErrorModal';
import theme from './../../theme/variables/myexpense';
import styles from './styles';

class ScanScreen extends Component {
  state = {
    title: '',
    hasCameraPermission: null,
    scanned: false,
    barcode: {},
    scannedBarcodes: [],
    isScanning: false,
    successModalVisible: false,
    errorModalVisible: false,
    message: '',
  };

  async componentDidMount() {
    await this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _showAlert = message => {
    Alert.alert('', message, [{ text: 'OK' }], {
      cancelable: false,
    });
  };

  handleBarCodeScanned = ({ type, data }) => {
    const { scanned, scannedBarcodes } = this.state;
    const { navigation, EventActions } = this.props;
    const event = navigation.getParam('event', {});
    console.log(data, event.sfid);
    if (data && scannedBarcodes.indexOf(data) < 0 && !scanned) {
      //alert(`Bar code with type ${type} and data ${data} has been scanned!`);
      this.setState({ scanned: true });
      EventActions.doScanAttendee(
        {
          eventId: event.sfid,
          attendeId: data,
        },
        actionResponse => {
          console.log(actionResponse);
          this.showModal({ message: actionResponse.message });
        },
        actionResponse => {
          console.log(actionResponse);
          this.showModal({ message: actionResponse.error, error: true });
        }
      );
    }
  };

  /*handleBarCodeScannedTest = ({ type, data = 'TEST' }) => {
    const { scanned, scannedBarcodes } = this.state;
    const { navigation, EventActions } = this.props;
    const event = navigation.getParam('event', {});
    console.log(scannedBarcodes.indexOf(data) < 0, data, scanned);

    this.setState({ scanned: true });
    EventActions.doScanAttendee(
      {
        eventId: event.sfid,
        attendeId: data,
      },
      actionResponse => {
        console.log(actionResponse);
        this.showModal();
      },
      actionResponse => {
        console.log(actionResponse);
        this.showModal({ message: actionResponse.error, error: true });
      }
    );
  };*/

  showModal = ({ message = null, error = false }) => {
    if (error) {
      this.setState({
        successModalVisible: false,
        errorModalVisible: true,
        message,
      });
    } else {
      this.setState({
        successModalVisible: true,
        errorModalVisible: false,
        message,
      });
    }
  };

  hideModal = () => {
    this.setState({
      successModalVisible: false,
      errorModalVisible: false,
      scanned: false,
    });
  };

  render() {
    const { navigation } = this.props;
    const { hasCameraPermission, scanned } = this.state;
    if (hasCameraPermission === null) {
      return (
        <Container>
          <StatusBar
            barStyle="light-content"
            translucent={true}
            backgroundColor={'transparent'}
          />
          <AppHeader
            displayBackBtn
            navigation={navigation}
            title="Scan QR Code"
          />
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1 }}
            style={styles.emptyContent}>
            <View style={styles.emptyContainer}>
              <Spinner color={'#777'} />
            </View>
          </Content>
        </Container>
      );
    }
    if (hasCameraPermission === false) {
      return (
        <Container>
          <StatusBar
            barStyle="light-content"
            translucent={true}
            backgroundColor={'transparent'}
          />
          <AppHeader
            displayBackBtn
            navigation={navigation}
            title="Scan QR Code"
          />
          <Content
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flex: 1 }}
            style={styles.emptyContent}>
            <View style={styles.emptyContainer}>
              <Icon
                type="Entypo"
                name="emoji-sad"
                style={{
                  color: '#777',
                  fontSize: 55,
                }}
              />
              <Text style={styles.emptyMsg}>No access to camera!</Text>
              <Text style={styles.emptyMsg}>
                Please enable your camera permission to start scanning
                attendance QR code.
              </Text>
            </View>
          </Content>
        </Container>
      );
    }
    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          translucent={true}
          backgroundColor={'transparent'}
        />
        <SuccessModal
          navigationObj={this.props.navigation}
          modalVisible={this.state.successModalVisible}
          hideModal={this.hideModal}
          message={this.state.message}
        />
        <ErrorModal
          navigationObj={this.props.navigation}
          modalVisible={this.state.errorModalVisible}
          hideModal={this.hideModal}
          message={this.state.message}
        />
        <AppHeader
          displayBackBtn
          navigation={navigation}
          title="Scan QR Code"
        />
        <Content
          contentContainerStyle={{ flex: 1 }}
          style={styles.content}
          showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
          </View>
          <View style={styles.scanSquare}>
            {/*<Button onPress={this.handleBarCodeScannedTest}>
              <Text>Hello</Text>
    </Button>*/}
            <Image source={ScanSquare} resizeMode="contain" />
            {scanned && (
              <View
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  backgroundColor: '#222222',
                  paddingTop: 9,
                  padding: 20,
                  borderRadius: 5,
                }}>
                <Spinner color={'#fff'} />
                <Text style={{ color: '#fff' }}>Processing ...</Text>
              </View>
            )}
          </View>
        </Content>
      </Container>
    );
  }
}

export default defaultConnector(ScanScreen);
