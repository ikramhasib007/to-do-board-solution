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
  tickets: Array<Ticket>;
  title: string;
  updatedAt: string
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
  labels: Array<Label>;
};

export type Label = {
  __typename?: 'Label';
  ticket: Ticket;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
};

export enum TicketStatus {
  Completed = 'COMPLETED',
  Inprogress = 'INPROGRESS',
  Pending = 'PENDING'
}

export type ToDoSession = {
  token: string;
  createdAt: number;
  maxAge: number;
}
