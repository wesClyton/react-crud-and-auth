import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  // const { toggleTheme } = useAppThemeContext();
  const { toggleDrawerOpen, setDraweOptions } = useDrawerContext();

  useEffect(() => {
    setDraweOptions([
      {
        label: 'Início',
        icon: 'home',
        path: '/pagina-inicial'
      }
    ]);
  }, []);
  

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Button variant="contained" color="primary" onClick={toggleDrawerOpen}>ToggleTheme</Button>} />
      
      <Route path="*" element={<Navigate to="/pagina-inicial"></Navigate>} />
    </Routes>
  );
};