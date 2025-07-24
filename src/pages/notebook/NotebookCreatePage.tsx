import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NotebookService } from '../../services/notebook.service';
import { CreateNotebookDTO } from '../../dto/notebook.dto';
import './NotebookCreatePage.css';

const NotebookCreatePage: React.FC = () => {
  const { zooId, animalId } = useParams();
  const navigate = useNavigate();

  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return setError("Le texte est requis.");

  const animal = JSON.parse(localStorage.getItem('animal') || '{}');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  console.log("Creating notebook for zooId:", zooId, "and animalId:", animalId);

  const newNote: CreateNotebookDTO = {
    animal: animal._id,        
    creator: user._id,         
    text,
    images: [],
    
  };


    const notebook = await NotebookService.createNotebook(zooId!, animalId!, newNote);

    if (notebook) {
      navigate(`/zoo/${zooId}/animal/${animalId}/notebook`);
    } else {
      setError("Erreur lors de l'ajout de la note.");
    }
  };

  return (
    <div className="notebook-create-container">
      <h1>Ajouter une note de suivi</h1>
      <form onSubmit={handleSubmit} className="notebook-create-form">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Texte de la note"
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default NotebookCreatePage;
