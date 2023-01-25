import {FC, ReactNode, useState} from 'react';
import {IconOutline} from '@ant-design/icons-react-native';
import {useNavigation} from '@react-navigation/native';

import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../styles';
import IconButton from './IconButton';
import SearchInput from './SearchInput';

// ------------------------------------------
// AppHeader
// ------------------------------------------

type AppHeaderProps = {
  title: string;
  onQuery?: (value: string) => void;
  backButtonVisible?: boolean;
  searchBarVisible?: boolean;
  rightActions?: () => ReactNode;
};
const AppHeader: FC<AppHeaderProps> = ({
  title,
  searchBarVisible = false,
  backButtonVisible = false,
  rightActions,
  onQuery,
}) => {
  const navigation = useNavigation();

  const [search, setSearch] = useState<string>();

  const onChangeText = (value: string) => {
    setSearch(value);
    if (onQuery) {
      onQuery(value);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {backButtonVisible && (
          <View style={styles.headerLeft}>
            <IconButton onPress={() => navigation.goBack()}>
              <IconOutline name="left" size={22} color={colors.white} />
            </IconButton>
          </View>
        )}
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        {rightActions && (
          <View style={styles.headerRight}>{rightActions()}</View>
        )}
      </View>
      {searchBarVisible && (
        <View style={styles.search}>
          <SearchInput onChangeText={onChangeText} value={search} />
        </View>
      )}
    </View>
  );
};

// ------------------------------------------
// StyleSheet
// ------------------------------------------
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingHorizontal: 22,
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingTop: 27,
    paddingBottom: 21,
    justifyContent: 'space-around',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeft: {
    marginLeft: -12,
  },
  headerCenter: {
    flexGrow: 1,
  },
  headerRight: {
    marginRight: -8,
  },
  headerTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 22,
    color: colors.white,
  },
  search: {
    marginTop: 25,
  },
});

export default AppHeader;
