export type Pizza = {
  id: string; 
  title: string; 
  price: number; 
  imageUrl: string;
  types: number[]; 
  sizes: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
};

export interface PizzaSliceState {
  items: Pizza[];
  status: Status;
};

export type SearchPizzaParams = {
  sortBy: string; 
  orderType: string;
  category: string;
  search: string;
  currentPage: string;
};