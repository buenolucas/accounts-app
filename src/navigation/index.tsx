import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import AccoutsListScreen from '../screens/accounts-list';
import AccountsCreateScreen from '../screens/accounts-create';

const AppStack = createNativeStackNavigator<RootStackParamList>();

function AppNavigation() {
  return (
    <AppStack.Navigator initialRouteName="accounts">
      <AppStack.Screen name="accounts" component={AccoutsListScreen} />
      <AppStack.Screen name="account_create" component={AccountsCreateScreen} />
    </AppStack.Navigator>
  );
}

export default AppNavigation;
