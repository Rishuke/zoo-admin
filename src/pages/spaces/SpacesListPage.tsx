import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SpaceDTO } from '../../dto/space.dto';
import { SpaceService } from '../../services/space.service';
import { ZooService } from '../../services/zoo.service';
import './SpacesListPage.css';

const SpacesListPage: React.FC = () => {
  const [spaces, setSpaces] = useState<SpaceDTO[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const zoos = await ZooService.getAllZoos();
        console.log('Liste des zoos disponibles :', zoos);

        if (!zoos || zoos.length === 0) {
          setError("Aucun zoo trouvé. Veuillez créer un zoo d'abord.");
          return;
        }

        const selectedZoo = zoos[0];
        localStorage.setItem('zoo', JSON.stringify(selectedZoo)); 

        const fetchedSpaces = await SpaceService.getAllSpaces(selectedZoo._id);
        setSpaces(fetchedSpaces);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les espaces.");
      }
    };

    fetchSpaces();
  }, []);

  return (
    <div className="spaces-list-container">
      <div className="spaces-list-header">
        <h1>Liste des Espaces</h1>
        <button onClick={() => navigate('/spaces/create')} className="create-button">
          + Nouvel Espace
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="spaces-grid">
        {spaces.map((space) => (
          <div key={space._id} className="space-card">
            <h2>{space.name}</h2>
            <p>{space.description}</p>
            <p><strong>Capacité :</strong> {space.capacity} personnes</p>
            <p><strong>Type :</strong> {space.types.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpacesListPage;
