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
// ------------------------------------------
// Data
// ------------------------------------------

const accountTypes = [{label: 'Receita'}, {label: 'Despesa'}];
const acceptChilds = [{label: 'Sim'}, {label: 'Não'}];
const parentAccount = [
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
                navigation.navigate('account_create');
              }}>
              <IconOutline name="check" size={22} color={colors.white} />
            </IconButton>
          )}
        />
      ),
      headerRight: () => (
        <IconOutline
          name="check"
          size={22}
          color={colors.white}
          onPress={() => navigation.navigate('account_create')}
        />
      ),
    });
  }, [navigation]);

  const onSelect = (obj: any, index?: number) => {
    console.log(obj, index);
  };
  const [cod, setCod] = useState<string>('');
  const [name, setName] = useState<string>('');

  return (
    <Screen>
      <ScrollView>
        {/* Tipo */}
        <FormItem label="Tipo">
          <DropDown
            data={accountTypes}
            placeholder={'Tipo'}
            defaultValue={accountTypes[0]}
            onSelect={onSelect}
          />
        </FormItem>
        {/* Conta Pai */}
        <FormItem label="Conta Pai">
          <DropDown
            data={parentAccount}
            placeholder={'contaPai'}
            defaultValue={parentAccount[0]}
            onSelect={onSelect}
          />
        </FormItem>
        {/* Conta Pai */}
        <FormItem label="Código">
          <CodeInput group="1.11." value={cod} onChangeText={setCod} />
        </FormItem>
        {/* Conta Pai */}
        <FormItem label="Nome">
          <TextInput value={name} onChangeText={setName} />
        </FormItem>
        {/* Lan~camentos */}
        <FormItem label="Aceita Lançamentos">
          <DropDown
            data={acceptChilds}
            placeholder={'Aceita'}
            defaultValue={acceptChilds[0]}
            onSelect={onSelect}
          />
        </FormItem>
      </ScrollView>
    </Screen>
  );
};

export default React.memo(AccountsCreateScreen);
