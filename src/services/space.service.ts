import axios from 'axios';
import { CreateSpaceDTO, SpaceDTO } from '../dto/space.dto';

export class SpaceService {
  static async createSpace(
    zooId: string,
    data: CreateSpaceDTO
  ): Promise<SpaceDTO | null> {
    try {
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) throw new Error('Session non trouvée.');

      const res = await axios.post<SpaceDTO>(
        `http://localhost:8080/zoo/${zooId}/space`,
        data,
        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        }
      );

      if (res.status === 201) {
        return res.data;
      }

      return null;
    } catch (err) {
      console.error('Erreur lors de la création de l’espace :', err);
      return null;
    }
  }

  static async getAllSpaces(zooId: string): Promise<SpaceDTO[]> {
    try {
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) throw new Error('Session non trouvée.');

      const res = await axios.get<SpaceDTO[]>(
        `http://localhost:8080/zoo/${zooId}/space`,
        {
          headers: {
            Authorization: `Bearer ${sessionId}`,
          },
        }
      );

      if (res.status === 200 && Array.isArray(res.data)) {
        return res.data;
      }

      return [];
    } catch (err) {
      console.error('Erreur lors de la récupération des espaces :', err);
      return [];
    }
  }
}
