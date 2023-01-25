import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Button} from 'react-native';
import {IconOutline} from '@ant-design/icons-react-native';
import {AccountsListScreenProps} from '../../navigation/types';
import Screen from '../../components/Screen';
import IconButton from '../../components/IconButton';
import AppHeader from '../../components/AppHeader';
import {colors} from '../../styles';

import {useAccounts, AccountNode} from '../../lib/accountTree';
import {DeleteAccountModal} from './DeleteAccountModal';
import ListHeader from './ListHeader';

function AccountsListScreen({navigation}: AccountsListScreenProps) {
  React.useEffect(() => {
    navigation.setOptions({
      header: props => (
        <AppHeader
          title="Plano de Contas"
          searchBarVisible={true}
          onQuery={setQueryQ}
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

  const setQueryQ = (value: string) => {
    setQuery(value);
  };

  const [query, setQuery] = useState<string>('');

  const [selectedAccount, setSelectedAccount] = useState<AccountNode>();

  const {insert, accounts, remove} = useAccounts();

  const filtredAccounts = useMemo(() => {
    const filtred: AccountNode[] = [];
    const visit = (node: AccountNode) => {
      if (query && node.name!.toLowerCase().indexOf(query.toLowerCase()) < 0) {
        return;
      }
      filtred.push(node);
      for (const child of node.childNodes) {
        visit(child);
      }
    };
    for (const child of accounts) {
      visit(child);
    }
    return filtred;
  }, [accounts, query]);

  const onDeleteHandler = () => {
    if (selectedAccount) {
      remove(selectedAccount.key);
      setSelectedAccount(undefined);
    }
  };
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
                  {[...item.path, item.code].join('.')} - {item.name}
                </Text>
                <View style={{gap: 1, flexDirection: 'row'}}>
                  <IconButton onPress={() => {}}>
                    <IconOutline
                      name="edit"
                      size={18}
                      color={'#C4C4D1'}
                      onPress={() =>
                        navigation.navigate('account_view', {
                          accountId: item.key,
                        })
                      }
                    />
                  </IconButton>
                  <IconButton onPress={() => {}}>
                    <IconOutline
                      name="delete"
                      size={18}
                      color={'#C4C4D1'}
                      onPress={() => setSelectedAccount(item)}
                    />
                  </IconButton>
                </View>
              </View>
            </View>
          );
        }}
      />
    );
  };
  return (
    <Screen>
      <View style={styles.container}>
        {filtredAccounts.length > 0 ? (
          <>
            <ListHeader total={filtredAccounts.length} />
            {renderList(filtredAccounts)}
          </>
        ) : (
          <View>
            <Text>Nenhum registro encontrado.</Text>
          </View>
        )}
      </View>
      <DeleteAccountModal
        account={selectedAccount}
        onRequestClose={() => setSelectedAccount(undefined)}
        onRequestDelete={() => onDeleteHandler()}
      />
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
