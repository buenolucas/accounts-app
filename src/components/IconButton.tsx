import React, {FC, PropsWithChildren} from 'react';
import {TouchableHighlight, StyleSheet} from 'react-native';

type IconButtonProps = PropsWithChildren<{
  onPress: () => void;
}>;

const IconButton: FC<IconButtonProps> = ({onPress, children}) => {
  return (
    <TouchableHighlight style={styles.container} onPress={onPress}>
      {children}
    </TouchableHighlight>
  );
};

// ------------------------------------------
// StyleSheet
// ------------------------------------------
const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    padding: 8,
  },
});

export default React.memo(IconButton);
