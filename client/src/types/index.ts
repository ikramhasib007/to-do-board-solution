export type User = {
  __typename?: 'User';
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  isDeleted: boolean;
  lastLogin: string;
  lastName: string;
  password: string;
  tickets: Array<Ticket>;
  updatedAt: string;
};

export type Category = {
  __typename?: 'Category';
  createdAt: string;
  id: string;
  isDeleted: boolean;
  labels: Array<Label>;
  tickets: Array<Ticket>;
  title: string;
  updatedAt: string
};

export type Label = {
  __typename?: 'Label';
  category: Category;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
};

export type Ticket = {
  __typename?: 'Ticket';
  category: Category;
  createdAt: string;
  description: string;
  expiryDate: string;
  id: string;
  isDeleted: boolean;
  status: TicketStatus;
  title: string;
  updatedAt: string;
  user: User;
};

export enum TicketStatus {
  Completed = 'COMPLETED',
  Inprogress = 'INPROGRESS',
  Pending = 'PENDING'
}
