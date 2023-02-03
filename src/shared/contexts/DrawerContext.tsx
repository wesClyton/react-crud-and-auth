import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
}

interface  IDrawerContextProps {
  children: React.ReactNode;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider: React.FC<IDrawerContextProps> = ({ children }) => {

  const [isDrawerOpen, setIsDowerOpen] = useState(false);
  const toggleDrawerOpen = useCallback(()=> {
    setIsDowerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen}}>
      { children }
    </DrawerContext.Provider>
  );
};