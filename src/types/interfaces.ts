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

// export interface IPagination {
//   onPageChange?: (page: number) => void;
//   totalCount: number;
//   siblingCount: number;
//   currentPage: number;
//   pageSize: number;
//   className?: string;
// }

export interface NewOperationData {
  id: string;
  name: string;
  value: number;
  description?: string;
  byUserAccount?: NewAccountEntity;
  createdAt: Date;
  updatedAt: Date;
  category: CategoryEntity;
  operationType: OperationType;
}

export interface OperationData {
  id: string;
  name: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
  category: CategoryEntity;
}

export interface FilteredOperation {
  id: string;
  name: string;
  value: number;
  fullDate: string;
}

export interface CategoryEntity {
  id: string;
  name: string;
  type: OperationType;
  createdAt: Date;
  updatedAt: Date;
}

export interface Month {
  name: string;
  value: number;
}
