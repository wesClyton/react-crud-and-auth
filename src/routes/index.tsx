import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { Dashboard, ListPeople } from '../pages';

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
        label: 'Pessoas',
        icon: 'peoples',
        path: '/pessoas'
      }
    ]);
  }, []);
  

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/pessoas/detalhes/:id" element={<Dashboard />} />
      <Route path="/pessoas" element={<ListPeople />} />

      <Route path="*" element={<Navigate to="/pagina-inicial"></Navigate>} />
    </Routes>
  );
};