import React, {FC, PropsWithChildren} from 'react';
import {View, StyleSheet, TextInput as RNTextInput} from 'react-native';

// ------------------------------------------
// TextInput
// ------------------------------------------
export type TextInputProps = {
  value: string;
  onChangeText: (value: string) => void;
};

const TextInput: FC<TextInputProps> = ({value, onChangeText}) => {
  return (
    <View style={styles.container}>
      <RNTextInput
        style={styles.text}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

// ------------------------------------------
// StyleSheet
// ------------------------------------------
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  text: {
    color: '#777777',
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Rubik-Regular',
    textAlign: 'left',
    paddingLeft: 14,
  },
  input: {},
});

export default TextInput;
