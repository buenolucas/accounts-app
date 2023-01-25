import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  accounts: undefined;
  account_create: undefined;
  account_view: {accountId: string};
  account_test: undefined;
};

export type AccountsListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'accounts'
>;

export type AccountsCreateScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'account_create'
>;

export type AccountViewScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'account_view'
>;
