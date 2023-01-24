import React, {FC, useState, useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {IconOutline} from '@ant-design/icons-react-native';

import Screen from '../../components/Screen';
import DropDown from '../../components/DropDown';
import FormItem from '../../components/FormItem';
import TextInput from '../../components/TextInput';
import CodeInput from '../../components/CodeInput';
import AppHeader from '../../components/AppHeader';
import IconButton from '../../components/IconButton';

import {AccountsCreateScreenProps} from '../../navigation/types';
import {colors} from '../../styles';
import {
  AccountNode,
  AccountType,
  OperationType,
  useAccounts,
} from '../../lib/accountTree';

// ------------------------------------------
// Data
// ------------------------------------------

const accountTypes = [
  {key: OperationType.CREDIT, label: 'Receita'},
  {key: OperationType.DEBIT, label: 'Despesa'},
];
const acceptChilds = [
  {key: AccountType.GROUP, label: 'Sim'},
  {key: AccountType.SINGLE, label: 'Não'},
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

const AccountsCreateScreen: FC<AccountsCreateScreenProps> = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      header: props => (
        <AppHeader
          title="Inserir Conta"
          backButtonVisible={true}
          rightActions={() => (
            <IconButton
              onPress={() => {
                console.log('@@@@', accountName);
                const payload = {
                  name: accountName,
                  operation: operationType,
                  code: Number(code),
                  type: accountType,
                  parentKey: parentGroup?.key,
                };

                try {
                  insert(payload);
                } catch (err: any) {
                  console.log(err);
                }
              }}>
              <IconOutline name="check" size={22} color={colors.white} />
            </IconButton>
          )}
        />
      ),
    });
  }, [navigation]);

  const [operationType, setOperationType] = useState(OperationType.CREDIT);
  const [code, setCode] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountType, setAccountType] = useState(AccountType.GROUP);
  const [parentGroup, setParentGroup] = useState<AccountNode>();
  const [parentGroupCode, setParentGroupCode] = useState<string>('');

  const {accounts, insert} = useAccounts();

  const [parentAccounts, setParentAccounts] = useState<AccountNode[]>([]);

  useEffect(() => {
    let result = accounts.filter(item => item.operation === operationType);

    result = [
      {
        key: 'root',
        name: 'Sem pai',
        type: AccountType.GROUP,
        operation: OperationType.CREDIT,
        path: [],
        code: 1,
        childNodes: [],
      },
      ...result,
    ];

    setParentAccounts(result);
  }, [operationType]);

  const onSelect = (obj: AccountNode, index?: number) => {
    if (obj) {
      const node: AccountNode = obj as AccountNode;
    }
    const g = obj.key !== 'root' ? [...obj.path, obj.code].join('.') + '.' : '';
    setParentGroupCode(g);
    setParentGroup(obj);
    const collection = obj.key === 'root' ? accounts : obj.childNodes;
    let nextCode = 1;
    if (collection.length > 0) {
      nextCode = collection[collection.length - 1].code;
    }
    // const nextCode = '' + obj.childNodes[obj.childNodes.length - 1].code;
    setCode('' + nextCode);
  };
  const onSelectAccountType = (obj: any, index?: number) => {
    setAccountType(obj.key);
  };
  const onOperationTypeSelect = (obj: any, index?: number) => {
    setOperationType(obj.key);
  };

  return (
    <Screen>
      <ScrollView>
        {/* Tipo */}
        <FormItem label="Tipo">
          <DropDown
            data={accountTypes}
            placeholder={'Tipo'}
            defaultValue={accountTypes[0]}
            onSelect={onOperationTypeSelect}
          />
        </FormItem>
        {/* Conta Pai */}
        <FormItem label="Conta Pai">
          <DropDown
            data={parentAccounts}
            defaultValue={parentAccounts[0]}
            buttonTextForSelection={(item: AccountNode) =>
              item.key !== 'root'
                ? [...item.path, item.code] + ' - ' + item.name
                : item.name
            }
            rowTextForSelection={(item: AccountNode) =>
              item.key !== 'root'
                ? [...item.path, item.code] + ' - ' + item.name
                : item.name
            }
            onSelect={onSelect}
          />
        </FormItem>
        {/* Conta Pai */}
        <FormItem label="Código">
          <CodeInput
            group={parentGroupCode}
            value={code}
            onChangeText={setCode}
          />
        </FormItem>
        {/* Conta Pai */}
        <FormItem label="Nome">
          <TextInput value={accountName} onChangeText={setAccountName} />
        </FormItem>
        {/* Lan~camentos */}
        <FormItem label="Aceita Lançamentos">
          <DropDown
            data={acceptChilds}
            defaultValue={acceptChilds[0]}
            onSelect={onSelectAccountType}
          />
        </FormItem>
      </ScrollView>
    </Screen>
  );
};

export default React.memo(AccountsCreateScreen);
