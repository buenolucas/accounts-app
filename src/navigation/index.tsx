import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import AccoutsListScreen from '../screens/accounts-list';
import AccountCreateScreen from '../screens/accounts-create';
import AccountViewScreen from '../screens/account-view';
const AppStack = createNativeStackNavigator<RootStackParamList>();

function AppNavigation() {
  return (
    <AppStack.Navigator initialRouteName="accounts">
      <AppStack.Screen name="accounts" component={AccoutsListScreen} />
      <AppStack.Screen name="account_create" component={AccountCreateScreen} />
      <AppStack.Screen name="account_view" component={AccountViewScreen} />
    </AppStack.Navigator>
  );
}

export default AppNavigation;
