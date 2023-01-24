import {useContext} from 'react';
import {AccountsContext, AccountsContextType} from './contex';

export const useAccounts = () =>
  useContext(AccountsContext) as AccountsContextType;
