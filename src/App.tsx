import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AppNavigation from './navigation/index';
import {StatusBar} from 'react-native';

function App() {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor={'#622490'}
        barStyle={'light-content'}
      />
      <AppNavigation />
    </NavigationContainer>
  );
}

export default App;
