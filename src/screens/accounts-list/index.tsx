import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';
import {IconOutline} from '@ant-design/icons-react-native';
import {AccountsListScreenProps} from '../../navigation/types';
import Screen from '../../components/Screen';
import IconButton from '../../components/IconButton';
import AppHeader from '../../components/AppHeader';
import {colors} from '../../styles';

import {
  useAccounts,
  AccountNode,
  AccountType,
  OperationType,
} from '../../lib/accountTree';
import {DeleteAccountModal} from './DeleteAccountModal';
import ListHeader from './ListHeader';

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

  const [selectedAccount, setSelectedAccount] = useState<AccountNode>();

  const {insert, accounts} = useAccounts();
  const renderList = (accs: AccountNode[]) => {
    return (
      <FlatList
        style={styles.list}
        data={accs}
        renderItem={({item}) => {
          return (
            <View style={styles.item}>
              <View style={styles.itemHeader}>
                <Text
                  style={[
                    styles.itemTitle,
                    item.operation === 1 ? styles.positive : styles.negative,
                  ]}>
                  {[...item.path, item.code].join('.')}-{item.name}
                </Text>
                <IconButton onPress={() => {}}>
                  <IconOutline
                    name="delete"
                    size={18}
                    color={'#C4C4D1'}
                    onPress={() => setSelectedAccount(item)}
                  />
                </IconButton>
              </View>
              {item.childNodes && renderList(item.childNodes)}
            </View>
          );
        }}
      />
    );
  };

  return (
    <Screen>
      <View style={styles.container}>
        {accounts.length > 0 && (
          <>
            <ListHeader total={10} />
            {renderList(accounts)}
          </>
        )}
        {accounts.length === 0 && (
          <View>
            <Text>Importar</Text>
            <Button
              title="Importar"
              onPress={() => {
                insert({
                  // key: 'r01',
                  name: 'Receita',
                  type: AccountType.GROUP,
                  operation: OperationType.CREDIT,
                });
                insert({
                  name: 'Despesa',
                  type: AccountType.GROUP,
                  operation: OperationType.DEBIT,
                });
              }}
            />
          </View>
        )}
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
    alignItems: 'stretch',
  },
  itemHeader: {
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
});

export default AccountsListScreen;
