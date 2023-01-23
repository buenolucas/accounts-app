import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigation from './navigation/index';
import {StatusBar} from 'react-native';
import {colors} from './styles';

function App() {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={colors.primary}
        barStyle={'light-content'}
      />
      <AppNavigation />
    </NavigationContainer>
  );
}

export default App;
