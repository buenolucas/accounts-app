import {createContext} from 'react';
import {AccountNode, CreateNode} from './types';

export type AccountsContextType = {
  accounts: AccountNode[];
  loadData: (data: any) => void;
  find: (id: string) => AccountNode | undefined;
  insert: (account: CreateNode) => AccountNode;
  remove: (key: string) => void;
  getNextSlot: (key: string) => number[];
  getNextEmptyNode: (key: string) => number[];
  getNextCode: (node: AccountNode[] | string) => number;
};

export const AccountsContext = createContext<AccountsContextType | null>(null);
