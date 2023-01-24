import React, {FC, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  TextInput as RNBaseModal,
  Modal,
  Button,
} from 'react-native';
import BaseModal from '../../components/BaseModal';
import {AccountNode} from '../../lib/accountTree';

// ------------------------------------------
// BaseModal
// ------------------------------------------

export type DeleteAccountModalProps = {
  onRequestClose: () => void;
  onRequestDelete: () => void;
  account?: AccountNode;
};

export const DeleteAccountModal: FC<DeleteAccountModalProps> = props => {
  const {onRequestClose, onRequestDelete, account} = props;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!!account);
  }, [account]);

  const accountName = () =>
    account && [...account.path, account.code].join('.');
  return (
    <BaseModal visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Deseja excluir:</Text>
          <Text>{accountName()}</Text>
          <Button title="Não" onPress={() => onRequestClose()} />
          <Button title="Sim" onPress={() => onRequestDelete()} />
        </View>
      </View>
    </BaseModal>
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
