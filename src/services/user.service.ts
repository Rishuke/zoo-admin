import axios, { CancelToken } from "axios";
import { UserDTO  } from "../dto/user.dto";
import { CreateUserDTO } from "../dto/create_user.dto";

const API_BASE = "http://localhost:8080";

export class UserService {
  

  static async login(
    login: string,
    password: string,
    cancelToken?: CancelToken
  ): Promise<string | null> {
    try {
      const res = await axios.post(
        `${API_BASE}/auth/login`,
        { login, password },
        { cancelToken }
      );

      if (res.status === 200 && res.data.session) {
        return res.data.session as string;
      }

      return null;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error("Login error:", error);
      }
      return null;
    }
  }

  static async subscribe(
    data: Omit<UserDTO, "_id" | "role" | "jobs" | "createdAt" | "updatedAt">
  ): Promise<UserDTO | null> {
    try {
      const res = await axios.post(`${API_BASE}/auth/subscribe`, data);
      if (res.status === 200) {
        return res.data as UserDTO;
      }
      return null;
    } catch (error) {
      console.error("Subscribe error:", error);
      return null;
    }
  }

  static async getMe(cancelToken?: CancelToken): Promise<UserDTO | null> {
  const sessionId = localStorage.getItem('sessionId');
  if (!sessionId) return null;

  try {
    const res = await axios.get('http://localhost:8080/auth/me', {
      headers: {
        Authorization: `Bearer ${sessionId}`,
      },
      cancelToken,
    });

    if (res.status === 200) {
      return res.data as UserDTO;
    }

    return null;
  } catch (error) {
    console.error('Error in getMe:', error);
    return null;
  }
}

static async createAdmin(zooId: string, data: CreateUserDTO): Promise<UserDTO | null> {
    try {
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) throw new Error('Session non trouvée.');

      const res = await axios.post(`${API_BASE}/user/admin`, {
        ...data,
        zoo: zooId,
        role: 'admin',
      }, {
        headers: { Authorization: `Bearer ${sessionId}` }
      });

      if (res.status === 201) return res.data as UserDTO;
      return null;
    } catch (error) {
      console.error("Erreur lors de la création d’un admin :", error);
      return null;
    }
  }

  static async createEmployee(zooId: string, data: CreateUserDTO): Promise<UserDTO | null> {
    try {
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) throw new Error('Session non trouvée.');

      const res = await axios.post(`${API_BASE}/user/employee`, {
        ...data,
        zoo: zooId,
        role: 'employee',
      }, {
        headers: { Authorization: `Bearer ${sessionId}` }
      });

      if (res.status === 201) return res.data as UserDTO;
      return null;
    } catch (error) {
      console.error("Erreur lors de la création d’un employé :", error);
      return null;
    }
  }

  static async getUsersByZoo(zooId: string): Promise<UserDTO[]> {
    try {
      const sessionId = localStorage.getItem('sessionId');
      if (!sessionId) throw new Error('Session non trouvée.');

      const res = await axios.get(`${API_BASE}/user?zoo_id=${zooId}`, {
        headers: { Authorization: `Bearer ${sessionId}` }
      });

      if (res.status === 200) return res.data as UserDTO[];
      return [];
    } catch (error) {
      console.error("Erreur récupération utilisateurs :", error);
      return [];
    }
  }

}
