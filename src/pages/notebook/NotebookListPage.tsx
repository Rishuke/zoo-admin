import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NotebookService } from '../../services/notebook.service';
import { NotebookDTO } from '../../dto/notebook.dto';
import './NotebookListPage.css';

const NotebookListPage: React.FC = () => {
  const { animalId } = useParams();
  const zoo = JSON.parse(localStorage.getItem('zoo') || '{}');
  const [notebooks, setNotebooks] = useState<NotebookDTO[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!animalId) return;

    const fetchNotebooks = async () => {
      try {
        const data = await NotebookService.getNotebooksByAnimal(zoo._id, animalId);
        setNotebooks(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les notes de suivi.");
      }
    };

    fetchNotebooks();
  }, [animalId, zoo._id]);

  return (
    <div className="notebook-list-container">
      <div className="notebook-list-header">
        <h1>Notes de suivi</h1>
        <button onClick={() => navigate(`/animals/${animalId}/notebooks/create`)} className="create-button">
          + Nouvelle Note
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {notebooks.length === 0 ? (
        <p>Aucune note enregistrée pour cet animal.</p>
      ) : (
        <ul className="notebook-list">
          {notebooks.map((note) => (
            <li key={note._id} className="notebook-item">
              <p>{note.text}</p>
              <small>Créée le : {new Date(note.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotebookListPage;
