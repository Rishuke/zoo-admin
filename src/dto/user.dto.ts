export interface UserDTO {
  _id: string;
  zoo_id? : string; // Optional, if user is associated with a specific zoo
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
