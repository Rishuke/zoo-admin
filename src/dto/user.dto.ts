export interface UserDTO {
  _id: string;
  role: 'super_admin' | 'admin' | 'employee' | string;
  jobs: string[]; 
  lastName: string;
  firstName: string;
  login: string;
  password: string; 
  email: string;
  createdAt: string; 
  updatedAt: string;
}
