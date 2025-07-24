import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { CardContent } from '../components/common/CardContent';
import './Dashboard.css';

type Section = {
  title: string;
  description: string;
  path: string;
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const sections: Section[] = [
    {
      title: 'Espaces',
      description: 'Gérer les zones du zoo, leur entretien, capacité et accessibilité.',
      path: '/spaces',
    },
    {
      title: 'Animaux',
      description: 'Suivre les espèces présentes et les carnets de soins vétérinaires.',
      path: '/animals',
    },
    {
      title: 'Administrateurs',
      description: 'Planification du personnel et vérification des conditions d’ouverture.',
      path: '/admins',
    },
    {
      title: 'Employés',
      description: 'Gestion des employés et de leurs horaires.',
      path: '/employees',
    },
    {
      title: 'PASS & Billets',
      description: 'Configurer les différents types de PASS et leurs accès.',
      path: '/tickets',
    },
    {
      title: 'NoteBook',
      description: 'Suivre la fréquentation, l’affluence et exporter les données.',
      path: '/notebook',
    },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">🐾 Tableau de bord – Administration du Zoo</h1>
      <div className="dashboard-grid">
        {sections.map((section) => (
          <div
            key={section.title}
            className="dashboard-card-wrapper"
            onClick={() => navigate(section.path)}
          >
            <Card className="dashboard-card hover:shadow-xl">
              <CardContent className="dashboard-card-content">
                <div className="dashboard-card-info">
                  <h2 className="dashboard-card-title">{section.title}</h2>
                  <p className="dashboard-card-description">{section.description}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
