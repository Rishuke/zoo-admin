export interface SpeciesDTO {
  _id: string;
  name: string;
  description: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateSpeciesDTO {
  name: string;
  description: string;
  images: string[];
}