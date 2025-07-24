import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';
import Dashboard from '../../pages/Dashboard';
import CreateSpacePage from '../../pages/spaces/CreateSpacePage';
import SpacesListPage from '../../pages/spaces/SpacesListPage';
import CreateEmployeePage from '../../pages/employees/CreateEmployeePage';
import CreateAdminPage from '../../pages/admins/CreateAdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/spaces" element={<SpacesListPage />} />
        <Route path="/spaces/create" element={<CreateSpacePage />} />
        <Route path="/employees" element={<CreateEmployeePage />} />
        <Route path="/admins" element={<CreateAdminPage />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
