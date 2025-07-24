import axios from 'axios';
import { SpeciesDTO, CreateSpeciesDTO } from '../dto/species.dto';

const API_BASE = 'http://localhost:8080';

export class SpeciesService {
  static async createSpecies(data: CreateSpeciesDTO): Promise<SpeciesDTO | null> {
    try {
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) throw new Error('Session non trouvée.');

      const res = await axios.post(`${API_BASE}/species`, data, {
        headers: { Authorization: `Bearer ${sessionId}` }
      });

      if (res.status === 201) return res.data as SpeciesDTO;
      return null;
    } catch (error) {
      console.error('Erreur création espèce :', error);
      return null;
    }
  }

  static async getAllSpecies(): Promise<SpeciesDTO[]> {
    try {
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) throw new Error('Session non trouvée.');

      const res = await axios.get(`${API_BASE}/species`, {
        headers: { Authorization: `Bearer ${sessionId}` }
      });

      if (res.status === 200) return res.data as SpeciesDTO[];
      return [];
    } catch (error) {
      console.error('Erreur récupération espèces :', error);
      return [];
    }
  }
}
