import React, {FC, useState, useEffect, useMemo, useRef} from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import Screen from '../../components/Screen';
import AppHeader from '../../components/AppHeader';

import {AccountViewScreenProps} from '../../navigation/types';

import {
  AccountNode,
  AccountType,
  OperationType,
  useAccounts,
} from '../../lib/accountTree';

import CodeInput from '../../components/CodeInput';
import FormItem from '../../components/FormItem';

// ------------------------------------------
// Data
// ------------------------------------------

const operations = [
  {key: OperationType.CREDIT, label: 'Receita'},
  {key: OperationType.DEBIT, label: 'Despesa'},
];
const types = [
  {key: AccountType.SINGLE, label: 'Sim'},
  {key: AccountType.GROUP, label: 'Não'},
];

// ------------------------------------------
// AccountsCreateScreen
// ------------------------------------------

const AccountViewScreen: FC<AccountViewScreenProps> = props => {
  const {navigation, route} = props;
  const {accountId} = route.params;
  useEffect(() => {
    navigation.setOptions({
      header: props => (
        <AppHeader
          title="Visualizar Conta"
          backButtonVisible={true}
          rightActions={() => (
            <>
              {/* <IconButton
                onPress={() => {
                  saveForm();
                }}>
                <IconOutline name="check" size={22} color={colors.white} />
              </IconButton> */}
            </>
          )}
        />
      ),
    });
  }, [navigation]);

  const {find} = useAccounts();

  const account = useMemo(() => {
    return find(accountId);
  }, [accountId]);

  return (
    <Screen>
      <ScrollView>
        <View>
          <FormItem label="ID">
            <Text style={styles.property}>{account?.key}</Text>
          </FormItem>
          <FormItem label="Nome">
            <Text style={styles.property}>{account?.name}</Text>
          </FormItem>
          <FormItem label="Tipo">
            <Text style={styles.property}>
              {account?.operation === -1 ? 'Despesa' : 'Receita'}
            </Text>
          </FormItem>
          <FormItem label="Aceita Lançamentos">
            <Text style={styles.property}>
              {account?.type === 'group' ? 'Não' : 'Sim'}
            </Text>
          </FormItem>
        </View>
      </ScrollView>
    </Screen>
  );
};

// ------------------------------------------
// StyleSheet
// ------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  property: {
    fontFamily: 'Rubick-Bold',
  },
});
export default AccountViewScreen;
