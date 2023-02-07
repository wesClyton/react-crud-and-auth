import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerContextData {
  isDrawerOpen: boolean;
  drawerOptions: IDrawerOptions[];
  toggleDrawerOpen: () => void;
  setDraweOptions: (newDrawerOptions: IDrawerOptions[]) => void;
}

interface IDrawerOptions {
  path: string;
  icon: string;
  label: string;
}

interface  IDrawerContextProps {
  children: React.ReactNode;
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider = ({ children }: IDrawerContextProps) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOptions[]>([]);

  const toggleDrawerOpen = useCallback(()=> {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOptions[])=> {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDraweOptions: handleSetDrawerOptions}}>
      { children }
    </DrawerContext.Provider>
  );
};