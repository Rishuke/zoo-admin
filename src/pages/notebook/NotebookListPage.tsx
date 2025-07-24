import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NotebookService } from '../../services/notebook.service';
import { NotebookDTO } from '../../dto/notebook.dto';
import './NotebookListPage.css';

const NotebookListPage: React.FC = () => {
  const zoo = JSON.parse(localStorage.getItem('zoo') || '{}');
  const animal = JSON.parse(localStorage.getItem('animal') || '{}');

  const { zooId, animalId } = useParams();

  const [notebooks, setNotebooks] = useState<NotebookDTO[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotebooks = async () => {
      console.log("Fetching notebooks for zooId:", zoo._id, "and animalId:", animal._id);
      if (!zoo._id || !animalId) return;

      try {
        const data = await NotebookService.getNotebooksByAnimal(zoo._id, animalId);
        console.log("Notebooks récupérés :", data);
        setNotebooks(data);
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les notes de suivi.");
      }
    };

    fetchNotebooks();
  }, [zoo._id, animalId]);

  return (
    <div className="notebook-list-container">
      <div className="notebook-list-header">
        <h1>Notes de suivi</h1>
        <button
          onClick={() => navigate(`/zoo/${zoo._id}/animal/${animal._id}/notebook/create`)}
          className="create-button"
        >
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
              <small>
                Créée le {new Date(note.createdAt).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotebookListPage;
