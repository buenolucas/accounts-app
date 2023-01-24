import {FC, PropsWithChildren, useMemo, useState} from 'react';
import {generanteID} from '../generanteID';
import {AccountsContext} from './contex';
import {AccountNode, AccountType, CreateNode, OperationType} from './types';

export const AccountsProvider: FC<PropsWithChildren> = ({children}) => {
  const [accounts, setAccounts] = useState<AccountNode[]>([]);

  const keyMap = useMemo(() => {
    const map = new Map<string, AccountNode>();
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
    return map;
  }, [accounts]);

  const loadData = (data: any) => {};

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

  const insert = (acc: CreateNode) => {
    let code = acc.code;
    let parentNode = null;

    if (acc.parentKey) {
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
    console.log('criando', node);
    console.log(node);
    if (parentNode) {
      parentNode.childNodes.push(node);
      parentNode.childNodes.sort((a, b) => a.code - b.code);
    } else {
      childNodes.push(node);
      childNodes.sort((a, b) => a.code - b.code);
    }
    setAccounts([...accounts]);
  };
  const remove = () => {};
  const find = () => {
    return undefined;
  };

  return (
    <AccountsContext.Provider
      value={{accounts, insert, remove, find, loadData}}>
      {children}
    </AccountsContext.Provider>
  );
};
