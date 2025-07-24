import axios from 'axios';
import { CreateNotebookDTO, NotebookDTO } from '../dto/notebook.dto';

const API_BASE = 'http://localhost:8080';

export class NotebookService {
  static async createNotebook(zooId: string, animalId: string, data: CreateNotebookDTO): Promise<NotebookDTO | null> {
    try {
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) throw new Error('Session non trouvée.');

      const res = await axios.post(`${API_BASE}/zoo/${zooId}/animal/${animalId}/notebook`, data, {
        headers: { Authorization: `Bearer ${sessionId}` },
      });

      if (res.status === 201) return res.data as NotebookDTO;
      return null;
    } catch (error) {
      console.error("Erreur lors de la création du notebook :", error);
      return null;
    }
  }

  static async getNotebooksByAnimal(zooId: string, animalId: string): Promise<NotebookDTO[]> {
  try {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) throw new Error('Session non trouvée.');

    const res = await axios.get(`${API_BASE}/zoo/${zooId}/animal/${animalId}/notebook`, {
      headers: { Authorization: `Bearer ${sessionId}` },
    });

    if (res.status === 200) return res.data as NotebookDTO[];
    return [];
  } catch (error) {
    console.error("Erreur lors de la récupération des notebooks :", error);
    return [];
  }
}

}
