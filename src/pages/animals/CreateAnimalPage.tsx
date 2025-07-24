import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimalService } from '../../services/animal.service';
import { SpaceService } from '../../services/space.service';
import { SpeciesService } from '../../services/species.service';
import { CreateAnimalDTO } from '../../dto/animal.dto';
import { SpaceDTO } from '../../dto/space.dto';
import { SpeciesDTO } from '../../dto/species.dto';

import './CreateAnimalPage.css';

const CreateAnimalPage: React.FC = () => {
  const navigate = useNavigate();
  const zoo = JSON.parse(localStorage.getItem('zoo') || '{}');
  const [spaces, setSpaces] = useState<SpaceDTO[]>([]);
  const [speciesList, setSpeciesList] = useState<SpeciesDTO[]>([]);

  const [form, setForm] = useState<{
    name: string;
    description: string;
    bornOn: string;
    spaceId: string;
    speciesId: string;
  }>({
    name: '',
    description: '',
    bornOn: '',
    spaceId: '',
    speciesId: '',
  });

  useEffect(() => {
    const loadData = async () => {
      const loadedSpaces = await SpaceService.getAllSpaces(zoo._id);
      const loadedSpecies = await SpeciesService.getAllSpecies();
      setSpaces(loadedSpaces);
      setSpeciesList(loadedSpecies);
    };
    loadData();
  }, [zoo._id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedSpace = spaces.find((s) => s._id === form.spaceId);
    const selectedSpecies = speciesList.find((s) => s._id === form.speciesId);

    if (!selectedSpace || !selectedSpecies) {
      alert("Veuillez sélectionner un espace et une espèce valides.");
      return;
    }

    const newAnimal: CreateAnimalDTO = {
      name: form.name,
      description: form.description,
      bornOn: form.bornOn,
      space: selectedSpace,
      species: selectedSpecies,
      zoo: zoo,
      images: [],
    };

    const success = await AnimalService.createAnimal(zoo._id, newAnimal);
    if (success) {
      alert('Animal créé');
      navigate('/animals');
    } else {
      alert("Erreur lors de la création");
    }
  };

  return (
    <div className="create-animal-container">
      <h1 className="create-animal-title">Ajouter un animal</h1>
      <form className="create-animal-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nom" value={form.name} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input type="date" name="bornOn" value={form.bornOn} onChange={handleChange} required />

        <select name="spaceId" value={form.spaceId} onChange={handleChange} required>
          <option value="">Choisir un espace</option>
          {spaces.map((s) => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>

        <select name="speciesId" value={form.speciesId} onChange={handleChange} required>
          <option value="">Choisir une espèce</option>
          {speciesList.map((sp) => (
            <option key={sp._id} value={sp._id}>{sp.name}</option>
          ))}
        </select>

        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateAnimalPage;
