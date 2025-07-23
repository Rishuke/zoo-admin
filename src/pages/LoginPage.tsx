import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../services/user.service';
import { UserDTO } from '../dto/user.dto';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('root'); 
  const [password, setPassword] = useState('root');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const sessionId = await UserService.login(login, password);

      if (!sessionId) {
        setError("Identifiants incorrects.");
        return;
      }

      localStorage.setItem('sessionId', sessionId);

      const user: UserDTO | null = await UserService.getMe();
      if (!user) {
        setError("Impossible de récupérer les informations utilisateur.");
        return;
      }

      if (user.role !== 'admin' && user.role !== 'super_admin') {
        setError("Accès réservé aux administrateurs.");
        return;
      }

      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white shadow-lg rounded p-6 w-80">
        <h2 className="text-xl font-bold mb-4">Connexion</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 mb-4 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
