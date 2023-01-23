import React, {FC, PropsWithChildren} from 'react';
import {Text, View, StyleSheet} from 'react-native';

// ------------------------------------------
// FromLabel
// ------------------------------------------
type FormLabelProps = PropsWithChildren<{}>;

const FormLabel: FC<FormLabelProps> = ({children}) => {
  return <Text style={styles.label}>{children}</Text>;
};

// ------------------------------------------
// FromItem
// ------------------------------------------
export type FormItemProps = PropsWithChildren<{
  label: string;
}>;

const FormItem: FC<FormItemProps> = ({children, label}) => {
  return (
    <View style={styles.container}>
      <FormLabel>{label}</FormLabel>
      <View style={styles.input}>{children}</View>
    </View>
  );
};

// ------------------------------------------
// StyleSheet
// ------------------------------------------
const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    fontFamily: 'Rubik-Medium',
    fontSize: 15,
    lineHeight: 22,
    color: '#6A6A6A',
    marginBottom: 2,
  },
  input: {},
});

export default FormItem;
