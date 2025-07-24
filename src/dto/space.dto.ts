import { ZooDTO } from "./zoo.dto";

export interface SpaceDTO {
  _id: string;
  zoo: ZooDTO;
  name: string;
  description: string;
  images: string[];
  types: ('indoor' | 'outdoor')[];
  capacity: number;
  visitorDuration: number;
  openingHours: number;
  closingHours: number;
  accessibility: string[];
  disabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSpaceDTO {
  name: string;
  description: string;
  types: ('indoor' | 'outdoor')[];
  images: string[];
  capacity: number;
  visitorDuration: number;
  openingHours: number;
  closingHours: number;
}
