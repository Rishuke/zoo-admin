import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SpaceService } from '../../services/space.service';
import { CreateSpaceDTO } from '../../dto/space.dto';
import { SpaceForm } from '../../components/space/SpaceForm';
import './CreateSpacePage.css';

const CreateSpacePage: React.FC = () => {
  const navigate = useNavigate();
  const zoo = JSON.parse(localStorage.getItem('zoo') || '{}');

  const handleSubmit = async (data: CreateSpaceDTO) => {
    if (!zoo?._id) return;

    const newSpace = await SpaceService.createSpace(zoo._id, data);
    if (newSpace) {
      alert('Espace créé avec succès !');
      navigate('/spaces');
    } else {
      alert("Erreur lors de la création de l'espace.");
    }
  };

  return (
    <div className="create-space-container">
      <div className="create-space-card">
        <h1 className="create-space-title">Créer un nouvel espace</h1>
        <SpaceForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateSpacePage;
