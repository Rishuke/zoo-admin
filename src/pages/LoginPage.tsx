import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../services/user.service';
import { UserDTO } from '../dto/user.dto';
import './LoginPage.css';

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
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src="/zoo-logo.svg" alt="Zoo Admin" />
        </div>
        <h2 className="login-title">Connexion Admin</h2>
        <form onSubmit={handleLogin}>
          {error && <p className="login-error">{error}</p>}
          <input
            type="text"
            placeholder="Identifiant"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-button">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
