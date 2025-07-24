import { AnimalDTO } from "./animal.dto";

export interface NotebookDTO {
  _id: string;
  animal: AnimalDTO;
  creator: string;
  text: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotebookDTO {
  animal: AnimalDTO;
  text: string;
  images?: string[];
}
