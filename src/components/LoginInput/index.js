import React from 'react';
import { Input, Icon, Item, Text } from 'native-base';

import styles from './styles';

export default function LoginInput({
  field, // { name, value, onChange, onBlur }
  form: { errors, touched }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  icon,
  ...props
}) {
  const errorText =
    touched[field.name] && errors[field.name] ? errors[field.name] : '';
  return (
    <Item style={styles.inputWrapper}>
      <Icon type="SimpleLineIcons" name={icon} style={styles.icon} />
      <Input
        {...field}
        {...props}
        style={styles.input}
        autoCapitalize="none"
        placeholderTextColor="rgba(255, 255, 255, 0.9)"
        underlineColorAndroid="transparent"
      />
      <Text style={styles.error}>{errorText}</Text>
    </Item>
  );
}
