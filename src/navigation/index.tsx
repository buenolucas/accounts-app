import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import AccoutsListScreen from '../screens/AccoutsListScreen';
import AccountsCreateScreen from '../screens/AccountsCreateScreen';
import {IconFill, IconOutline} from '@ant-design/icons-react-native';

const AppStack = createNativeStackNavigator<RootStackParamList>();

function AppNavigation() {
  return (
    <AppStack.Navigator
      initialRouteName="accounts"
      screenOptions={() => ({
        headerTitleStyle: {
          fontFamily: 'Roboto-Bold',
          fontSize: 22,
        },
        headerStyle: {backgroundColor: '#622490'},
        headerTintColor: '#FFFFFF',
      })}>
      <AppStack.Screen
        name="accounts"
        component={AccoutsListScreen}
        options={{
          title: 'Plano de Contas',
          headerRight: () => (
            <IconOutline name="plus" size={22} color="#FFFFFF" />
          ),
        }}
      />
      <AppStack.Screen
        name="account_create"
        component={AccountsCreateScreen}
        options={{title: 'Inserir Conta'}}
      />
    </AppStack.Navigator>
  );
}

export default AppNavigation;
