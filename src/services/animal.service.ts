import axios from 'axios';
import { AnimalDTO , CreateAnimalDTO} from '../dto/animal.dto';

const API_BASE = 'http://localhost:8080';

export class AnimalService {
  static async createAnimal(zooId: string, data: CreateAnimalDTO): Promise<AnimalDTO | null> {
    try {
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) throw new Error('Session non trouvée.');

      const res = await axios.post(`${API_BASE}/zoo/${zooId}/animal`, data, {
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
      });

      if (res.status === 201) return res.data as AnimalDTO;
      return null;
    } catch (error) {
      console.error('Erreur lors de la création de l\'animal:', error);
      return null;
    }
  }

  static async getAnimalsBySpace(zooId: string, spaceId: string): Promise<AnimalDTO[]> {
    try {
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) throw new Error('Session non trouvée.');

      const res = await axios.get(`${API_BASE}/zoo/${zooId}/animal?space_id=${spaceId}`, {
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
      });

      if (res.status === 200) return res.data as AnimalDTO[];
      return [];
    } catch (error) {
      console.error('Erreur lors de la récupération des animaux:', error);
      return [];
    }
  }
}
