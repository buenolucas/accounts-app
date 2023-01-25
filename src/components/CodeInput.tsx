import React, {FC} from 'react';
import {View, StyleSheet, Text, TextInput as RNTextInput} from 'react-native';

// ------------------------------------------
// CodeInput
// ------------------------------------------
export type CodeInputProps = {
  value: string;
  path: number[];
  onChangeText: (value: string) => void;
};

const CodeInput: FC<CodeInputProps> = ({value, path = [], onChangeText}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{path.length > 0 && path.join('.') + '.'}</Text>
      <RNTextInput
        keyboardType="numeric"
        style={styles.input}
        value={value}
        maxLength={3}
        onChangeText={onChangeText}
      />
    </View>
  );
};

// ------------------------------------------
// StyleSheet
// ------------------------------------------

const textStyle = Object.freeze({
  color: '#777777',
  fontSize: 15,
  lineHeight: 22,
  fontFamily: 'Rubik-Regular',
  textAlign: 'left',
});
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  input: {
    ...textStyle,
    marginTop: 1,
    width: '100%',
  },
  text: {
    ...textStyle,
    paddingLeft: 14,
    marginRight: -2,
  },
});

export default CodeInput;
