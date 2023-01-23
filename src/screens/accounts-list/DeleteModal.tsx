import React, {FC, useState} from 'react';
import {Modal, Text, View, Pressable, Alert, StyleSheet} from 'react-native';
import {IconOutline} from '@ant-design/icons-react-native';
import {colors} from '../../styles';
// ------------------------------------------
// StyleSheet
// ------------------------------------------
type DeleteModalProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
};
const DeleteModal: FC<DeleteModalProps> = ({visible = false, setVisible}) => {
  //const [visible, setModalVisible] = useState(false);
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setVisible(!visible);
      }}>
      <View style={styles.centeredView}>
        <Pressable
          style={[styles.overlayer, visible && {opacity: 0.2}]}
          onPress={() => setVisible(false)}></Pressable>
        <View style={styles.modalView}>
          <IconOutline name="delete" size={40} color={colors.danger} />
          <Text style={styles.modalText}>Deseja excluir a conta?</Text>

          <View style={styles.actionBar}>
            <Pressable
              style={[styles.button]}
              onPress={() => setVisible(false)}>
              <Text style={styles.buttonText}>Não!</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonPrimary]}
              onPress={() => setVisible(!visible)}>
              <Text style={(styles.buttonText, styles.buttonTextPrimary)}>
                Com Certeza
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ------------------------------------------
// StyleSheet
// ------------------------------------------
const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayer: {
    backgroundColor: colors.black,
    opacity: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 11,
    paddingHorizontal: 24,
    fontSize: 15,
    color: colors.danger,
    backgroundColor: colors.white,
  },
  buttonPrimary: {
    color: colors.white,
    backgroundColor: colors.danger,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },

  buttonText: {
    fontFamily: 'Roboto',
    color: colors.danger,
    fontSize: 15,
    textAlign: 'center',
  },
  buttonTextPrimary: {
    color: colors.white,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  actionBar: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default DeleteModal;
