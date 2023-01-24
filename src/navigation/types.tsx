import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  accounts: undefined; //{userId: string};
  account_create: undefined; //{userId: string};
};

export type AccountsListScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'accounts'
>;

export type AccountsCreateScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'account_create'
>;
