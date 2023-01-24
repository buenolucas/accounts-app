import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigation from './navigation/index';
import {StatusBar} from 'react-native';
import {colors} from './styles';
import {AccountsProvider} from './lib/accountTree/AccountsProvider';

function App() {
  return (
    <AccountsProvider>
      <NavigationContainer>
        <StatusBar
          animated={true}
          backgroundColor={colors.primary}
          barStyle={'light-content'}
        />
        <AppNavigation />
      </NavigationContainer>
    </AccountsProvider>
  );
}

export default App;
