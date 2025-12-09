export interface Cat {
  id: string;
  name: string;
  breed: string;
  age: number; // in months
  price: number;
  gender: 'Male' | 'Female';
  description: string;
  image: string;
  tags: string[];
  personality: string;
  isAdopted?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface CartItem {
  cat: Cat;
  addedAt: number;
}

export type ViewState = 'home' | 'catalog' | 'cart' | 'profile';
