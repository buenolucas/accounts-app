import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FC,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {generanteID} from '../generanteID';
import {AccountsContext} from './contex';
import {AccountNode, AccountType, CreateNode, OperationType} from './types';

export const AccountsProvider: FC<PropsWithChildren> = ({children}) => {
  const [accounts, setAccounts] = useState<AccountNode[]>([]);

  const keyMap = useMemo(() => {
    const map = new Map<string, AccountNode>();

    if (accounts.length == 0) {
      return map;
    }
    let visit = (node: AccountNode) => {
      map.set(node.key, node);
      if (node.childNodes && node.type === AccountType.GROUP) {
        for (let child of node.childNodes) {
          visit(child);
        }
      }
    };
    for (let node of accounts) {
      visit(node);
    }
    AsyncStorage.setItem('accounts-store', JSON.stringify(accounts));
    return map;
  }, [accounts]);

  useEffect(() => {
    (async function () {
      const data = (await AsyncStorage.getItem('accounts-store')) || '[]';
      setAccounts(JSON.parse(data));
    })();
  }, []);

  const loadData = (data: any) => {};

  const getNextEmptyNode = (key?: string): number[] => {
    let path: number[] = [];
    const visit = (key?: string) => {
      const node = keyMap!.get(key!);
      const collection = !key ? accounts : node!.childNodes;
      const next = getNextCode(collection!);
      if (next < 1000) {
        path = [...node!.path, node!.code, next];
        return;
      }
      visit(node?.parentKey);
    };
    if (!key) {
      const next = getNextCode(accounts);
      return [next];
    }
    visit(key);
    return path;
  };

  const getNextSlot = (key?: string): number[] => {
    let path: number[] = [];
    const visit = (key?: string) => {
      const node = keyMap!.get(key!);
      const collection = !key ? accounts : node!.childNodes;
      const next = getNextCode(collection!);
      if (next < 1000) {
        path = [...node!.path, node!.code, next];
        return;
      }
      visit(node?.parentKey);
    };
    if (!key) {
      const next = getNextCode(accounts);
      return [next];
    }
    visit(key);
    return path;
  };
  const getNextCode = (node: AccountNode[] | string) => {
    const currentNode =
      typeof node === 'string' ? keyMap.get(node)?.childNodes : node;
    if (!currentNode) {
      throw new Error('Nó não existe');
    }
    const maxCode = currentNode.reduce(
      (total, item) => (item.code > total ? item.code : total),
      0,
    );
    return maxCode + 1;
  };

  const getPath = (key: string) => {
    let codes: number[] = [];
    const visit = (path: number[], pKey: string) => {
      const node = keyMap.get(pKey);
      path.push(node?.code!);
      if (node?.parentKey) {
        visit(path, node?.parentKey);
      }
    };
    visit(codes, key);
    return codes.reverse();
  };

  /**
   *
   */
  const insert = (acc: CreateNode) => {
    let code = acc.code;
    let parentNode = null;

    if (code && code < 1 && code > 999) {
      throw new Error(`Código precisa ser de 1 a 99.`);
    }
    if (acc.parentKey) {
      for (const [key, value] of keyMap) {
      }
      parentNode = keyMap.get(acc.parentKey);
      if (!parentNode) {
        throw new Error('Parent Node não existe');
      }
      if (parentNode.type === AccountType.SINGLE) {
        throw new Error(`Um ${AccountType.SINGLE} não aceita filhos.`);
      }
    }

    let childNodes = parentNode ? parentNode.childNodes : accounts;
    if (!code) {
      code = getNextCode(childNodes);
    }
    for (let child of childNodes) {
      if (child.code === code) {
        throw new Error(`O code ${code} já existe em ${child.code}.`);
      }
    }
    let path = parentNode ? getPath(parentNode.key) : [];
    let node: AccountNode = {
      key: generanteID(),
      ...acc,
      code,
      path,
      parentKey: parentNode?.key,
      childNodes: [],
    };

    if (parentNode) {
      parentNode.childNodes.push(node);
      parentNode.childNodes.sort((a, b) => a.code - b.code);
    } else {
      childNodes.push(node);
      childNodes.sort((a, b) => a.code - b.code);
    }
    setAccounts([...accounts]);
    return node;
  };
  const remove = (key: string) => {
    const account = keyMap.get(key);

    if (!account) throw new Error(`Não existe a conta com id '${key}'`);

    const parentNode = keyMap.get(account.parentKey!);
    const collection = parentNode ? parentNode.childNodes : accounts;

    collection.splice(collection.indexOf(account), 1);

    setAccounts([...accounts]);
  };
  const find = (key: string) => {
    return keyMap.get(key);
  };

  return (
    <AccountsContext.Provider
      value={{
        accounts,
        insert,
        remove,
        find,
        loadData,
        getNextCode,
        getNextSlot,
        getNextEmptyNode,
      }}>
      {children}
    </AccountsContext.Provider>
  );
};
