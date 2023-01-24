import {IconOutline} from '@ant-design/icons-react-native';
import React, {FC, PropsWithChildren} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput as RNBaseModal,
  Modal,
} from 'react-native';

// ------------------------------------------
// BaseModal
// ------------------------------------------

export type BaseModalProps = PropsWithChildren<{
  visible?: boolean;
  onRequestClose: () => void;
}>;

const BaseModal: FC<BaseModalProps> = ({
  visible = true,
  onRequestClose,
  children,
}) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        onRequestClose();
      }}>
      <View style={styles.centeredView}>{children}</View>
    </Modal>
  );
};

// ------------------------------------------
// StyleSheet
// ------------------------------------------

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default BaseModal;
