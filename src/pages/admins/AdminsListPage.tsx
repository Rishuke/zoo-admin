import React, { useEffect, useState } from 'react';
import { UserDTO } from '../../dto/user.dto';
import { UserService } from '../../services/user.service';
import { useNavigate } from 'react-router-dom';
import './AdminsListPage.css';

const AdminsListPage: React.FC = () => {
  const [admins, setAdmins] = useState<UserDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);

  const navigate = useNavigate();
  const [zoo] = useState(() => JSON.parse(localStorage.getItem('zoo') || '{}'));

  useEffect(() => {
    const fetchAdmins = async () => {
      if (!zoo?._id || hasLoaded) return;
      setLoading(true);
      const result = await UserService.getUsersByZoo(zoo._id);
      if (result) {
        const onlyAdmins = result.filter((u) => u.role === 'admin');
        setAdmins(onlyAdmins);
      } else {
        setError('Impossible de charger les administrateurs.');
      }
      setLoading(false);
      setHasLoaded(true);
    };

    fetchAdmins();
  }, [zoo, hasLoaded]);

  return (
    <div className="admins-list-container">
      <div className="admins-header">
        <h1>Administrateurs</h1>
        <button onClick={() => navigate('/admins/create')}>+ Ajouter</button>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : admins.length === 0 ? (
        <p>Aucun administrateur trouvé.</p>
      ) : (
        <table className="admins-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Login</th>
              <th>Email</th>
              <th>Créé le</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.lastName}</td>
                <td>{admin.firstName}</td>
                <td>{admin.login}</td>
                <td>{admin.email}</td>
                <td>{new Date(admin.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminsListPage;
