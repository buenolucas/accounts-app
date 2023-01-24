import {createContext} from 'react';
import {AccountType, OperationType, AccountNode, CreateNode} from './types';

export type AccountsContextType = {
  accounts: AccountNode[];
  loadData: (data: any) => void;
  find: (id: string) => AccountNode | undefined;
  insert: (account: CreateNode) => void;
  remove: (id: string) => void;
};

export const AccountsContext = createContext<AccountsContextType | null>(null);
