export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  address: string;
  createdAt?: number;
}

export type CountryType = {
  name: string,
  alpha2Code: string,
};

export type AppContextType = {
  manageUser: (user: UserType, action: 'update' | 'remove' | 'add', callback?: () => void) => void;
  users: UserType[];
  countries: CountryType[];
  loading?: boolean;
}

export enum FormFields {
  firstName = 'firstName',
  lastName = 'lastName',
  email = 'email',
  country = 'country',
  address = 'address'
}