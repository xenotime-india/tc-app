import React from 'react';
import Placeholder, { Line } from 'rn-placeholder';
import { View } from 'native-base';

const UpcommingEventsLoader = props => {
  return (
    <Placeholder
      animation="fade"
      isReady={props.isReady}
      whenReadyRender={() => props.children}>
      <View style={{ paddingTop: 10 }}>
        <Line width="70%" />
        <Line />
        <Line />
        <Line width="30%" />
      </View>
      <View
        style={{
          height: 0.8,
          backgroundColor: '#EDEDED',
        }}
      />
      <View style={{ paddingTop: 10 }}>
        <Line width="70%" />
        <Line />
        <Line />
        <Line width="30%" />
      </View>
      <View
        style={{
          height: 0.8,
          backgroundColor: '#EDEDED',
        }}
      />
      <View style={{ padding: 10 }}>
        <Line width="70%" />
        <Line />
        <Line />
        <Line width="30%" />
      </View>
      <View
        style={{
          height: 0.8,
          backgroundColor: '#EDEDED',
        }}
      />
      <View style={{ padding: 10 }}>
        <Line width="70%" />
        <Line />
        <Line />
        <Line width="30%" />
      </View>
    </Placeholder>
  );
};

export default UpcommingEventsLoader;
