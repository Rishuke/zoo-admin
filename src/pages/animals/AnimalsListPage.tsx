import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimalDTO } from '../../dto/animal.dto';
import { AnimalService } from '../../services/animal.service';
import { ZooService } from '../../services/zoo.service';
import './AnimalsListPage.css';
import { SpaceService } from '../../services/space.service';

const AnimalsListPage: React.FC = () => {
  const [animals, setAnimals] = useState<AnimalDTO[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const zoos = await ZooService.getAllZoos();
        if (!zoos || zoos.length === 0) {
          setError("Aucun zoo trouvé. Veuillez créer un zoo d'abord.");
          return;
        }

        const selectedZoo = zoos[0];
        localStorage.setItem('zoo', JSON.stringify(selectedZoo));

        const spaces = await SpaceService.getAllSpaces(selectedZoo._id);

        const allAnimalsNested = await Promise.all(
          spaces.map((space) =>
            AnimalService.getAnimalsBySpace(selectedZoo._id, space._id)
          )
        );

        const allAnimals = allAnimalsNested.flat();
        setAnimals(allAnimals);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les animaux.");
      }
    };

    fetchAnimals();
  }, []);

  return (
    <div className="animals-list-container">
      <div className="animals-list-header">
        <h1>Liste des Animaux</h1>
        <button onClick={() => navigate('/animals/create')} className="create-button">
          + Nouvel Animal
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      <div className="animals-grid">
        {animals.map((animal) => (
          <div key={animal._id} className="animal-card">
            <h2>{animal.name}</h2>
            <p>{animal.description}</p>
            <p><strong>Espèce :</strong> 
              {(typeof animal.species === 'object' && 'name' in animal.species)
                ? animal.species.name
                : 'Inconnue'}
            </p>
            <p><strong>Date de naissance :</strong> {new Date(animal.bornOn).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimalsListPage;
