import {FC, PropsWithChildren} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';
import {colors} from '../styles';

type ScreenProps = PropsWithChildren<{}>;
const Screen: FC<ScreenProps> = ({children}) => (
  <SafeAreaView
    style={{
      flex: 1,
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      backgroundColor: colors.primary,
    }}>
    <View
      style={{
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingVertical: 18,
        paddingLeft: 22,
        paddingRight: 24,
        backgroundColor: colors.bg,
      }}>
      {children}
    </View>
  </SafeAreaView>
);

export default Screen;
