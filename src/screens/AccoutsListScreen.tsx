import React from 'react';
import {View, Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AccountsListScreenProps} from '../navigation/types';
import {IconFill, IconOutline} from '@ant-design/icons-react-native';
function AccountsListScreen({navigation}: AccountsListScreenProps) {
  console.log('accounts rendered');
  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconOutline
          name="plus"
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
export default React.memo(AccountsListScreen);
