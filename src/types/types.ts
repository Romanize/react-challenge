export enum LoadingType {
  fulfilled = 'fullfilled',
  rejected = 'rejected',
  pending = 'pending'
}

interface UserAddress {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: {
    lat: string,
    long: string,
  }
}

interface UserCompany {
  name: string,
  catchPhrase: string,
  bs: string
}
export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: UserAddress,
  phone: string,
  website: string,
  company: UserCompany
}

