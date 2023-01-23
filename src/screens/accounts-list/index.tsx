import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {IconOutline} from '@ant-design/icons-react-native';
import {AccountsListScreenProps} from '../../navigation/types';
import AccountTypesList from '../../components/AccountTypesList';
import Screen from '../../components/Screen';
import IconButton from '../../components/IconButton';
import AppHeader from '../../components/AppHeader';
import {colors} from '../../styles';
import DeleteModal from './DeleteModal';

// ------------------------------------------
// Data
// ------------------------------------------
const DATA = [
  {key: '1', label: '1 - Receitas', type: 1},
  {key: '1_1', label: '1.1 - Taxa condominial', type: 1},
  {key: '1_2', label: '1.2 - Reserva de dependência', type: 1},
  {key: '1_3', label: '1.3 - Multas', type: 1},
  {key: '1_4', label: '1.4 - Juros', type: 1},
  {key: '1_5', label: '1.5 - Multa condominial', type: 1},
  {key: '2', label: '2 - Despesas', type: 2},
  {key: '2_1', label: '2.1 - Taxa condominial', type: 2},
  {key: '2_2', label: '2.2 - Reserva de dependência', type: 2},
  {key: '2_3', label: '2.3 - Multas', type: 2},
  {key: '2_4', label: '2.4 - Juros', type: 2},
  {key: '2_5', label: '2.5 - Multa condominial', type: 2},
];

// ------------------------------------------
// Item
// ------------------------------------------
type ItemProps = {
  id: string;
  label: string;
  type: number;
  openDeleteModal: (key: string) => void;
};

const Item = ({id, label, openDeleteModal, type = 1}: ItemProps) => (
  <View style={styles.item}>
    <Text
      style={[styles.itemTitle, type == 1 ? styles.positive : styles.negative]}>
      {label}
    </Text>
    <IconButton onPress={() => {}}>
      <IconOutline
        name="delete"
        size={18}
        color={'#C4C4D1'}
        onPress={() => openDeleteModal(id)}
      />
    </IconButton>
  </View>
);

function AccountsListScreen({navigation}: AccountsListScreenProps) {
  React.useEffect(() => {
    navigation.setOptions({
      header: props => (
        <AppHeader
          title="Plano de Contas"
          searchBarVisible={true}
          rightActions={() => (
            <IconButton
              onPress={() => {
                navigation.navigate('account_create');
              }}>
              <IconOutline name="plus" size={24} color={colors.white} />
            </IconButton>
          )}
        />
      ),
    });
  }, [navigation]);

  const [modalVisible, setModalVisible] = useState(false);

  const requestDeleteAccount = (key: string) => {
    setModalVisible(true);
    console.log('@@@@', key);
  };
  return (
    <Screen>
      <DeleteModal visible={modalVisible} setVisible={setModalVisible} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Listagem</Text>
          <Text style={styles.headerCount}>10 registros</Text>
        </View>
        <FlatList
          style={styles.list}
          data={DATA}
          renderItem={({item}) => (
            <Item
              key={item.key}
              id={item.key}
              label={item.label}
              type={item.type}
              openDeleteModal={requestDeleteAccount}
            />
          )}
        />
      </View>
    </Screen>
  );
}

// ------------------------------------------
// StyleSheet
// ------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 17,
    marginVertical: 6,
    borderRadius: 10,
  },
  itemTitle: {
    fontFamily: 'Rubik-Regular',
    flexGrow: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  positive: {
    color: colors.positive,
  },
  negative: {
    color: colors.negative,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  headerTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 22,
    flexGrow: 1,
    color: colors.black,
  },
  headerCount: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
  },
});

export default React.memo(AccountsListScreen);
