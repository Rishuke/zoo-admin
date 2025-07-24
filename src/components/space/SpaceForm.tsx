import React, { useState } from 'react';
import { CreateSpaceDTO } from '../../dto/space.dto';
import './SpaceForm.css';

interface Props {
  onSubmit: (data: CreateSpaceDTO) => void;
}

export const SpaceForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<CreateSpaceDTO>({
    name: '',
    description: '',
    types: [],
    images: [],
    capacity: 0,
    visitorDuration: 0,
    openingHours: 800,
    closingHours: 1800,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const numericFields = ['capacity', 'visitorDuration', 'openingHours', 'closingHours'];

    setForm({
      ...form,
      [name]: numericFields.includes(name) ? parseInt(value) : value,
    });
  };

  const handleCheckboxChange = (type: 'indoor' | 'outdoor') => {
    setForm((prev) => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter((t) => t !== type)
        : [...prev.types, type],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-form">
      <div className="space-form-group">
        <label className="space-form-label">Nom de l’espace</label>
        <input
          type="text"
          name="name"
          className="space-form-input"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-form-group">
        <label className="space-form-label">Description</label>
        <textarea
          name="description"
          className="space-form-textarea"
          value={form.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-form-group">
        <label className="space-form-label">Capacité maximale</label>
        <input
          type="number"
          name="capacity"
          className="space-form-input"
          value={form.capacity}
          onChange={handleChange}
          min={0}
          required
        />
      </div>

      <div className="space-form-group">
        <label className="space-form-label">Durée moyenne de visite (min)</label>
        <input
          type="number"
          name="visitorDuration"
          className="space-form-input"
          value={form.visitorDuration}
          onChange={handleChange}
          min={0}
          required
        />
      </div>

      <div className="space-form-group">
        <label className="space-form-label">Heure d’ouverture (ex: 800 = 8h00)</label>
        <input
          type="number"
          name="openingHours"
          className="space-form-input"
          value={form.openingHours}
          onChange={handleChange}
          min={0}
          max={2359}
          required
        />
      </div>

      <div className="space-form-group">
        <label className="space-form-label">Heure de fermeture (ex: 1800 = 18h00)</label>
        <input
          type="number"
          name="closingHours"
          className="space-form-input"
          value={form.closingHours}
          onChange={handleChange}
          min={0}
          max={2359}
          required
        />
      </div>

      <div className="space-form-group">
        <label className="space-form-label">Type d’espace</label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <label>
            <input
              type="checkbox"
              checked={form.types.includes('indoor')}
              onChange={() => handleCheckboxChange('indoor')}
            />
            &nbsp;Intérieur
          </label>
          <label>
            <input
              type="checkbox"
              checked={form.types.includes('outdoor')}
              onChange={() => handleCheckboxChange('outdoor')}
            />
            &nbsp;Extérieur
          </label>
        </div>
      </div>

      <button type="submit" className="space-form-submit">
        Créer l’espace
      </button>
    </form>
  );
};
