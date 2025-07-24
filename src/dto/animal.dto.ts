import { SpaceDTO } from "./space.dto";
import { SpeciesDTO } from "./species.dto";
import { ZooDTO } from "./zoo.dto";

export interface AnimalDTO {
  _id: string;
  name: string;
  species: SpeciesDTO;
  space: SpaceDTO; 
  zoo: ZooDTO;
  description: string;
  image: string[];
  bornOn: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAnimalDTO {
  name: string;
  species: SpeciesDTO;
  space: SpaceDTO;
  zoo: ZooDTO;
  images: string[];
  description: string;
  bornOn: string;
}
