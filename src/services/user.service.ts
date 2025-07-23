import axios, { CancelToken } from "axios";
import { UserDTO } from "../dto/user.dto";

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

}
