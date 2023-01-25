import React, {FC, useState, useEffect, useMemo, useRef} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  TextInput as RNTextInput,
  View,
} from 'react-native';

import Screen from '../../components/Screen';
import DropDown from '../../components/DropDown';
import FormItem from '../../components/FormItem';
import TextInput from '../../components/TextInput';
import AppHeader from '../../components/AppHeader';

import {AccountsCreateScreenProps} from '../../navigation/types';

import {
  AccountNode,
  AccountType,
  OperationType,
  useAccounts,
} from '../../lib/accountTree';

import CodeInput from '../../components/CodeInput';
import {colors} from '../../styles';

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
// StyleSheet
// ------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
});

// ------------------------------------------
// AccountsCreateScreen
// ------------------------------------------

const AccountCreateScreen: FC<AccountsCreateScreenProps> = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      header: props => (
        <AppHeader
          title="Teste"
          backButtonVisible={true}
          onQuery={setQuery}
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

  const accountsRef = useRef<any>(null);
  const [parent, setParent] = useState<any>({key: '', label: 'Nenhum'});

  const [name, setName] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [path, setPàth] = useState<number[]>();

  const [query, setQuery] = useState<string>('');
  const [operation, setOperation] = useState<OperationType>(
    OperationType.CREDIT,
  );
  const [type, setType] = useState<AccountType>(AccountType.SINGLE);

  const {accounts, insert, getNextSlot} = useAccounts();

  const accountsList = useMemo(() => {
    const accs: ReturnType<typeof create>[] = [];
    accs.push({
      key: '',
      label: 'Nenhum',
      operation: 1,
      type: AccountType.GROUP,
      path: [],
    });

    const create = (node: AccountNode) => {
      return {
        key: node.key,
        label: [...node.path, node.code].join('.') + ' - ' + node.name,
        operation: node.operation,
        type: node.type,
        path: [...node.path, node.code],
      };
    };

    const visit = (node: AccountNode) => {
      const n = create(node);
      const _operation = operation || 1;
      if (n.type === AccountType.SINGLE || n.operation !== _operation) return;
      accs.push(n);
      for (const child of node.childNodes) {
        visit(child);
      }
    };

    for (const child of accounts) {
      visit(child);
    }

    return accs;
  }, [accounts, operation]);

  useEffect(() => {
    onChangeParentAccount();
  }, [parent]);

  useEffect(() => {}, []);

  const onChangeParentAccount = () => {
    setOperation(parent.operation);
    const nextCode = getNextSlot(parent.key);
    const code = nextCode.pop();

    for (let i = 0; i < accountsList.length; i++) {
      const node = accountsList[i];
      if (node.path.join('-') == nextCode.join('-')) {
        accountsRef.current.selectIndex(i);
      }
    }
    setCode('' + code);
    //
  };

  //----------------------------------
  // EVENT HANDLERS
  //----------------------------------
  const onSelectParentAccount = (item: any) => {
    setParent(item);
  };

  const onSelectAccountType = (item: any) => {
    setType(item.key);
  };
  const onSelectOperation = (item: any) => {
    setOperation(item.key);
  };

  //----------------------------------
  // EVENT HANDLERS
  //----------------------------------

  const saveForm = () => {
    const payload = {
      name: name,
      code: Number(code),
      type,
      operation,
      parentKey: parent.key || undefined,
    };

    try {
      insert(payload);
      navigation.navigate('accounts');
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <Screen>
      <ScrollView>
        <FormItem label="Tipo">
          <DropDown
            data={operations}
            defaultValue={operations[0]}
            onSelect={onSelectOperation}
          />
        </FormItem>
        <FormItem label="Conta Pai">
          <DropDown
            mainRef={accountsRef}
            data={accountsList}
            onSelect={onSelectParentAccount}
            defaultValue={accountsList[0]}
          />
        </FormItem>
        <FormItem label="Código">
          <CodeInput path={parent.path} value={code} onChangeText={setCode} />
        </FormItem>
        <FormItem label="Nome">
          <TextInput value={name} onChangeText={setName} />
        </FormItem>
        <FormItem label="Aceita Lançamentos">
          <DropDown
            data={types}
            defaultValue={types[0]}
            onSelect={onSelectAccountType}
          />
        </FormItem>

        <View style={{marginTop: 18}}>
          <Button
            title="save"
            onPress={() => saveForm()}
            color={colors.primary}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default AccountCreateScreen;
