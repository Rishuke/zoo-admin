export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  login: string;
  password: string;
  email: string;
  jobs?: string[];
}
