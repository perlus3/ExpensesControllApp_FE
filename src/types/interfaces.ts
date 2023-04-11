export enum Currency {
  PLN = 'PLN',

  EURO = 'EURO',
  DOLAR = 'DOLAR',
}

export interface NewAccountEntity {
  id: string;
  name: string;
  value: number;
  currency: Currency;
}

export enum OperationType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export interface NewOperationData {
  id: string;
  name: string;
  value: number;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  operationType: OperationType;
}

export interface FilteredOperation {
  id: string;
  name: string;
  value: number;
  createdAt: Date;
}

export interface CategoryEntity {
  id: string;
  name: string;
  type: OperationType;
  createdAt: Date;
  updatedAt: Date;
}
