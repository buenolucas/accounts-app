import {FC, memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../styles';

type ListHederProps = {
  total: number;
};
export const ListHeader: FC<ListHederProps> = ({total}) => (
  <View style={styles.root}>
    <Text style={styles.headerTitle}>Listagem</Text>
    <Text style={styles.headerCount}>
      {total === 1 ? `${total} registro` : `${total} registros`}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  headerTitle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 22,
    flexGrow: 1,
    color: colors.black,
  },
  headerCount: {
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
  },
});

export default memo(ListHeader);
