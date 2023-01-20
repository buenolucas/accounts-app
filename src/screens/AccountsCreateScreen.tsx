import {IconOutline} from '@ant-design/icons-react-native';
import React from 'react';
import {View, Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AccountsCreateScreenProps} from '../navigation/types';

function AccountsCreateScreen({navigation}: AccountsCreateScreenProps) {
  console.log('home rendered');
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconOutline
          name="check"
          size={22}
          color="#FFFFFF"
          onPress={() => navigation.navigate('account_create')}
        />
      ),
    });
  }, [navigation]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'space-around',
        backgroundColor: '#622490',
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: '#F0EDF5',
        }}></View>
    </SafeAreaView>
  );
}
export default React.memo(AccountsCreateScreen);
