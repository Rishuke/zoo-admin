import axios, { CancelToken } from 'axios';
import { ZooDTO } from '../dto/zoo.dto';

export class ZooService {
  static async getAllZoos(cancelToken?: CancelToken): Promise<ZooDTO[] | null> {
    try {
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) {
        throw new Error('Aucune session active trouvée.');
      }

      const res = await axios.get<ZooDTO[]>('http://localhost:8080/zoo', {
        cancelToken,
        headers: {
          Authorization: `Bearer ${sessionId}`,
        },
      });

      if (res.status === 200 && Array.isArray(res.data)) {
        return res.data;
      }

      return null;
    } catch (error) {
      console.error('Erreur lors de la récupération des zoos :', error);
      return null;
    }
  }
}
