import {IconOutline} from '@ant-design/icons-react-native';
import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  TextInput as RNSearchInput,
} from 'react-native';

// ------------------------------------------
// SearchInput
// ------------------------------------------

export type SearchInputProps = {
  value?: string;
  onChangeText: (value: string) => void;
};

const SearchInput: FC<SearchInputProps> = ({value, onChangeText}) => {
  return (
    <View style={styles.container}>
      <IconOutline name="search" size={20} color={'#C4C4D1'} />
      <RNSearchInput
        placeholder="Pesquisar Conta"
        placeholderTextColor={'#C4C4D1'}
        style={styles.text}
        value={value}
        onChangeText={onChangeText}
      />
      {value && (
        <TouchableHighlight>
          <IconOutline
            name="close"
            size={22}
            color="#C4C4D1"
            onPress={() => onChangeText('')}
          />
        </TouchableHighlight>
      )}
    </View>
  );
};

// ------------------------------------------
// StyleSheet
// ------------------------------------------
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 100,
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  text: {
    color: '#777777',
    flexGrow: 1,
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Rubik-Regular',
    textAlign: 'left',
    paddingLeft: 14,
  },
  closeButton: {
    padding: 8,
    borderRadius: 100,
  },
  input: {},
});

export default SearchInput;
