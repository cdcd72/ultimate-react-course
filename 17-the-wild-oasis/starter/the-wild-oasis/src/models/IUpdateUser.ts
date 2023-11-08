export interface IUpdateUser {
  password?: string;
  data?: {
    fullName?: string;
    avatar?: string;
  };
}
