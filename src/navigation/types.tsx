import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  home: undefined;
  details: undefined; //{userId: string};
  accounts: undefined; //{userId: string};
  account_create: undefined; //{userId: string};
  Feed: {sort: 'latest' | 'top'} | undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'home'
>;

export type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'details'
>;

export type AccountsListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'accounts'
>;

export type AccountsCreateScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'account_create'
>;

export type RootChildScreenProp =
  | HomeScreenProps['navigation']
  | DetailsScreenProps['navigation']
  | AccountsListScreenProps['navigation']
  | AccountsCreateScreenProps['navigation'];
