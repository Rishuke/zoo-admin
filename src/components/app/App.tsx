import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import Dashboard from '../../pages/Dashboard';
import CreateSpacePage from '../../pages/spaces/CreateSpacePage';
import SpacesListPage from '../../pages/spaces/SpacesListPage';
import CreateEmployeePage from '../../pages/employees/CreateEmployeePage';
import CreateAdminPage from '../../pages/admins/CreateAdminPage';
import AdminsListPage from '../../pages/admins/AdminsListPage';
import AnimalsListPage from '../../pages/animals/AnimalsListPage';
import CreateAnimalPage from '../../pages/animals/CreateAnimalPage';
import NotebookListPage from '../../pages/notebook/NotebookListPage';
import NotebookCreatePage from '../../pages/notebook/NotebookCreatePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/spaces" element={<SpacesListPage />} />
        <Route path="/spaces/create" element={<CreateSpacePage />} />
        <Route path="/employees" element={<CreateEmployeePage />} />
        <Route path="/admins" element={<AdminsListPage />} />
        <Route path="/admins/create" element={<CreateAdminPage />} />
        <Route path="/animals" element={<AnimalsListPage />} />
        <Route path="/animals/create" element={<CreateAnimalPage />} />
<Route path="/zoo/:zooId/animal/:animalId/notebook" element={<NotebookListPage />} />
        <Route path="/zoo/:zooId/animal/:animalId/notebook/create" element={<NotebookCreatePage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
