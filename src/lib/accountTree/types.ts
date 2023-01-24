export enum AccountType {
  GROUP = 'group',
  SINGLE = 'single',
}
export enum OperationType {
  DEBIT = -1,
  CREDIT = 1,
}

export type CreateNode = {
  key?: string;
  name: string;
  code?: number;
  type: AccountType;
  operation: OperationType;
  parentKey?: string;
};

export interface AccountNode {
  key: string;
  type: AccountType;
  operation: OperationType;
  path: number[];
  code: number;
  name?: string;
  childNodes: AccountNode[];
  parentKey?: string;
}
