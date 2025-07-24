import { AnimalDTO } from "./animal.dto";
import { UserDTO } from "./user.dto";

export interface NotebookDTO {
  _id: string;
  animal: string;        
  creator: string;       
  text: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotebookDTO {
  animal: AnimalDTO;       
  creator: UserDTO; 
  text: string;
  images?: string[];
}
