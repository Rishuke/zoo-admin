import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { CardContent } from '../components/common/CardContent';


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
      title: 'Employés',
      description: 'Planification du personnel et vérification des conditions d’ouverture.',
      path: '/employees',
    },
    {
      title: 'PASS & Billets',
      description: 'Configurer les différents types de PASS et leurs accès.',
      path: '/tickets',
    },
    {
      title: 'Statistiques',
      description: 'Suivre la fréquentation, l’affluence et exporter les données.',
      path: '/stats',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord – Administration du Zoo</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {sections.map((section) => {

          return (
            <div
              key={section.title}
              className="cursor-pointer"
              onClick={() => navigate(section.path)}
            >
              <Card className="hover:shadow-lg transition-shadow duration-200">
                <CardContent className="flex items-center space-x-4">
                  <div className="text-zinc-600">
                    
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{section.title}</h2>
                    <p className="text-sm text-zinc-500">{section.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
