import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../services/user.service';
import { CreateUserDTO } from '../../dto/create_user.dto';
import './CreateAdminPage.css';

const CreateAdminPage: React.FC = () => {
  const navigate = useNavigate();
  const zoo = JSON.parse(localStorage.getItem('zoo') || '{}');

  const [form, setForm] = useState<CreateUserDTO>({
    firstName: '',
    lastName: '',
    login: '',
    password: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!zoo?._id) return;

    const user = await UserService.createAdmin(zoo._id, form);
    if (user) {
      alert("Administrateur créé !");
      navigate('/admins');
    } else {
      alert("Erreur lors de la création.");
    }
  };

  return (
    <div className="create-admin-container">
      <h1 className="create-admin-title">Créer un administrateur</h1>
      <form onSubmit={handleSubmit} className="create-admin-form">
        <input type="text" name="firstName" placeholder="Prénom" value={form.firstName} onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Nom" value={form.lastName} onChange={handleChange} />
        <input type="text" name="login" placeholder="Login" value={form.login} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Mot de passe" value={form.password} onChange={handleChange} />
        <button type="submit">Créer</button>
      </form>
    </div>
  );
};

export default CreateAdminPage;
