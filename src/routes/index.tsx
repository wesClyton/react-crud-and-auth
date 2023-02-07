import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { Dashboard, ListCities } from '../pages';

export const AppRoutes = () => {
  // const { toggleTheme } = useAppThemeContext();
  const { setDraweOptions } = useDrawerContext();

  useEffect(() => {
    setDraweOptions([
      {
        label: 'Início',
        icon: 'home',
        path: '/pagina-inicial'
      },
      {
        label: 'Cidades',
        icon: 'location_city',
        path: '/cidades'
      }
    ]);
  }, []);
  

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/cidades" element={<ListCities />} />

      <Route path="*" element={<Navigate to="/pagina-inicial"></Navigate>} />
    </Routes>
  );
};