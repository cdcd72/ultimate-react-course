export interface IUser {
  name: string;
  position: { latitude: number; longitude: number };
  address: string;
  status: string;
  error?: string;
}
