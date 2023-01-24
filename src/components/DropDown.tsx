import {FC} from 'react';
import {StyleSheet} from 'react-native';
import {IconFill} from '@ant-design/icons-react-native';

import SelectDropdown from 'react-native-select-dropdown';

// ------------------------------------------
// DropDown
// ------------------------------------------

type DrowDownProps = {
  data: any;
  placeholder?: string;
  defaultValue?: any;
  onSelect: (item: any, index?: number) => void;
  buttonTextForSelection?: (item: any, index?: number) => void;
  rowTextForSelection?: (selectedItem: any, index?: number) => void;
};

const DropDown: FC<DrowDownProps> = ({
  data,
  placeholder,
  defaultValue,
  onSelect,
  rowTextForSelection,
  buttonTextForSelection,
}) => {
  /**
   *
   */
  const defaultRowTextForSelection = (item: any, index: number) =>
    rowTextForSelection ? rowTextForSelection(item, index) : item.label;
  /**
   *
   */
  const defaultButtonTextForSelection = (selectedItem: any, index: number) =>
    buttonTextForSelection
      ? buttonTextForSelection(selectedItem, index)
      : selectedItem.label;

  return (
    <SelectDropdown
      data={data}
      onSelect={(selectedItem, index) => {
        onSelect(selectedItem, index);
      }}
      defaultValue={defaultValue}
      defaultButtonText={placeholder}
      buttonTextAfterSelection={defaultButtonTextForSelection}
      rowTextForSelection={defaultRowTextForSelection}
      buttonStyle={styles.button}
      buttonTextStyle={styles.buttonText}
      renderDropdownIcon={isOpened => {
        return (
          <IconFill
            name={isOpened ? 'caret-up' : 'caret-down'}
            color={'#444'}
            size={18}
          />
        );
      }}
      dropdownIconPosition={'right'}
      dropdownStyle={styles.dropdown}
      rowStyle={styles.row}
      rowTextStyle={styles.rowText}
      onChangeSearchInputText={() => {}}
    />
  );
};

// ------------------------------------------
// StyleSheet
// ------------------------------------------

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  buttonText: {
    color: '#777777',
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Rubik-Regular',
    textAlign: 'left',
  },
  dropdown: {backgroundColor: '#EFEFEF'},
  row: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  rowText: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Rubik-Regular',
    color: '#444',
    textAlign: 'left',
  },
});
export default DropDown;
